import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkleton from './skeletons/MessageSkleton'
import { useAuthStore } from '../store/useAuthStore'
import avatarImg from "../../public/avatar (1).png"
import { formatMessageTime } from '../lib/commonFunctions'

const ChatContainer = () => {
  const { messages, getMessages, getUsers, isMsgLoading, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?._id ?? "")
    }

  }, [selectedUser?._id, getMessages])

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      {isMsgLoading ? <MessageSkleton /> : <div className='overflow-auto h-[69vh]'>
        <div className='flex-1 overflow-y-auto '>
          {messages.map(message => (
            <div key={message._id} className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}>
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img src={message.senderId === authUser?._id ? authUser.profile || avatarImg : selectedUser?.profilePic || avatarImg} alt="profile pic" />
                </div>
              </div>
              <div className='chat-header mb-1 flex flex-col'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
                <div className='chat-bubble flex flex-col'>
                  {message.image && (
                    <img src={message.image} className='sm:max-w-[200px] rounded-md mb-2' alt='attachement' />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      }
      <MessageInput />
    </div>
  )
}

export default ChatContainer