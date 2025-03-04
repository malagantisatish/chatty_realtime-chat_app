import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const {logout,authUser} = useAuthStore()
  return (
    <div>
      <div>hello</div>
    </div>
  )
}

export default Navbar