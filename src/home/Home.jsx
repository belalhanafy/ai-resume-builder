import Header from '@/components/custom/Header'
import { UserButton, useUser } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function Home() {
  const { user, isSignedIn } = useUser()
  return (
    <div>
      <Header />
      <div>
        <section>
          <div className="px-4 mx-auto max-w-screen-xl text-center pt-10 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue-500 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className='text-primary'>With AI</span> </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly craft a standout resume with our AI-powered builder. Need to make a professional resume? <strong>Resume maker is here!</strong>
            </p>
            <p className="mb-8 text-lg font-normal text-blue-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              <strong>Your career starts here!</strong>
            </p>
          </div>
        </section>
        <section className="bg-white px-4 mx-auto max-w-screen-xl text-center lg:px-12">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500">Create your perfect resume in just 3 easy steps</h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
            >
              <div className="flex justify-center items-center">
                <AtomIcon className='h-8 w-8' />
              </div>
              <h2 className="mt-4 text-xl font-bold text-black">Write Your Resume Details</h2>
              <p className="mt-1 text-sm text-gray-600">
                Enter your personal information, skills, education, and work experience. Our AI will assist in making your resume stand out.
              </p>
            </div>

            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
            >
              <div className="flex justify-center items-center">
                <Edit className='h-8 w-8' />
              </div>
              <h2 className="mt-4 text-xl font-bold text-black">Edit Your Resume</h2>
              <p className="mt-1 text-sm text-gray-600">
                Make adjustments to your resume's layout, content, and style. Tailor it for the job you want with a few clicks.
              </p>
            </div>

            <div
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
            >
              <div className="flex justify-center items-center">
                <Share2 className='h-8 w-8' />
              </div>
              <h2 className="mt-4 text-xl font-bold text-black">Share & Apply</h2>
              <p className="mt-1 text-sm text-gray-600">
                Once you're happy with your resume, share it and start applying to your dream jobs with confidence!
              </p>
            </div>
          </div>
          {!isSignedIn &&
            <div className="mt-12 flex justify-center">
              <Link to="/auth/sign-in">
                <button
                  className="flex items-center gap-3 rounded bg-blue-500 hover:bg-blue-600 px-12 py-3 text-sm font-medium text-white transition duration-100"
                >
                  Get Started Today
                  <FiArrowRightCircle />
                </button>
              </Link>
            </div>
          }
        </section>
      </div>
    </div>
  )
}

export default Home
