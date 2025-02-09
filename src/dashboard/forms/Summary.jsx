import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Button } from '@/components/ui/button';
import { HiOutlineSave } from "react-icons/hi";
import GlobalApi from '../../../services/GlobalApi';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"
import { Textarea } from '@/components/ui/textarea';
import { LuBrain } from "react-icons/lu";
import { AIChatSession } from '../../../services/AIModal';
const Summary = ({ setEnableNext , setLoadingHeader }) => {
    const prompt = "Job Title: {jobTitle} , Depends on job title Generate an array of 3 objects in JSON format. Each object should have:summary: an String containing one brief professional summary of 4-5 lines. experience_level: a string indicating the experience level, which can be one of the following: 'Senior', 'Mid-Level', or 'Fresher' dont put them in an object with key"
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({})
    const [aiGenerativeSummary, setAiGenerativeSummary] = useState([])
    const [loading, setLoading] = useState(false)
    const [aiLoading, setAiLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null); // New error state

    useEffect(() => {
        if (resumeInfo?.summary) {
            setFormData(prevState => ({
                ...prevState,
                summary: resumeInfo?.summary
            }));
        }
    }, [])


    const handleAiSummary = (summary) => {
        setResumeInfo(prevState => ({
            ...prevState,
            summary: summary
        }));
        
        setFormData(prevState => ({
            ...prevState,
            summary: summary
        }));
    }
    
    const handleChange = (e) => {
        setEnableNext(false);

        const { name, value } = e.target;
        setResumeInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: formData
        }
        try {
            setLoadingHeader(true)
            setLoading(true);
            const resp = await GlobalApi.UpdateResume(resumeId, data);
            if (resp) {
                setLoading(false);
            }
            toast({
                description: "Details Updated",
            })
        } finally {
            setLoading(false);
            setEnableNext(true);
            setLoadingHeader(false)

        }

    };
    const generateSummaryFromAI = async () => {
        try {
            setAiLoading(true);
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);
            setAiGenerativeSummary(JSON.parse(result.response.text()))
            console.log(JSON.parse(result.response.text()));
            console.log(result.response.text());
        } catch (error) {
            console.error("Error generating summary:", error);
            setErrorMsg("No AI-generated suggestions available. Try generating again or check your connection.")
        } finally {
            setAiLoading(false);
        }
    }

    return (
        <>
            <div className='mb-10 p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500'>
                <h2 className='text-xl font-semibold uppercase'>Summary</h2>
                <p>Add Summary to yout job title.</p>

                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className='col-span-2'>
                            <div className='mb-2 flex items-center justify-between'>
                                <label className="block text-gray-700 font-semibold capitalize" htmlFor="summary">Add Summary</label>

                                <Button onClick={() => generateSummaryFromAI()} type="button" variant="outline">
                                    {aiLoading ? (<span className="loader-btn"></span>) : (<>
                                        <LuBrain />
                                        Generate from AI
                                    </>
                                    )}
                                </Button>
                            </div>
                            <Textarea
                                disabled={loading}
                                rows={10} // Adjust the number of rows to make the textarea larger
                                placeholder="Enter a brief summary of your professional experience, e.g., Full Stack Developer, passionate about building scalable applications."
                                type="text-"
                                required
                                name="summary"
                                onChange={handleChange}
                                value={formData?.summary}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <Button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                            {loading ? (<span className="loader-btn"></span>) : (<>
                                Save
                                < HiOutlineSave className='ml-2' />
                            </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            <div>
                {aiGenerativeSummary && aiGenerativeSummary.length > 0 ? (<>
                    <h2 className='font-semibold text-xl'>Suggestions</h2>
                    <div className='my-5'>
                        {aiGenerativeSummary.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleAiSummary(item?.summary)}
                                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition'
                            >
                                <h2 className='font-bold my-1 text-slate-700'>
                                    Level: <span className='text-blue-500'>{item?.experience_level}</span>
                                </h2>
                                <p>{Array.isArray(item?.summary) ? item.summary.join(" ") : item.summary}</p>
                            </div>
                        ))}
                    </div>
                </>
                ) : (
                    <div className='my-5 text-gray-500 italic'>
                        {errorMsg ? errorMsg : (
                            aiLoading &&
                            "Generating AI suggestions, please wait..."
                        )}
                    </div>
                )}
            </div>

        </>
    );
}

export default Summary