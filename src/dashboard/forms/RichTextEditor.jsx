import React, { useContext, useEffect, useState } from 'react'
import { AIChatSession } from '../../../services/AIModal';
import { LuBrain } from 'react-icons/lu';
import { Button } from '@/components/ui/button';


const prompt = `Position Title: {positionTitle}.  
Based on this position title, generate 5-7 concise, impactful bullet points suitable for a professional resume.  
**Strictly format the output as an unordered HTML list** using <ul> for the container and <li> tags for each bullet point.  

**Formatting Rules:**  
- **Output ONLY the HTML code**: start with <ul>, include 5-7 <li> items, and end with </ul>.  
- **NO JSON, arrays, or additional text** outside the <ul> tags.  
- Use **strong action verbs** (e.g., "Developed", "Implemented", "Managed") to start each bullet.  
- Focus on **quantifiable results** and **key achievements** where applicable.  
- **Avoid** personal pronouns (I, my, we) and unnecessary filler words.  

**Final Output Example:**  
<ul>
    <li>Developed and optimized responsive user interfaces using React, enhancing user engagement by 20%.</li>
    <li>Collaborated with cross-functional teams to deliver projects on time and within budget.</li>
    <li>Implemented RESTful APIs for seamless data integration across multiple platforms.</li>
    <li>Improved application performance through code refactoring and efficient state management.</li>
    <li>Led code reviews and mentored junior developers to maintain high coding standards.</li>
    <li>Utilized Agile methodologies to streamline development processes and improve productivity.</li>
    <li>Analyzed user feedback to enhance UI/UX, increasing customer satisfaction rates by 15%.</li>
</ul>

**Ensure the output is in this exact format. Do not add any explanations, JSON structures, or extra text. dont put result in object please!!!!**

i need res like this please : {"bulletPoints": "<ul><li>Spearheaded cross-functional projects, consistently delivering exceptional results.</li><li>Successfully managed complex tasks and met aggressive deadlines.</li><li>Demonstrated strong problem-solving and analytical skills.</li><li>Built and maintained effective working relationships with colleagues and stakeholders.</li><li>Proactively identified and resolved critical issues.</li><li>Contributed significantly to team success and overall organizational goals.</li><li>Adapted quickly to changing priorities and new challenges.</li></ul>"}
`;

import {
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnStrikeThrough,
    Separator,
    BtnBulletList,
    BtnNumberedList,
    Editor,
    EditorProvider,
    Toolbar,
    BtnLink,
    BtnRedo,
    BtnUndo
} from 'react-simple-wysiwyg';
import { ResumeInfoContext } from '../context/ResumeInfoContext';
import { useToast } from "@/hooks/use-toast"

const RichTextEditor = ({ onRichTextEditorChange,existValue, index, getRichTextValue,activeFormIndex }) => {
    const { toast } = useToast()
    const [value, setValue] = useState('');
    const [errorMsg, setErrorMsg] = useState(null); // New error state
    const [aiLoading, setAiLoading] = useState(false)

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);


    const generateSummaryFromAI = async () => {
        try {
            setAiLoading(true);
            if (!resumeInfo?.experience[index]?.title) {
                toast({
                    description: "Please Add Position Title",
                })
                return;
            }
            const PROMPT = prompt.replace('{positionTitle}', resumeInfo?.experience[index]?.title);
            const result = await AIChatSession.sendMessage(PROMPT);
            const parseRes = JSON.parse(result.response.text());
            setValue(
                parseRes.bulletPoints
            )
            getRichTextValue(parseRes.bulletPoints, index)
        } catch (error) {
            console.error("Error generating description:", error);
            setErrorMsg("No AI-generated suggestions available. Try generating again or check your connection.")
        } finally {
            setAiLoading(false);
        }
    }
    return (
        <div>
            <div className='col-span-2 mt-5'>
                <div className='mb-2 flex items-center justify-between'>
                    <label className="block text-gray-700 font-semibold capitalize" htmlFor="summary">add description</label>
                    {activeFormIndex == 3 &&
                        <Button onClick={() => generateSummaryFromAI()} type="button" variant="outline">
                            {aiLoading ? (<span className="loader-btn"></span>) : (<>
                                <LuBrain />
                                Generate from AI
                            </>
                            )}
                        </Button>
                    }
                </div>
            </div>
            <EditorProvider>
                <Editor value={value?value:existValue} onChange={(e) => { setValue(e.target.value); onRichTextEditorChange(e) }} containerProps={{
                    style: {
                        resize: 'vertical',
                        minHeight: '200px', // Increase the minimum height
                        maxHeight: '600px', // Optional: Limit maximum height if needed
                        fontSize: '16px', // Make text larger
                    }
                }}>
                    <Toolbar>
                        <BtnRedo />
                        <BtnUndo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnBulletList />
                        <BtnNumberedList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor