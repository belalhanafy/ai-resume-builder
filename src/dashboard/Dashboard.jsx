import React, { useEffect, useState } from 'react'
import AddResume from './AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../services/GlobalApi';
import ResumeCardItem from './ResumeCardItem';
import Loading from '@/loader/Loading';

const Dashboard = () => {
  const { user } = useUser()
  const [userResume, setUserResume] = useState([])
  const [loading, setLoading] = useState(true) // ✅ Loading state

  const getUserResume = async () => {
    try {
      setLoading(true); // Start loading
      const resp = await GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress);
      setUserResume(resp.data.data);
      
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  useEffect(() => {
    if (user) getUserResume();
  }, [user])

  return (
    <>
      <div className="">
        <h2 className="font-medium text-5xl bg-gradient-to-r from-blue-400 to-cyan-800 inline-block text-transparent bg-clip-text mb-2">My Resume</h2>
        <p className="text-slate-500">
          Start Creating AI Resume to your next job role,<br />
          <span className="">your career starts here</span>
        </p>
      </div>

      {loading ? ( // ✅ Show loading indicator
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className='py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-x-5 gap-y-16'>
          <AddResume />
          {userResume.map((res, index) => (
            <ResumeCardItem refreshData={getUserResume} resume={res} key={index} />
          ))}
        </div>
      )}
    </>
  )
}

export default Dashboard;
