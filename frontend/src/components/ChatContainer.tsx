import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatContainer = () => {
  const {messages,getMessages,getUsers,isMsgLoading,selectedUser} = useChatStore()
  
  useEffect(()=>{
    if (selectedUser){
      getMessages(selectedUser?._id)
    }

  },[selectedUser?._id,getMessages])
  
  if (isMsgLoading){
    return <div>Loading..........</div>
  }
  return (
    <div className='flex-1 flex'>

    </div>
  )
}

export default ChatContainer