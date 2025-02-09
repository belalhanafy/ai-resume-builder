import React, { useContext } from 'react'
import { ResumeInfoContext } from './context/ResumeInfoContext'
import PersonalDetails from './preview/PersonalDetails';
import Summary from './preview/Summary';
import Experience from './preview/Experience';
import Education from './preview/Education';
import Skill from './preview/Skill';
import Certificate from './preview/Certificate';
import Project from './preview/Project';
import SoftSkills from './preview/SoftSkills';
import Hobbies from './preview/Hobbies';
import Languages from './preview/Languages';

const ResumePreview = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    return (
        <div className='shadow-lg h-full p-6 rounded-lg border-t-4'
            style={{
                borderColor: resumeInfo?.themeColor
            }}>
            {/* personal details */}
            <PersonalDetails resumeInfo={resumeInfo} />
            {/* summary */}
            {resumeInfo.summary &&
                <Summary resumeInfo={resumeInfo} />
            }
            {/* professional experience */}
            {resumeInfo.experience.length > 0 &&
                <Experience resumeInfo={resumeInfo} />
            }
            {/* educational details */}
            {resumeInfo.education.length > 0 &&
                <Education resumeInfo={resumeInfo} />
            }
            {/* skills */}
            {resumeInfo.skills.length > 0 &&
                <Skill resumeInfo={resumeInfo} />
            }

            {/* certifications */}
            {resumeInfo.certifications.length > 0 &&
                <Certificate resumeInfo={resumeInfo} />
            }
            {/* projects */}
            {resumeInfo.projects.length > 0 &&
                <Project resumeInfo={resumeInfo} />
            }
            {/* softSkills */}
            {resumeInfo.softSkills.length > 0 &&
                <SoftSkills resumeInfo={resumeInfo} />
            }
            {/* hobbies */}
            {resumeInfo.hobbies.length > 0 &&
                <Hobbies resumeInfo={resumeInfo} />
            }
            {/* languages */}
            {resumeInfo.languages.length > 0 &&
                <Languages resumeInfo={resumeInfo} />
            }
        </div>
    )
}

export default ResumePreview