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

const hobby = {
    "hobbyName": "",
}
const SoftSkills = ({ setEnableNext,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [hobbyList, setHobbyList] = useState([
        hobby
    ])

    useEffect(()=>{
            resumeInfo?.hobbies.length>0&&setHobbyList(resumeInfo?.hobbies)
        },[])
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            hobbies: hobbyList
        })
    }, [hobbyList])

    const handleChange = (e, index) => {

        setEnableNext(false);
        const newEntries = hobbyList.slice();

        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original hobbyList directly.
        //After making changes, you’d use setHobbyList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setHobbyList(newEntries);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                hobbies: hobbyList.map(({ id, ...rest }) => rest)
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

    const addNewHobby = () => {
        setHobbyList([...hobbyList, {
            "hobbyName": "",
        }]);
        toast({
            description: "New hobby Added",
        })
    };
    const removeHobby = (index) => {
        setHobbyList(hobbyList.filter((_, i) => i !== index))
        toast({
            description: "hobby Removed",
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>hobbies</h2>
                <p>Add your Hobbies here.</p>
            </div>
            <div>
                {
                    hobbyList.map((hobby, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="hobbyName">hobby name</label>
                                    <Input
                                        value={hobby?.hobbyName}
                                        placeholder="Enter hobby Name"
                                        type="text"
                                        required
                                        name="hobbyName"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center gap-3'>
                                    {hobbyList.length - 1 == index &&
                                        <Button disabled={loading} onClick={() => addNewHobby()} type="button" variant="outline">
                                            < IoAdd className='mr-1' />
                                            Add Skill
                                        </Button>
                                    }
                                    {hobbyList.length != 1 &&

                                        <Button onClick={() => removeHobby(index)} disabled={loading} type="button" variant="destructive">
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