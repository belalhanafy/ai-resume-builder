import { useUser } from '@clerk/clerk-react'
import './App.css'

function App() {
  const {
    user,
    isLoaded,
    isSignedIn,
  } = useUser();
  console.log(useUser());
  
  return (
    <>
      
    </>
  )
}

export default App
