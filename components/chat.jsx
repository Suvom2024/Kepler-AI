"use client"

import { useEffect } from "react"
import UserChatMessage from "./user-chat-message"
import AIMessage from "./ai-message"

const Chat = ({ answers, historyByIdLoading, chatLoading, question }) => {
  useEffect(() => {
    const chatContainer = document.querySelector(".chat-stream")
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [chatLoading])
  return (
    <>
      {historyByIdLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="chat-stream mt-12 h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#cccfd6] [&::-webkit-scrollbar-thumb]:bg-[#67696b]">
          <div className="px-3">
            {answers.map((answer, index) => (
              <div key={index}>
                <UserChatMessage message={answer[0]} />
                <AIMessage key={index} answer={answer[1]} />
              </div>
            ))}
            {chatLoading && (
              <>
                <UserChatMessage message={question} />
                <AIMessage answer={{ answer: "Loading..." }} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Chat
