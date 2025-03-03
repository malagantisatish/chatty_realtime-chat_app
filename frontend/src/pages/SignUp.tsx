import React, { useState } from 'react'
import { FormTy } from '../Const'
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import AuthImagePatterns from '../components/AuthImagePatterns'

const SignUp = () => {
  const [formData,setFormData] = useState<FormTy>({fullName:"",email:"",password:""})
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const {isSigningUp} = useAuthStore()

  const validateForm = ()=>{

  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

  }



  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/**leftside */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
         <div className='w-full max-w-md space-y-8'>
          {/**LOGO */}
          <div className='text-centermb-8'>
          <div className='flex flex-col items-center gap-2 grounp'>
            <div className='size -12 rounded-xl bg-primary/10 flex items-center justify-center groud-hover:bg-primary/20 transistion-color'>
               <MessageSquare className='size-6 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
            <p className='text-base-content/60'>Get started with your free account</p>
          </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              </div>

              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 z-10" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp?(
                <Loader className='size-5 animate-spin'/>
              ):"Create Account"}
            </button>
          </form>
          <div className='text-center'>
            <p className='etxt-base-content/60'>
            Already have an accoount?{" "}
            <Link to="/login" className="link link-primary">Sign in</Link>
            </p>
          </div>
         </div>
      </div>
      {/**right side */}
      <AuthImagePatterns title='Join Our Community' 
      subtitle='Connect with friends, share moments, and stay in touch with your loved ones'/>

    </div>
  )
}

export default SignUp