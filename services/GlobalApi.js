import axios from "axios";


const API_KEY=import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL+"/api/",
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${API_KEY}`
    }
})


const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);
const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);
const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id+"?populate=*")
const UpdateResume=(resumeId,data)=>axiosClient.put ('/user-resumes/'+resumeId,data);
const DeleteResume=(resumeId)=>axiosClient.delete('/user-resumes/'+resumeId);
export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResume,
    GetResumeById,
    DeleteResume
}