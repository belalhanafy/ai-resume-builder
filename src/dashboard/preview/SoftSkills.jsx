import React from 'react'
import SectionHeader from '../SectionHeader'

const SoftSkills = ({ resumeInfo }) => {
    const { softSkills } = resumeInfo

    return (
        <div>
            <SectionHeader header={"soft skills"} resumeInfo={resumeInfo} />
            <ul className='grid grid-cols-2 gap-3 my-4'>
                {softSkills?.map((skill, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <li className='text-xs ml-3'>{skill.softSkillName}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default SoftSkills