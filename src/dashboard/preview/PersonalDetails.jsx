import React from 'react';
import { IoMailOutline, IoCalendarOutline, IoLogoLinkedin, IoLogoGithub, IoFlagOutline, IoPersonOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
const PersonalDetails = ({ resumeInfo }) => {
    return (
        resumeInfo && (
            <div>
                <h2 className='font-semibold capitalize text-3xl' style={{ color: resumeInfo?.themeColor }}>
                    {resumeInfo?.firstName} {resumeInfo?.lastName}
                </h2>
                <h2 className='font-medium capitalize'>{resumeInfo?.jobTitle}</h2>

                <div className='mt-2 grid grid-cols-1 gap-3 lg:grid-cols-2'>
                    {resumeInfo?.email && (
                        <div className='flex gap-2 items-center'>
                            <IoMailOutline className='text-lg' />
                            <h2>{resumeInfo?.email}</h2>
                        </div>
                    )}

                    {resumeInfo?.address && (
                        <div className='flex gap-2 items-center'>
                            <FaLocationDot className='text-lg' />
                            <h2>{resumeInfo?.address}</h2>
                        </div>
                    )}

                    {resumeInfo?.phone && (
                        <div className='flex gap-2 items-center'>
                            <FiPhone className='text-lg' />
                            <h2>{resumeInfo?.phone}</h2>
                        </div>
                    )}

                    {resumeInfo?.dob && (
                        <div className='flex gap-2 items-center'>
                            <IoCalendarOutline className='text-lg' />
                            <h2>{resumeInfo?.dob}</h2>
                        </div>
                    )}

                    {resumeInfo?.nationality && (
                        <div className='flex gap-2 items-center capitalize'>
                            <IoFlagOutline className='text-lg' />
                            <h2>{resumeInfo?.nationality}</h2>
                        </div>
                    )}

                    {resumeInfo?.linkedin && (
                        <div className='flex gap-2 items-center'>
                            <IoLogoLinkedin className='text-lg' />
                            <a href={resumeInfo?.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    )}

                    {resumeInfo?.github && (
                        <div className='flex gap-2 items-center'>
                            <IoLogoGithub className='text-lg' />
                            <a href={resumeInfo?.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                GitHub
                            </a>
                        </div>
                    )}

                    {resumeInfo?.portfolio && (
                        <div className='flex gap-2 items-center'>
                            <IoPersonOutline className='text-lg' />
                            <a href={resumeInfo?.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Portfolio
                            </a>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default PersonalDetails;
