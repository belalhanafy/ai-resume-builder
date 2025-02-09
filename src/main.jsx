import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/SignInPage'
import Home from './home/Home'
import Dashboard from './dashboard/Dashboard'
import Layout from './layout/Layout'
import { ClerkProvider } from '@clerk/clerk-react'
import ResumeDetails from './dashboard/ResumeDetails'
import { Toaster } from "@/components/ui/toaster"
import MyResume from './MyResume'
import Error from './error/Error'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  console.error('Missing Publishable Key')
}

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {path: 'dashboard/resume/:resumeId/edit',element:<ResumeDetails/>},
      { path: '*', element: <Error /> }  // مسار للأخطاء

    ],
  },
  { index: true, element: <Home /> },
  { path: 'auth/sign-in', element: <SignInPage /> },
  {path:'myResume/:resumeId/view',element:<MyResume/>},
  { path: '*', element: <Error /> }  // مسار للأخطاء

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={routers} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
