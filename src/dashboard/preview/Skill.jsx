import React from 'react'
import SectionHeader from '../SectionHeader'

const Skill = ({ resumeInfo }) => {
    const { skills } = resumeInfo

    return (
        <div>
            <SectionHeader header={"skills"} resumeInfo={resumeInfo} />
            <ul className='grid grid-cols-2 gap-3 my-4'>
                {skills?.map((skill, index) => (
                    <li className='ml-3' key={index}>
                        <h2>{skill.skillName}</h2>
                        <p className='text-xs'>{skill.skillLevel}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Skill