import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import "./index.css"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usethemeStore } from "./store/useThemeStore"
import StepperAccordion from "./components/GlobalComp/StepperAccordian"




const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = usethemeStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return (
    // <div data-theme={theme}>
    //   <StepperAccordion/>
    // </div>
    <div data-theme={theme} className=''>
      <Navbar />
      <Routes>
        <Route path="/" element={!authUser ? <Login /> : <HomePage />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <HomePage />} />
        <Route path="/settings" element={!authUser ? <Login /> : <Settings />} />
        <Route path="/profile" element={!authUser ? <Login /> : <Profile />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App