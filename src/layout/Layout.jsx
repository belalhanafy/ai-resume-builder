import Header from '@/components/custom/Header';
import Loading from '@/loader/Loading';
import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function Layout() {
  const {
    user,
    isLoaded,
    isSignedIn,
  } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Loading />
      </div>
    );
  }
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }


  return (
    <>
      <Header/>

      <div className='container mx-auto py-10 px-5'>
        <Outlet />
      </div>
      
    </>
  )
}
