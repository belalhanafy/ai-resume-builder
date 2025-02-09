import React from 'react'
import SectionHeader from '../SectionHeader'

const Certificate = ({ resumeInfo }) => {
    const { certifications } = resumeInfo

    return (
        <div>
            <SectionHeader header={"certificates"} resumeInfo={resumeInfo} />
            {certifications?.map((certificate, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-lg font-semibold'>{certificate?.name}</h2>
                    <h2 className='text-sm flex justify-between'>{certificate?.issuer}
                        <span style={{
                            color: resumeInfo?.themeColor
                        }}>{certificate?.date}</span>
                    </h2>
                    {certificate.description && (
                        <div className='text-sm my-1 ml-2' dangerouslySetInnerHTML={{ __html: certificate.description }} />
                    )}
                    
                </div>
            ))}
        </div>
    )
}

export default Certificate