import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { LogOut, MessagesSquare, Settings, User } from 'lucide-react'

const Navbar = () => {
  const {logout,authUser} = useAuthStore()
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
             <div className='flex items-center gap-8'>
                 <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                 <div className='size-9 rounded-e-lg bg-primary-10 flex items-center'>
                   <MessagesSquare className='w-5 h-5 text-primary'/>
                 </div>
                   <h1 className='text-lg font-bold'>Chatty</h1>
                 </Link>
             </div>
             <div className='flex items-center gap-2'>
              <Link to="/setting" className='btn btn-sm gap-2 transition-colors'>
                <Settings className='w-4 h-4'/>
                    <span className='hidden sm:inline'>Settings</span>
                </Link>
                <Link to="/profile" className='btn btn-sm gap-2 transition-colors'>
                <User className='w-4 h-4'/>
                    <span className='hidden sm:inline'>Profile</span>
                </Link>
                <button className='flex items-center gap-2 transition-colors'>
                <LogOut className='size-5' onClick={logout}/>
                    <span className='hidden sm:inline'>Log out</span>
                </button>
                
             </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar