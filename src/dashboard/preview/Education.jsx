import React from 'react';
import SectionHeader from '../SectionHeader';

const Education = ({ resumeInfo }) => {
    const { education } = resumeInfo;

    return (
        <div>
            <SectionHeader header={"education"} resumeInfo={resumeInfo} />
            {education?.map((edu, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-lg font-semibold'>{edu.institutionName}</h2>

                    <h2 className='text-sm flex justify-between'>
                        {/* Display degree and major only if available */}
                        {edu.degree && edu.major
                            ? `${edu.degree} in ${edu.major}`
                            : edu.degree || edu.major}

                        {/* Date Range */}
                        {(edu.startDate || edu.currentlyWorking || edu.endDate) && (
                            <span style={{ color: resumeInfo?.themeColor }}>
                                {edu.startDate}
                                {(edu.endDate || edu.currentlyWorking) && ` to ${edu.currentlyWorking ? 'Present' : edu.endDate}`}
                            </span>
                        )}
                    </h2>

                    {edu.description && (
                        <div className='text-sm my-1 ml-2' dangerouslySetInnerHTML={{ __html: edu.description }} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Education;
