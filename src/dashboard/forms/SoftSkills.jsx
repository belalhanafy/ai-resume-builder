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

const softSkill = {
    "softSkillName": "",
}
const SoftSkills = ({ setEnableNext,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [softSkillList, setSoftSkillList] = useState([
        softSkill
    ])
    useEffect(() => {
        resumeInfo?.softSkills.length > 0 && setSoftSkillList(resumeInfo?.softSkills)
    }, [])


    useEffect(() => {   
        setResumeInfo({
            ...resumeInfo,
            softSkills: softSkillList.map(({ id, ...rest }) => rest)
        })
    }, [softSkillList])

    const handleChange = (e, index) => {

        setEnableNext(false);
        const newEntries = softSkillList.slice();

        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original softSkillList directly.
        //After making changes, you’d use setSoftSkillList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setSoftSkillList(newEntries);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                softSkills: softSkillList.map(({ id, ...rest }) => rest)
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

    const addNewSkill = () => {
        setSoftSkillList([...softSkillList, {
            "softSkillName": "",
        }]);
        toast({
            description: "New skill Added",
        })
    };
    const removeSkill = (index) => {
        setSoftSkillList(softSkillList.filter((_, i) => i !== index))
        toast({
            description: "skill Removed",
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>soft skiils</h2>
                <p>Add your soft skills.</p>
            </div>
            <div>
                {
                    softSkillList.map((skill, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="softSkillName">skill name</label>
                                    <Input
                                        value={skill?.softSkillName}
                                        placeholder="Enter Skill Name"
                                        type="text"
                                        required
                                        name="softSkillName"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center gap-3'>
                                    {softSkillList.length - 1 == index &&
                                        <Button disabled={loading} onClick={() => addNewSkill()} type="button" variant="outline">
                                            < IoAdd className='mr-1' />
                                            Add Skill
                                        </Button>
                                    }
                                    {softSkillList.length != 1 &&
                                        <Button onClick={() => removeSkill(index)} disabled={loading} type="button" variant="destructive">
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

export default SoftSkills