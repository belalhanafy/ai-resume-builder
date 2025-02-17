import React, { useState, useContext, useEffect } from 'react'
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HiOutlineSave } from "react-icons/hi";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import GlobalApi from '../../../services/GlobalApi';
import { useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"
import RichTextEditor from './RichTextEditor';


const education = {
    "institutionName": "",
    "startDate": "",
    "endDate": "",
    "currentlyWorking": false,
    "degree": "",
    "major": "",
    "description": ''
}
const Education = ({ activeFormIndex, setEnableNext, setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [educationList, setEducationList] = useState([
        education
    ])
    const handleChange = (e, index) => {
        setEnableNext(false);
        const newEntries = educationList.slice();
        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original educationList directly.
        //After making changes, you’d use setEducationList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setEducationList(newEntries);
    };


    const handleRichTextEditor = (e, name, index) => {
        const newEntries = educationList.slice();
        newEntries[index][name] = e.target.value;
        setEducationList(newEntries)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationList.map(({ id, ...rest }) => rest)
        })
    }, [educationList])

    useEffect(() => {
        resumeInfo?.education.length > 0 && setEducationList(resumeInfo?.education)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                education: educationList.map(({ id, ...rest }) => rest)
            }
        }
        try {
            setLoading(true);
            setLoadingHeader(true)
            const resp = await GlobalApi.UpdateResume(resumeId, data);
            if (resp) {
                setLoading(false);
            }
            toast({
                description: "Details Updated",
            })
        } finally {
            setLoading(false);
            setEnableNext(true);
            setLoadingHeader(false)
        }
    };

    const addNewEducation = () => {
        setEducationList([...educationList, {
            "institutionName": "",
            "startDate": "",
            "endDate": "",
            "degree": "",
            "major": "",
            "description": ''
        }]);
        toast({
            description: "New Education Added",
        })
    };
    const handleCheckBox = (e, index) => {
        const newEntries = educationList.slice();
        newEntries[index]["currentlyWorking"] = e.target.checked;
        setEducationList(newEntries);
    }
    const removeEducation = (index) => {
        setEducationList(educationList.filter((_, i) => i !== index))
        toast({
            description: "Education Removed",
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>education</h2>
                <p>Add your educational details.</p>
            </div>
            <div>
                {
                    educationList.map((edu, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="institutionName">institution name</label>
                                    <Input
                                        disabled={loading}
                                        value={edu?.institutionName}
                                        placeholder="Enter Institution Name"
                                        type="text"
                                        required
                                        name="institutionName"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="degree">degree</label>
                                    <Input
                                        disabled={loading}
                                        value={edu?.degree}
                                        placeholder="Enter Degree"
                                        type="text"
                                        required
                                        name="degree"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="major">major</label>
                                    <Input
                                        value={edu?.major}
                                        placeholder="Enter Major"
                                        type="text"
                                        required
                                        name="major"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="startDate">start date</label>
                                    <Input
                                        value={edu.startDate}
                                        placeholder="Enter Start Date"
                                        type="text"
                                        required
                                        name="startDate"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <div className={`flex items-start flex-col ${educationList[index]["currentlyWorking"] ? 'gap-1' : 'gap-5'}`}>
                                        <div className='w-full'>
                                            <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="endDate">
                                                End Date
                                            </label>
                                            {!educationList[index]["currentlyWorking"] ? (
                                                <Input
                                                    value={edu?.endDate || ''}
                                                    placeholder="enter End Date"
                                                    type="text"
                                                    required
                                                    name="endDate"
                                                    onChange={(e) => handleChange(e, index)}
                                                    disabled={loading}
                                                />
                                            ) : ('')
                                            }
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <div className='w-[20px] h-[20px] '>
                                                <label className="neon-checkbox">
                                                    <input type="checkbox" onChange={(e) => handleCheckBox(e, index)} checked={edu?.currentlyWorking || false}
                                                    />
                                                    <div className="neon-checkbox__frame">
                                                        <div className="neon-checkbox__box">
                                                            <div className="neon-checkbox__check-container">
                                                                <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                                                                    <path d="M3,12.5l7,7L21,5" />
                                                                </svg>
                                                            </div>
                                                            <div className="neon-checkbox__glow" />
                                                            <div className="neon-checkbox__borders">
                                                                <span /><span /><span /><span />
                                                            </div>
                                                        </div>
                                                        <div className="neon-checkbox__effects">
                                                            <div className="neon-checkbox__particles">
                                                                <span /><span /><span /><span /> <span /><span /><span /><span /> <span /><span /><span /><span />
                                                            </div>
                                                            <div className="neon-checkbox__rings">
                                                                <div className="ring" />
                                                                <div className="ring" />
                                                                <div className="ring" />
                                                            </div>
                                                            <div className="neon-checkbox__sparks">
                                                                <span /><span /><span /><span />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <p>Precent (Current)</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-span-2'>
                                    {/* work description */}
                                    {/* The function handleRichTextEditor is passed as a prop named onHandleRichTextEditor. */}
                                    <RichTextEditor disabled={loading} existValue={edu?.description} activeFormIndex={activeFormIndex} index={index} onRichTextEditorChange={(e) => handleRichTextEditor(e, "description", index)} />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center gap-3'>
                                    {educationList.length - 1 == index &&
                                        <Button disabled={loading} onClick={() => addNewEducation()} type="button" variant="outline">
                                            < IoAdd className='mr-1' />
                                            Add Education
                                        </Button>
                                    }
                                    {educationList.length != 1 &&
                                        <Button onClick={() => removeEducation(index)} disabled={loading} type="button" variant="destructive">
                                            < IoTrashOutline className='mr-1' />
                                            Remove
                                        </Button>
                                    }

                                </div>

                            </div>
                        </form>
                    ))
                }
                <div className='flex justify-center mt-10'>
                    <Button onClick={handleSubmit} disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                        {loading ? (<span className="loader-btn"></span>) : (<>
                            Save All
                            < HiOutlineSave className='ml-2' />
                        </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Education