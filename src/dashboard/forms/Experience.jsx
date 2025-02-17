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



const exp = {
    "title": "",
    "companyName": "",
    "city": "",
    "state": "",
    "startDate": "",
    "endDate": "",
    'workSummary': '',
    "currentlyWorking": false,
}
const Experience = ({ setEnableNext, setLoadingHeader, activeFormIndex }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [experinceList, setExperinceList] = useState([
        exp
    ])



    useEffect(() => {
        resumeInfo?.experience.length > 0 && setExperinceList(resumeInfo?.experience)
    }, [])

    const handleChange = (e, index) => {

        setEnableNext(false);
        const newEntries = experinceList.slice();

        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original experinceList directly.
        //After making changes, you’d use setexperinceList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    };

    const getRichTextValue = (value, index) => {
        const newEntries = experinceList.slice();
        newEntries[index]["workSummary"] = value;
        setExperinceList(newEntries);
    }
    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experinceList.slice();
        newEntries[index][name] = e.target.value;
        setExperinceList(newEntries)
    }
    
    
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experinceList
        })
    }, [experinceList])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                experience: experinceList.map(({ id, ...rest }) => rest)
            }
        }
        try {
            setLoadingHeader(true)
            setLoading(true);
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
    const handleCheckBox = (e, index) => {
        const newEntries = experinceList.slice();
        newEntries[index]["currentlyWorking"] = e.target.checked;
        setExperinceList(newEntries);
    }

    const addNewExperince = () => {
        setExperinceList([...experinceList, {
            "title": "",
            "companyName": "",
            "city": "",
            "state": "",
            "startDate": "",
            "endDate": "",
            'workSummary': '',
            "currentlyWorking": false,
        }]);
        toast({
            description: "New Experience Added",
        })
    };
    const removeExperince = (index) => {
        setExperinceList(experinceList.filter((_, i) => i !== index))
        toast({
            description: "Experience Removed",
        })
    }

    return (

        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>profesional experience</h2>
                <p>Add your previous experience job.</p>
            </div>
            <div>
                {
                    experinceList.map((exp, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="title">position title</label>
                                    <Input
                                        value={exp?.title || ''}
                                        placeholder="Enter Position Title"
                                        type="text"
                                        required
                                        name="title"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="companyName">company name</label>
                                    <Input
                                        value={exp?.companyName}
                                        placeholder="Enter Company Name"
                                        type="text"
                                        required
                                        name="companyName"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="city">city</label>
                                    <Input
                                        value={exp?.city || ''}
                                        placeholder="Enter City"
                                        type="text"
                                        required
                                        name="city"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="state">state</label>
                                    <Input
                                        value={exp?.state || ''}
                                        placeholder="Enter State"
                                        type="text"
                                        required
                                        name="state"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="startDate">start date</label>
                                    <Input
                                        value={exp?.startDate || ''}
                                        placeholder="enter Start Date"
                                        type="text"
                                        required
                                        name="startDate"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={`flex items-start flex-col ${experinceList[index]["currentlyWorking"] ? 'gap-1' : 'gap-5'}`}>
                                    <div className='w-full'>
                                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="endDate">end date</label>
                                        {!experinceList[index]["currentlyWorking"] ? (
                                            <Input
                                                value={exp?.endDate || ''}
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
                                                <input type="checkbox" onChange={(e) => handleCheckBox(e, index)} checked={exp?.currentlyWorking || false}
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



                                <div className='col-span-2'>
                                    {/* work description */}
                                    {/* The function handleRichTextEditor is passed as a prop named onHandleRichTextEditor. */}
                                    <RichTextEditor activeFormIndex={activeFormIndex} disabled={loading} existValue={exp?.workSummary} getRichTextValue={getRichTextValue} index={index} onRichTextEditorChange={(e) => handleRichTextEditor(e, "workSummary", index)} />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex items-center justify-center gap-3'>
                                {experinceList.length - 1 == index &&
                                    <Button disabled={loading} onClick={() => addNewExperince()} type="button" variant="outline">
                                        < IoAdd className='mr-1' />
                                        Add More Experince
                                    </Button>
                                }
                                {experinceList.length != 1 &&

                                    <Button onClick={() => removeExperince(index)} disabled={loading} type="button" variant="destructive">
                                        < IoTrashOutline className='mr-1' />
                                        Remove
                                    </Button>
                                }
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

export default Experience