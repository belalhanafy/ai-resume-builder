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



const project = {
    "name": "",
    "description": "",
    "technologies": "",
    "link": "",
}
const Projects = ({ setEnableNext, activeFormIndex,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [projectsList, setProjectsList] = useState([
        project
    ])




    const handleChange = (e, index) => {

        setEnableNext(false);
        const newEntries = projectsList.slice();

        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original projectsList directly.
        //After making changes, you’d use setexperinceList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setProjectsList(newEntries);
    };

    
    const handleRichTextEditor = (e, name, index) => {
        const newEntries = projectsList.slice();
        newEntries[index][name] = e.target.value;
        setProjectsList(newEntries)
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            projects: projectsList
        })
    }, [projectsList])

    useEffect(()=>{
        resumeInfo?.projects.length>0&&setProjectsList(resumeInfo?.projects)
        if (resumeInfo?.projects.length >= 1) {
            setEnableNext(true)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                projects:projectsList.map(({ id, ...rest }) => rest) 
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

    const addNewProjects = () => {
        setProjectsList([...projectsList, {
            "name": "",
            "description": "",
            "technologies": "",
            "link": "",
        }]);
        toast({
            description: "New Project Added",
        })
    };
    const removeProjects = (index) => {
        setProjectsList(projectsList.filter((_, i) => i !== index))
        toast({
            description: "Project Removed",
        })
    }

    return (

        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>profesional projects</h2>
                <p>Add your projects here.</p>
            </div>
            <div>
                {
                    projectsList.map((project, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="name">project name</label>
                                    <Input
                                        value={project?.name || ''}
                                        placeholder="Enter Project Name"
                                        type="text"
                                        required
                                        name="name"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="technologies">project technologies</label>
                                    <Input
                                        value={project?.technologies}
                                        placeholder="Enter technologies used in this project separated by comma (like React, Tailwind, etc)"
                                        type="text"
                                        required
                                        name="technologies"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="link">project link</label>
                                    <Input
                                        value={project?.link || ''}
                                        placeholder="Enter Project Link"
                                        type="text"
                                        required
                                        name="link"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    {/* work description */}
                                    {/* The function handleRichTextEditor is passed as a prop named onHandleRichTextEditor. */}
                                    <RichTextEditor disabled={loading} existValue={project?.description} activeFormIndex={activeFormIndex} index={index} onRichTextEditorChange={(e) => handleRichTextEditor(e, "description", index)} />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex items-center justify-center gap-3'>
                                {projectsList.length - 1 == index &&
                                    <Button disabled={loading} onClick={() => addNewProjects()} type="button" variant="outline">
                                        < IoAdd className='mr-1' />
                                        Add More Projects
                                    </Button>
                                }
                                {projectsList.length != 1 &&

                                    <Button onClick={() => removeProjects(index)} disabled={loading} type="button" variant="destructive">
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

export default Projects