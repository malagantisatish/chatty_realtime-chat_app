import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import { toast } from 'react-toastify'

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { sendMessages } = useChatStore()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    else if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string")
          setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async (e: any) => {
    e.preventDefault()
    if (!message.trim() && !imagePreview) return
    try {
      await sendMessages({ text: message, image: imagePreview })
      setMessage("")
      setImagePreview(undefined)
    } catch (error: any) {
      toast.error("Failed to send messsage", error.message)
    }

  }


  return (
    <div className='w-full p-1'>
      {imagePreview &&
        <div>
          <div className='relative'>
            <img src={imagePreview} className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
            <button onClick={removeImage} className='absolute -top-1.5 left-[67px] bg-base-300 h-5 w-5 rounded-full flex justify-center items-center' type="button">
              <X className='size-3' />
            </button>
          </div>
        </div>
      }
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex items-center gap-2'>
          <input id="message" name="message" type="text" className='w-full input input-bordered rounded-lg input-sm:input-md outline-none' placeholder='Type a message..' value={message} onChange={handleChange} />
          <input id="image" name="image" type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImage} />
          <button type="button" className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}>
            <Image size={20} />
          </button>
          <button type="submit" className='btn btn-sm btn-circle' disabled={!message.trim() && !imagePreview}><Send size={22} /></button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput