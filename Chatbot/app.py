from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import csv
from werkzeug.utils import secure_filename
import tempfile
import logging
from langchain_groq import ChatGroq
from langchain.document_loaders import DirectoryLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'csv'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize components
def initialize_components():
    try:
        logger.info("Initializing LLM and vector database...")
        
        # Initialize LLM
        llm = ChatGroq(
            temperature=0,
            groq_api_key=os.getenv("GROQ_API_KEY"),
            model_name="llama-3.3-70b-versatile"
        )

        # Load therapists data
        def load_therapists():
            try:
                with open('mental_health_professionals.csv') as file:
                    reader = csv.DictReader(file)
                    return [dict(row) for row in reader]
            except Exception as e:
                logger.error(f"Error loading therapists: {str(e)}")
                return []

        therapists = load_therapists()
        if not therapists:
            logger.warning("No therapists data loaded")

        # Initialize vector store
        def create_or_load_vector_db():
            db_path = "chroma_db"
            embeddings = HuggingFaceBgeEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

            if not os.path.exists(db_path):
                logger.info("Creating new vector database...")
                try:
                    loader = DirectoryLoader("data", glob='*.pdf', loader_cls=PyPDFLoader)
                    documents = loader.load()
                    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
                    texts = text_splitter.split_documents(documents)
                    vector_db = Chroma.from_documents(texts, embeddings, persist_directory=db_path)
                    vector_db.persist()
                except Exception as e:
                    logger.error(f"Error creating vector DB: {str(e)}")
                    raise
            else:
                logger.info("Loading existing vector database...")
                vector_db = Chroma(persist_directory=db_path, embedding_function=embeddings)
            
            return vector_db

        vector_db = create_or_load_vector_db()

        # Setup QA chain
        retriever = vector_db.as_retriever()
        prompt_template = """
        Context: {context}
        User: {question}
        AntarVaani:"""

        PROMPT = PromptTemplate(
            template=prompt_template.strip(), 
            input_variables=['context', 'question']
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            chain_type_kwargs={"prompt": PROMPT}
        )

        return {
            'llm': llm,
            'therapists': therapists,
            'qa_chain': qa_chain
        }

    except Exception as e:
        logger.error(f"Initialization failed: {str(e)}")
        raise

# Initialize app components
try:
    components = initialize_components()
    llm = components['llm']
    therapists = components['therapists']
    qa_chain = components['qa_chain']
    logger.info("Initialization complete")
except Exception as e:
    logger.error(f"Fatal initialization error: {str(e)}")
    raise

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    logger.info("CSV upload request received")
    
    # Validate request
    if 'file' not in request.files:
        logger.error("No file part in request")
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.error("No file selected")
        return jsonify({"error": "No selected file"}), 400
    
    if not allowed_file(file.filename):
        logger.error(f"Invalid file type: {file.filename}")
        return jsonify({"error": "Invalid file type"}), 400

    try:
        # Save uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        logger.info(f"Saving file to: {filepath}")
        file.save(filepath)
        
        # Process CSV
        try:
            with open(filepath, 'r') as f:
                reader = csv.DictReader(f)
                if not {'Question', 'Answer'}.issubset(reader.fieldnames):
                    raise ValueError("CSV must contain 'Question' and 'Answer' columns")
                
                responses = [(row['Question'], row['Answer']) for row in reader]
                logger.info(f"Processed {len(responses)} questions")
        except Exception as e:
            logger.error(f"CSV processing error: {str(e)}")
            raise

        context_str = "\n".join([f"Q: {q}\nA: {a}" for q, a in responses])
        
        # Generate therapist recommendations
        therapist_str = "\n".join(
            [f"Name: {t['Name']}, Specialization: {t['Specialization']}, "
             f"Experience: {t['Experience']} years\nContact: {t['Contact']}\n"
             f"Approach: {t['Approach']}" for t in therapists]
        )

        # Generate responses
        try:
            welcome_response = llm.invoke(
                "Generate a warm welcome message acknowledging the user has completed their assessment."
            )
            
            therapist_recommendation = llm.invoke(f"""
            Based on these assessment results, recommend 1-2 suitable therapists:
            {context_str}
            
            Available Therapists:
            {therapist_str}
            
            Provide:
            1. Clear recommendation of which therapist(s) would be most suitable
            2. Their contact information
            3. Brief explanation of why they're recommended
            """)
            
            self_care_suggestions = llm.invoke(f"""
            Based on these assessment results, suggest 2-3 immediate self-care strategies:
            {context_str}
            """)

        except Exception as e:
            logger.error(f"LLM error: {str(e)}")
            raise

        # Clean up
        os.remove(filepath)
        
        return jsonify({
            "status": "success",
            "welcome_message": welcome_response.content,
            "therapist_recommendation": therapist_recommendation.content,
            "self_care_suggestions": self_care_suggestions.content,
            "assessment_summary": context_str
        })
        
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        if 'filepath' in locals() and os.path.exists(filepath):
            os.remove(filepath)
        return jsonify({
            "error": "Processing failed",
            "details": str(e)
        }), 500

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "Invalid request format"}), 400
        
        user_message = data['message'].strip()
        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400
        
        response = qa_chain.run(user_message)
        return jsonify({
            "status": "success",
            "response": response
        })
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return jsonify({
            "error": "Chat processing failed",
            "details": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "components": {
            "llm": "connected" if llm else "disconnected",
            "therapists": len(therapists) if therapists else 0,
            "vector_db": "connected" if qa_chain else "disconnected"
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)