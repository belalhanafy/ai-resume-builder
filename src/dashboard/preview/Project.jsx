import React from 'react'
import SectionHeader from '../SectionHeader'
import { HiOutlineLink } from "react-icons/hi";
const Project = ({ resumeInfo }) => {
    const { projects } = resumeInfo

    return (
        <div>
            <SectionHeader header={"projects"} resumeInfo={resumeInfo} />
            {projects?.map((project, index) => (
                <div key={index} className='my-5'>
                        <a href={project.link} className={`${ project.link? "text-blue-500 hover:underline flex gap-1 items-center" : "text-black" }`} target="_blank" rel="noopener noreferrer" >
                    {project.link && 
                        <HiOutlineLink />
                    }
                        <h2 className='text-lg font-semibold'>{project?.name}</h2>
                    </a>
                    <h2 className='text-sm flex justify-between'>{project?.technologies}</h2>
                    {project.description && (
                        <div className='text-sm my-1 ml-2' dangerouslySetInnerHTML={{ __html: project.description }} />
                    )}
                    
                </div>
            ))}
        </div>
    )
}

export default Project