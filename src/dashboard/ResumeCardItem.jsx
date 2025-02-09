import { Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineDotsVertical } from "react-icons/hi";
import GlobalApi from '../../services/GlobalApi';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from '@/hooks/use-toast';

const ResumeCardItem = ({ resume,refreshData }) => {
    const [openAlert,setOpenAlert]=useState(false);
    const [loading,setLoading]=useState(false);

    const handleDelate = async (resumeId) => {
        try {
            setLoading(true);
            const resp = await GlobalApi.DeleteResume(resumeId);
            toast({
                title: "Resume Deleted successfully",
            })
        } catch (error) {
            console.error("Error deleting resume:", error);
        } finally {
            refreshData()
            setLoading(false);
            setOpenAlert(false)
        }
    }
    return (
        <div>
            <div className='relative bg-secondary flex items-center justify-center border-primary rounded-md hover:scale-105 transition-all duration-300 cursor-pointer rounded-br-none rounded-bl-none hover:shadow-xl p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 rounded-t-lg border-t-4 border-blue-500'>
                <Link to={'/dashboard/resume/' + resume.documentId + "/edit"} className='flex items-center justify-center h-[180px] '>
                    {/* <Notebook/> */}
                    <img src="/cv.png" width={80} height={80} />
                </Link>
                <div className='flex justify-between items-center bg-black text-white absolute top-full text-nowrap rounded-br-md rounded-bl-md ring-0 left-0 w-full p-2'>
                    <h2 >{resume.title}</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger><HiOutlineDotsVertical /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link to={`/myResume/${resume.documentId}/view`}>
                                <DropdownMenuItem>View</DropdownMenuItem>
                            </Link>
                            <Link to={`/myResume/${resume.documentId}/view`}>
                                <DropdownMenuItem>Download</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={openAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your resume
                                    and remove resume data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=>handleDelate(resume.documentId)}
                                    disabled={loading}>
                                    {loading ? (<span className="loader-btn"></span>) : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    )
}

export default ResumeCardItem