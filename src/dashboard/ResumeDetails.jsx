import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';
import { ResumeInfoContext } from './context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../services/GlobalApi';
import Loading from '@/loader/Loading';

const ResumeDetails = () => {
    const [loading, setLoading] = useState(true) // ✅ Loading state
    const { resumeId } = useParams(); // Destructure for cleaner code
    let [resumeInfo, setResumeInfo] = useState({})
    const getResume = async () => {
        try {
            setLoading(true); // Start loading
            const resp = await GlobalApi.GetResumeById(resumeId);
            setResumeInfo(resp.data.data)
        } catch (error) {
            console.error("Error fetching resumes By id:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    }
    useEffect(() => {
        getResume();
    }, [])
    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {loading ? (<div className="flex justify-center items-center h-screen">
                <Loading />
            </div>) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <FormSection />
                    <ResumePreview />
                </div>
            )}
        </ResumeInfoContext.Provider>
    );
};

export default ResumeDetails;
