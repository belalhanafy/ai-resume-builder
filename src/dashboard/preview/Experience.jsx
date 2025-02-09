import React from 'react'
import SectionHeader from '../SectionHeader';

const Experience = ({ resumeInfo }) => {
    const { experience } = resumeInfo;
    
    return (
        <div>
            <SectionHeader header={"Profesional experince"} resumeInfo={resumeInfo} />

            {experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-lg font-semibold'>{experience?.title}</h2>
                    <h2 className='text-sm flex justify-between'>
                        <div>

                            {experience?.companyName && <span>{experience?.companyName}</span>}
                            {experience?.companyName && experience?.city && <span>, </span>}

                            {experience?.city && <span>{experience?.city}</span>}
                            {experience?.city && experience?.state && <span>, </span>}

                            {experience?.state && <span>{experience?.state}</span>}
                        </div>
                        <div>
                            {(experience?.startDate || experience?.endDate || experience?.currentlyWorking) && (
                                <span style={{ color: resumeInfo?.themeColor }}>
                                    {experience?.startDate && `${experience?.startDate}`}
                                    {experience?.startDate && (experience?.endDate || experience?.currentlyWorking) && ` To `}
                                    {experience?.currentlyWorking ? 'Present' : experience.endDate}
                                </span>
                            )}
                        </div>
                    </h2>
                    {/* This will allow the raw HTML in experience?.workSummary to be rendered as actual HTML content, so the <p>, <strong>, <em>, etc., will be respected and displayed correctly on the page. */}
                    <div className='text-sm my-1 ml-2' dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
                </div>
            ))}
        </div>
    )
}

export default Experience