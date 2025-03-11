import React from 'react'
import { usethemeStore } from '../store/useThemeStore'
import { THEMES } from '../Const'

const PREVIEW_MESSAGES = [
  {id:1,content:"Hello how was the day !!"},
  {id:2,content:"It was Nice What about you!"},
]

const Settings = () => {
  const {theme,setTheme} = usethemeStore()
  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
    <div className='space-y-6'>
     <div className='flex flex-col gap-1'>
       <h2 className='text-lg font-semibold'>Themes</h2>
       <p className='text-sm text-base-content/70'></p>
     </div>
     <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8'>
      {THEMES.map(item=>(
       <button key={item} className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
         ${theme===item?"bg-base-200":"hover:bg-base-200/50"}`} onClick={()=>setTheme(item)}>
          <div className='relative h-8 w-full rounded-md overflow-x-hidden' data-theme={item}>
            <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
              <div className='rounded bg-primary'></div>
              <div className='rounded bg-secondary'></div>
              <div className='rounded bg-accent'></div>
              <div className='rounded bg-neutral'></div>
            </div>
          </div>
          <span className='text-[11px] font-medium truncate w-full text-center'>{item.charAt(0).toUpperCase()+item.slice(1)}</span>

         </button>       
      ))}
     </div>
    </div>
    </div>
  )
}

export default Settings