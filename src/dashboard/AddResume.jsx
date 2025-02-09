import React, { useState } from 'react'
import { GoPlusCircle } from "react-icons/go";
import GlobalApi from './../../services/GlobalApi';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
    const { user } = useUser();
    const navigation = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState('')
    const [loading, setLoading] = useState(false)
    
    const onCreate = async () => {
        const uniqueId = uuidv4();  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const finalTitle = resumeTitle.trim()
        const data = {
            data: {
                title: finalTitle,
                resumeId: uniqueId,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName
            }
        }
        try {
            setLoading(true);

            const resp = await GlobalApi.CreateNewResume(data);
            console.log(resp.data.data);
            
            if (resp) {
                setLoading(false);
                navigation('/dashboard/resume/' + resp.data.data.documentId + "/edit");
            }
        } catch (error) {
            console.error("Error creating resume:", error);
        } finally {
            setLoading(false);
            setOpenDialog(false)
            setResumeTitle('')
        }
    }
    return (
        <>
            <div onClick={() => setOpenDialog(true)}>
                <div className='bg-slate-200 flex rounded-md items-center justify-center border-2 border-black border-dashed  h-72 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-xl'>
                    <GoPlusCircle className='text-3xl' />
                </div>
            </div>
            <Dialog open={openDialog} onOpenChange={(openDialog) => setOpenDialog(openDialog)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-xl">Create New Resume </DialogTitle>
                        <DialogDescription className="text-base text-slate-500">Add a title for your new resume</DialogDescription>
                        <div>
                            <Input value={resumeTitle} onChange={(e) => setResumeTitle(e.target.value)} type="text" placeholder="EX: Full Stack Resume" />
                        </div>
                        <div className='flex gap-3 justify-end space-y-2 items-end'>
                            <Button onClick={() => setOpenDialog(false)} variant="destructive">
                                Cancel
                            </Button>

                            <Button disabled={!resumeTitle || loading} onClick={onCreate} className="bg-blue-500">
                                {loading ? (<span className="loader-btn"></span>) : ("Create")}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddResume