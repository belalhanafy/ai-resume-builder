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


const certificate = {
    "name": "",
    "issuer": "",
    "date": "",
    "description": ''
}
const Certifications = ({ setEnableNext,activeFormIndex,setLoadingHeader }) => {
    const { toast } = useToast()
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false)
    const [certificateList, setCertificateList] = useState([
        certificate
    ])
    const handleChange = (e, index) => {
        setEnableNext(false);
        const newEntries = certificateList.slice();
        //slice() without arguments (slice()) returns a shallow copy of the entire array.
        //By working on this new copy (newEntries), you avoid mutating the original certificateList directly.
        //After making changes, you’d use setCertificateList(newEntries) to update the state.
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setCertificateList(newEntries);
    };


    const handleRichTextEditor = (e, name, index) => {
        const newEntries = certificateList.slice();
        newEntries[index][name] = e.target.value;
        setCertificateList(newEntries)
    }

    useEffect(()=>{
        resumeInfo?.certifications.length>0&&setCertificateList(resumeInfo?.certifications)
    },[])
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            certifications:certificateList.map(({ id, ...rest }) => rest) 
        })
    }, [certificateList])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            data: {
                certifications: certificateList.map(({ id, ...rest }) => rest)
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

    const addNewCertificate = () => {
        setCertificateList([...certificateList, {
            "name": "",
            "issuer": "",
            "date": "",
            "description": ''
        }]);
        toast({
            description: "New certificate Added",
        })
    };
    const removeCertificate = (index) => {
        setCertificateList(certificateList.filter((_, i) => i !== index))
        toast({
            description: "certificate Removed",
        })
    }
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-4 border-t-blue-500 mb-16'>
            <div className='mb-5'>
                <h2 className='text-xl font-semibold uppercase'>certificates</h2>
                <p>Add your certificatea here.</p>
            </div>
            <div>
                {
                    certificateList.map((cer, index) => (
                        <form key={index} className='mt-5'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 p-3 border rounded-lg">
                                <div className='col-span-2'>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="name">certificate name</label>
                                    <Input
                                        value={cer?.name}
                                        placeholder="Enter certificate Name"
                                        type="text"
                                        required
                                        name="name"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="issuer">certificate issuer</label>
                                    <Input
                                        value={cer?.issuer}
                                        placeholder="Enter Certificate Issuer"
                                        type="text"
                                        required
                                        name="issuer"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2 capitalize" htmlFor="date">certificate date</label>
                                    <Input
                                        value={cer?.date}
                                        placeholder="Enter certificate date"
                                        type="text"
                                        required
                                        name="date"
                                        onChange={(e) => handleChange(e, index)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    {/* work description */}
                                    {/* The function handleRichTextEditor is passed as a prop named onHandleRichTextEditor. */}
                                    <RichTextEditor disabled={loading} activeFormIndex={activeFormIndex} existValue={cer?.description} index={index} onRichTextEditorChange={(e) => handleRichTextEditor(e, "description", index)} />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className='flex justify-center items-center'>
                                <div className='flex items-center gap-3'>
                                    {certificateList.length - 1 == index &&
                                        <Button disabled={loading} onClick={() => addNewCertificate()} type="button" variant="outline">
                                            < IoAdd className='mr-1' />
                                            Add certificate
                                        </Button>
                                    }
                                    {certificateList.length != 1 &&
                                    <Button onClick={() => removeCertificate(index)} disabled={loading} type="button" variant="destructive">
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

export default Certifications