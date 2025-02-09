import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Header from './components/custom/Header'
import { Button } from './components/ui/button'
import { BsDownload } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import Confetti from "react-confetti";
import { ResumeInfoContext } from './dashboard/context/ResumeInfoContext';
import ResumePreview from './dashboard/ResumePreview';
import GlobalApi from '../services/GlobalApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RWebShare } from 'react-web-share'
import Loading from './loader/Loading';

const MyResume = () => {

    const [resumeInfo, setResumeInfo] = useState({})
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(true);
    const { resumeId } = useParams();
    const resumeRef = useRef(); // Ref for capturing the resume

    const getResumeInfo = async () => {
        try {
            setLoading(true);
            const resp = await GlobalApi.GetResumeById(resumeId);
            setResumeInfo(resp.data.data);
        } catch (error) {
            console.error("Error fetching resume by ID:", error);
        } finally {
            setLoading(false);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
        }
    };

    useEffect(() => {
        getResumeInfo();
    }, []);

    const handleDownload = async () => {
        const input = resumeRef.current;
        if (!input) return;

        const scale = window.devicePixelRatio || 2; // تحسين الجودة
        const canvas = await html2canvas(input, {
            scale,
            useCORS: true, // في حال وجود صور خارجية
            logging: false,
            scrollX: 0,
            scrollY: -window.scrollY, // تجنب التمرير العشوائي
        });

        const imgData = canvas.toDataURL('image/jpeg', 1.0); // تحسين الضغط والجودة
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // عرض A4 بالمليمتر
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= 297;

        while (heightLeft > 0) {
            position -= 297; // الانتقال إلى الصفحة التالية
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
            heightLeft -= 297;
        }

        pdf.save(resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume");
    };


    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <Header />
            {showConfetti && (
                <Confetti
                    width={document.documentElement.clientWidth}
                    height={document.documentElement.clientHeight}
                />
            )}
            {loading ? (<div className="flex justify-center items-center h-screen">
                <Loading />
            </div>) : (
                <div className='container mx-auto max-w-4xl mt-20'>
                    <div className='text-center'>
                        <h2 className='font-semibold text-slate-500 text-2xl'>Congrats! Your AI-generated resume is ready!</h2>
                        <p className='text-gray-400'>Now you can download or share your unique resume URL.</p>
                    </div>
                    <div className='flex items-center justify-between my-10'>
                        <Button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 text-white">
                            Download PDF <BsDownload />
                        </Button>
                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL + "/myResume/" + resumeId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        > <Button className="bg-blue-500 hover:bg-blue-600 text-white">Share <FaShare /></Button>
                        </RWebShare>

                    </div>
                    <div ref={resumeRef}> {/* Wrap ResumePreview in a ref */}
                        <ResumePreview />
                    </div>
                </div>
            )}
        </ResumeInfoContext.Provider>
    );
}

export default MyResume;
