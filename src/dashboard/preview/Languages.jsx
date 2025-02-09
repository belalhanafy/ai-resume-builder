import React from 'react'
import SectionHeader from '../SectionHeader'

const Languages = ({ resumeInfo }) => {
    const { languages } = resumeInfo

    return (
        <div>
            <SectionHeader header={"languges"} resumeInfo={resumeInfo} />
            <ul className='grid grid-cols-2 gap-3 my-4 text-xs'>
                {languages?.map((lang, index) => (
                    <li className='ml-3' key={index}>
                        <h2>{lang.language}</h2>
                        <p>
                            {lang.level}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Languages