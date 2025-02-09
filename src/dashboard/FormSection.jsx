import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import { Button } from '@/components/ui/button'
import { IoHome } from "react-icons/io5";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import Education from './forms/Education';
import Skills from './forms/Skills';
import Certifications from './forms/Certifications';
import Projects from './forms/Projects';
import SoftSkills from './forms/SoftSkills';
import Hobbies from './forms/Hobbies';
import Languages from './forms/Languages';
import { Link, useParams } from 'react-router-dom';
import { SiReaddotcv } from "react-icons/si";
import ThemeColor from './preview/ThemeColor';

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const [loadingHeader, setLoadingHeader] = useState(false)
  const { resumeId } = useParams()

  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <ThemeColor/>
        </div>
        <div className='flex gap-4'>
          {activeFormIndex > 1 &&
            <Button disabled={loadingHeader} onClick={() => setActiveFormIndex(prevIndex => prevIndex - 1)} className="bg-blue-500 hover:bg-blue-600 text-white">
              <IoMdArrowRoundBack />
            </Button>
          }
          {activeFormIndex != 10 ? (
            <Button disabled={!enableNext} onClick={() => setActiveFormIndex(prevIndex => prevIndex + 1)} className="bg-blue-500 hover:bg-blue-600 text-white">
              Next
              <IoMdArrowRoundForward />
            </Button>
          ) : (<Link to={`/myResume/${resumeId}/view`}>
            <Button disabled={!enableNext} className="bg-blue-500 hover:bg-blue-600 text-white">
              View
              <SiReaddotcv />
            </Button>
          </Link>)
          }
        </div>
      </div>
      <div>
        {/* personal details */}
        {activeFormIndex == 1 &&
          <PersonalDetail setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }
        {/* summary */}
        {activeFormIndex == 2 &&
          <Summary setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }
        {/* professional experience */}
        {activeFormIndex == 3 &&
          <Experience setLoadingHeader={setLoadingHeader}  activeFormIndex={activeFormIndex} setEnableNext={setEnableNext} />
        }
        {/* educational details */}
        {activeFormIndex == 4 &&
          <Education setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }

        {/* skills */}
        {activeFormIndex == 5 &&
          <Skills setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }

        {/* certifications */}
        {activeFormIndex == 6 &&
          <Certifications setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }
        {/* projects */}
        {activeFormIndex == 7 &&
          <Projects setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }
        {/* softSkills */}
        {activeFormIndex == 8 &&
          <SoftSkills setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }

        {/* hobbies */}
        {activeFormIndex == 9 &&
          <Hobbies setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }

        {/* languages */}
        {activeFormIndex == 10 &&
          <Languages setLoadingHeader={setLoadingHeader} setEnableNext={setEnableNext} />
        }

      </div>
    </div>
  )
}

export default FormSection