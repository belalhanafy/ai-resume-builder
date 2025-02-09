import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import GlobalApi from '../../../services/GlobalApi';
import { LuPaintbrushVertical } from "react-icons/lu";
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@/loader/Loading';
import { IoHome } from 'react-icons/io5';

const ThemeColor = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || '');
    const { resumeId } = useParams()
    const setThemeColor = async (color, name) => {
        setSelectedColor(color)
        setResumeInfo({ ...resumeInfo, themeColor: color, themeColorName: name });
        const data = {
            data: {
                themeColor: color,
                themeColorName: name
            }
        }
        try {
            setLoading(true);
            const resp = await GlobalApi.UpdateResume(resumeId, data);
            toast({ description: "Color selected successfully" });
        } catch (error) {
            console.log("fail to select color", error);
        } finally {
            setLoading(false);
        }
    }
    const colors = [
        // Black & Dark Grays
        { color: "#000000", name: "Black" },
        { color: "#1C1C1C", name: "Very Dark Gray" },
        { color: "#2C2C2C", name: "Dark Gray" },
        { color: "#3D3D3D", name: "Medium Dark Gray" },
        { color: "#555555", name: "Medium Gray" },
        { color: "#6C757D", name: "Muted Grayish Blue" },
        { color: "#808080", name: "Gray" },
        { color: "#A6A6A6", name: "Light Gray" },
        { color: "#C0C0C0", name: "Silver" },

        // Blues & Teals
        { color: "#1D3E6F", name: "Dark Blue (Professional)" },
        { color: "#2E75B6", name: "Blue (Corporate Style)" },
        { color: "#2E4756", name: "Steel Blue" },
        { color: "#0F4C5C", name: "Dark Teal Blue" },

        // Blue-Grays
        { color: "#37474F", name: "Blue Gray" },
        { color: "#455A64", name: "Muted Blue Gray" },
        { color: "#5C6B73", name: "Soft Blue Gray" },
        { color: "#6E7D8C", name: "Cool Blue Gray" },
        { color: "#607D8B", name: "Blue Gray" },
        { color: "#90A4AE", name: "Light Blue Gray" },
        { color: "#B0BEC5", name: "Softest Blue Gray" }
    ];

    return (
        <div className='flex gap-4'>
            <Button disabled={loading} onClick={() => nav('/dashboard')} className="bg-blue-500 hover:bg-blue-600 text-white">
                <IoHome />
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button disabled={loading} variant="outline">
                        {loading ? (
                            <span className="loader-btn"></span>
                        ) : (
                            <>
                                <LuPaintbrushVertical className="mr-2" />
                                Theme
                            </>
                        )}
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="p-4 flex flex-wrap gap-2">
                    {loading ? ("color updating...") : (

                        <TooltipProvider>
                            {colors.map((item, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger>
                                        <div
                                            onClick={() => setThemeColor(item.color, item.name)}
                                            className={`${item.color === selectedColor && "scale-125"} w-6 h-6 rounded-full cursor-pointer hover:scale-125 duration-200 transition-all`}
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default ThemeColor;
