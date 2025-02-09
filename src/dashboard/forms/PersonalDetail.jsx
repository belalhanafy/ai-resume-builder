import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HiOutlineSave } from "react-icons/hi";
import GlobalApi from '../../../services/GlobalApi';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"

const PersonalDetail = ({ setEnableNext,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)

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
    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: formData
        }
        try {
            setLoading(true);
            setLoadingHeader(true)
            const resp = await GlobalApi.UpdateResume(resumeId, data);
            if (resp) {
                setLoading(false);
            }
            toast({
                description: "Details Updated",
            })
        } catch (error) {
            console.error("Error creating resume:", error);
        } finally {
            setLoading(false);
            setEnableNext(true);
            setLoadingHeader(false)
        }
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500'>
            <h2 className='text-xl font-semibold uppercase'>Personal Details</h2>
            <p>Get started with your basic information.</p>

            <form className='mt-5' onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="firstName">First Name</label>
                        <Input
                            value={resumeInfo?.firstName || ''}
                            placeholder="Enter your first name"
                            type="text"
                            required
                            name="firstName"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="lastName">Last Name</label>
                        <Input
                            value={resumeInfo?.lastName || ''}
                            placeholder="Enter your last name"
                            type="text"
                            required
                            name="lastName"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="jobTitle">Job Title</label>
                        <Input
                            value={resumeInfo?.jobTitle || ''}
                            placeholder="e.g., Full Stack Developer"
                            type="text"
                            required
                            name="jobTitle"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="address">Address</label>
                        <Input
                            value={resumeInfo?.address || ''}
                            placeholder="Enter your address"
                            type="text"
                            required
                            name="address"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="phone">Phone</label>
                        <Input
                            value={resumeInfo?.phone || ''}
                            placeholder="e.g., (123)-456-7890"
                            type="text"
                            required
                            name="phone"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="email">Email</label>
                        <Input
                            value={resumeInfo?.email || ''}
                            placeholder="Enter your email"
                            type="email"
                            required
                            name="email"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="nationality">Nationality</label>
                        <Input
                            value={resumeInfo?.nationality || ''}
                            placeholder="Enter your nationality"
                            type="text"
                            required
                            name="nationality"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="dob">Date of Birth</label>
                        <Input
                            value={resumeInfo?.dob || ''}
                            placeholder="DD-MM-YYYY"
                            type="text"
                            required
                            name="dob"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <p className='text-2xl my-2 font-semibold col-span-2'>Links</p>

                    <div className='col-span-2'>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="linkedin">LinkedIn</label>
                        <Input
                            value={resumeInfo?.linkedin || ''}
                            placeholder="https://linkedin.com/in/username"
                            type="text"
                            required
                            name="linkedin"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="github">GitHub</label>
                        <Input
                            value={resumeInfo?.github || ''}
                            placeholder="https://github.com/username"
                            type="text"
                            required
                            name="github"
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="portfolio">Portfolio</label>
                        <Input
                            value={resumeInfo?.portfolio || ''}
                            placeholder="https://yourportfolio.com"
                            type="text"
                            required
                            name="portfolio"
                            onChange={handleChange}
                            disabled={loading}
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
    );
};

export default PersonalDetail;
