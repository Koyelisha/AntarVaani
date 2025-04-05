import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom'
import StressInput from '../Modals/StressInput';

const datas = [
    {
        name: "Roshni Paul",
        img: "/People/elonmusk.jpg",
        role: "Software Developer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam commodi sequi, corrupti ipsa repellat nesciunt fugiat sapiente? Reiciendis aut commodi officia vitae labore assumenda omnis velit, culpa necessitatibus expedita?"
    },
    {
        name: "Elite Anderson",
        img: "/People/monalisa.jpg",
        role: "Backend Developer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam commodi sequi, corrupti ipsa repellat nesciunt fugiat sapiente? Reiciendis aut commodi officia vitae labore assumenda omnis velit, culpa necessitatibus expedita?"
    },
    {
        name: "Nea Adbayo",
        img: "/People/robertdowneyjr.jpg",
        role: "java Developer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam commodi sequi, corrupti ipsa repellat nesciunt fugiat sapiente? Reiciendis aut commodi officia vitae labore assumenda omnis velit, culpa necessitatibus expedita?"
    },
    {
        name: "Rio Luie",
        img: "People/sundarpichai.png",
        role: "Python Developer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam commodi sequi, corrupti ipsa repellat nesciunt fugiat sapiente? Reiciendis aut commodi officia vitae labore assumenda omnis velit, culpa necessitatibus expedita?"
    },
    {
        name: "John Morgan",
        img: "People/tomholland.jpg",
        role: "Data Engineer",
        review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam commodi sequi, corrupti ipsa repellat nesciunt fugiat sapiente? Reiciendis aut commodi officia vitae labore assumenda omnis velit, culpa necessitatibus expedita?"
    },
]

const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 300,
    arrows: false
};

const settings2 = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false
};

const images = [
    "Hero-images/img1.jpeg",
    "Hero-images/img2.jpg",
    "Hero-images/img3.webp",
]

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-[#F1FAEE]">
            {/* Hero section */}
            <StressInput/>
            <div>
                <Slider {...settings2}>
                    {images.map((image) => (
                        <img src={image} className='w-screen h-[700px] object-cover object-center' alt="" />
                    ))}
                </Slider>
            </div>
            <div className="flex flex-col items-center text-center py-12 gap-9">
                <h1 className="text-5xl font-bold font-serif">Welcome to AntarVaani – Let your  inner voice be heard</h1>
                <p className="w-3/4 text-xl ">AntarVaani is a mental health chatbot-based website designed to provide instant emotional support, guided mindfulness, and helpful resources anytime, anywhere. Whether you're feeling stressed, anxious, or just need someone to talk to, our AI-powered chatbot offers compassionate conversations, mood tracking, relaxation exercises, and self-care tips. Backed by psychological insights, MindEase ensures a judgment-free, private, and supportive environment for everyone. While it doesn’t replace professional therapy, it serves as a helpful companion in your mental well-being journey. Take a step toward a healthier mind—chat with MindEase today!</p>
            </div>
            <div className="flex flex-col items-center gap-6 pt-0 pb-12">
                <h1 className="text-4xl font-bold font-serif mb-6">Personaliszed Support for Your Mental Well-Being</h1>
                <div className="flex flex-col gap-7 items-center">
                    <div className="flex gap-9  text-lg">
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Anxiety & Stress
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Depression
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Relationship Issues
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            OCD
                        </div>
                    </div>

                    <div className="flex gap-20">
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Trauma
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Couple Therapy
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Grief & Loss
                        </div>
                        <div className="bg-[#c7c7c7] px-5 py-3 w-52 text-center rounded-md font-semibold shadow-md">
                            Career Issues
                        </div>
                    </div>
                    <button 
                    onClick={()=>navigate("/patient/quiz")}
                    className="bg-[#E07A5F] px-7 py-2 text-white rounded-md shadow-md mt-3 text-lg">Get Started</button>
                </div>
            </div>

            <div className="bg-[#3311C7] px-40 py-10 text-white flex items-center justify-between">
                <div className="  flex flex-col gap-3 items-start">
                    <h1 className="text-2xl font-bold">Take a Free Mental Health Test Today! Know How You Feel.</h1>
                    <p className="text-lg">Scientifically validated standard assessments - quickest way to determine if <br />you are suffering from symptoms of any mental health disorder.</p>
                    <button
                    onClick={()=>navigate("/patient/quiz")}
                        className="bg-[#E07A5F] px-7 py-2 text-white rounded-md shadow-md mt-3 text-lg">Get Started</button>
                </div>
                <div>
                    <img className="h-72" src="https://www.felicity.care/assets/images/free_report_asset.webp" alt="" />
                </div>
            </div>

            <div className="flex flex-col items-center py-20">
                <h1 className="text-4xl font-bold mb-9">HOW IT WORKS</h1>
                <div className="flex justify-center gap-5 items-center">
                    <div className="flex flex-col items-center">
                        <div className="h-48 w-48 rounded-full border-8 border-[#3311C7] flex justify-center items-center">
                            <img src="https://png.pngtree.com/png-vector/20230412/ourmid/pngtree-assessment-line-icon-vector-png-image_6703506.png" className="h-28" alt="" />
                        </div>
                        <p className="text-xl font-semibold text-center mt-3">Take  an assessment <br />and get a free report</p>
                    </div>
                    <div className='h-48'>
                        <h1 className="text-8xl text-[#3311C7]">→</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-48 w-48 rounded-full border-8 border-[#3311C7] flex justify-center items-center">
                            <img src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-chatbot-line-icon-vector-png-image_6680403.png" className="h-28" alt="" />
                        </div>
                        <p className="text-xl font-semibold text-center mt-3">Receive Guidance from <br />Your AI Therapist</p>
                    </div>
                    <div className='h-48'>
                        <h1 className="text-8xl text-[#3311C7]">→</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-48 w-48 rounded-full border-8 border-[#3311C7] flex justify-center items-center">
                            <img src="https://png.pngtree.com/png-vector/20230213/ourmid/pngtree-circle-phone-call-icon-in-black-color-png-image_6596895.png" className="h-28" alt="" />
                        </div>
                        <p className="text-xl font-semibold text-center mt-3">Get Contact details of <br />therapist for further<br /> Guidance</p>
                    </div>
                    <div className='h-48'>
                        <h1 className="text-8xl text-[#3311C7] h-full">→</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-48 w-48 rounded-full border-8 border-[#3311C7] flex justify-center items-center">
                            <img src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-therapy-line-icon-vector-png-image_6688864.png" className="h-28" alt="" />
                        </div>
                        <p className="text-xl font-semibold text-center mt-3">Take  an assessment and <br />get a free report</p>
                    </div>
                </div>
            </div>

            <div className="flex px-16 bg-[#E07A5F] justify-center items-center gap-7">
                <div>
                    <img src="https://png.pngtree.com/png-vector/20221010/ourmid/pngtree-realistic-laptop-vector-design-png-image_6275915.png" className="h-[550px]" alt="" />
                </div>
                <div className="w-3/5  flex flex-col justify-center">
                    <h1 className="font-bold text-4xl mb-4">AI-Powered Mental Health Companion</h1>
                    <p className="text-xl">Our AI chatbot offers instant emotional support, self-care tips, and mindfulness exercises in a safe, private space. Whether you're feeling stressed or need guidance, it provides personalized insights and coping strategies. While not a replacement for therapy, it's a supportive companion for your mental well-being—always here to listen and help.</p>
                </div>
            </div>
            <div className='w-3/4 m-auto py-14 text-center'>
                <h1 className='text-4xl font-bold'>What People Say About AntarVaani</h1>
                <Slider {...settings1}>
                    {datas.map((data, index) => (
                        <div key={index} className='py-14'>
                            <div className='bg-[#c4c3c3] w-[350px] px-10 py-10 text-left flex flex-col gap-3 rounded-md shadow-lg hover:bg-[#a0a0a0]'>
                                <div>
                                    <h1 className='text-xl font-bold'>{data.name}</h1>
                                    <h3 className='font-semibold text-gray-700'>{data.role}</h3>
                                </div>
                                <h2>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </h2>
                                <p>{data.review}</p>
                            </div>
                        </div>
                    ))}
                </Slider>


            </div>
        </div>
    );
};

export default Home;