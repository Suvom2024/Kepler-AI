"use client"

import { useState, useEffect, useRef } from "react";
import UserChatMessage from "./user-chat-message"
import AIMessage from "./ai-message"

const Chat = ({ answers, historyByIdLoading, chatLoading, question }) => {
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const answerRef = useRef(null);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-stream");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatLoading]);

  useEffect(() => {
    const streamAnswer = async () => {
      if (answerRef.current) {
        const chunks = answerRef.current.answer.answer.split(/\b/);
        setStreamedAnswer("");
        for (const chunk of chunks) {
          setStreamedAnswer((prevAnswer) => prevAnswer + chunk);
          await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay as needed
        }
      }
    };

    if (answerRef.current) {
      streamAnswer();
    }
  }, [answerRef.current]);

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
                <AIMessage answer={answer[1]} images={answer[1].images} />
              </div>
            ))}
            {chatLoading && (
              <>
                <UserChatMessage message={question} />
                <AIMessage
                  answer={{ answer: streamedAnswer || "Loading..." }}
                  ref={answerRef}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat
