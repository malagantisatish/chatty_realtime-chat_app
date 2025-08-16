import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
  const {selectedUser,setSelectedUser} = useChatStore()
  const {onlineUsers} = useAuthStore()
  return (
    <div className='flex justify-between items-center p-1 px-2'>
      <div className='flex items-center gap-1'>
         <div className='relative mx-auto lg:mx-0'>
          <img className='size-12 object-cover rounded-full' src={selectedUser?.profilePic || "../../public/avatar (1).png"} alt="profile" />
         </div>
         <div>
           <h1>{selectedUser?.fullName}</h1>
           <div className="text-sm text-zinc-400">
                {onlineUsers.includes(selectedUser?._id??"") ? "Online" : "Offline"}
              </div>
         </div>
      </div>
      <button onClick={()=>setSelectedUser(null)}>        
          <X/>
      </button>
    </div>
  )
}

export default ChatHeader