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

const skill = {
    "skillName": "",
    "skillLevel": "",
}
const Skills = ({ setEnableNext,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [skillList, setSkillList] = useState([
        skill
    ])

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillList
        })
    }, [skillList])
    
    useEffect(() => {
        resumeInfo?.skills.length > 0 && setSkillList(resumeInfo?.skills)
    }, [])

    const handleChange = (e, index) => {

        setEnableNext(false);
        const newEntries = skillList.slice();

        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original skillList directly.
        //After making changes, you’d use setSkillList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setSkillList(newEntries);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                skills: skillList.map(({ id, ...rest }) => rest)
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
        setSkillList([...skillList, {
            "skillName": "",
            "skillLevel": "",
        }]);
        toast({
            description: "New skill Added",
        })
    };
    const removeSkill = (index) => {
        setSkillList(skillList.filter((_, i) => i !== index))
        toast({
            description: "skill Removed",
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>skiils</h2>
                <p>Add your top professional Key skills.</p>
            </div>
            <div>
                {
                    skillList.map((skill, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="skillName">skill name</label>
                                    <Input
                                        value={skill?.skillName}
                                        placeholder="Enter Skill Name"
                                        type="text"
                                        required
                                        name="skillName"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="skillLevel">Select Skill Level</label>
                                        <select disabled={loading} name="skillLevel" value={skill.skillLevel} onChange={(e) => handleChange(e, index)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option value="" disabled selected>Skill Level</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="amateur">Amateur</option>
                                            <option value="Competent">Competent</option>
                                            <option value="proficient">Proficient</option>
                                            <option value="expert">Expert</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center gap-3'>
                                    {skillList.length - 1 == index &&
                                        <Button disabled={loading} onClick={() => addNewSkill()} type="button" variant="outline">
                                            < IoAdd className='mr-1' />
                                            Add Skill
                                        </Button>
                                    }
                                    {skillList.length != 1 &&

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

export default Skills