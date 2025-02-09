import React from 'react'
import SectionHeader from '../SectionHeader'

const Hobbies = ({ resumeInfo }) => {
    const { hobbies } = resumeInfo

    return (
        <div>
            <SectionHeader header={"hobbies"} resumeInfo={resumeInfo} />
            <ul className='grid grid-cols-2 gap-3 my-4'>
                {hobbies?.map((hobbie, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <li className='text-xs ml-3'>{hobbie.hobbyName}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Hobbies