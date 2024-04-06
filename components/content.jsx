"use client"

import Initial from "./initial-chat"
import Chat from "./chat"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { useState } from "react"
import { getHistoryData } from "@/actions/get-history-data"
import { useEffect } from "react";
import { useCheckbox } from "@/hooks/CheckboxProvider"; // Import the useCheckbox hook
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import ImageIcon from '@mui/icons-material/Image';

const Content = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [inputValue, setInputValue] = useState("")
  const {
    open,
    answers,
    setAnswers,
    question,
    setQuestion,
    historyByIdLoading,
    setChatLoading,
    chatLoading,
    setHistoryData,
    selectedUserId,
    selectedHistoryId,
  } = useSidebarState()
  const { isChecked, isAnalyst } = useCheckbox(); // Destructure isAnalyst from useCheckbox

  const fetchHistoryData = async () => {
    try {
      const orderedData = await getHistoryData()
      setHistoryData(orderedData)
    } catch (error) {
      alert(error)
    }
  }

  const askQuestion = async (question) => {
    setInputValue("")
    const sessionId = sessionStorage.getItem("sessionId") || ""
    const userId = sessionStorage.getItem("userId") || ""

    const headers = {
      "Content-Type": "application/json",
    }

    // Only set the 'Tab-ID' header if tabId is not an empty string
    if (sessionId) {
      headers["Session-ID"] = sessionId
    }
    if (userId) {
      headers["User-ID"] = userId
    }

    let endpoint = "/chat"; // Default endpoint
    if (isChecked) {
      endpoint = "/sql";
    } else if (isAnalyst) { // Add condition for isAnalyst
      endpoint = "/data_analysis";
    }
    console.log(isChecked, isAnalyst); // Log the states for debugging

    try {
      setChatLoading(true);
      const history = answers.map((a) => ({ user: a[0], bot: a[1].answer }));
      const request = {
        history: [...history, { user: question, bot: undefined }],
        approach: "rrr",
        session_id: selectedHistoryId,
        user_id: selectedUserId,
      };
      const result = await fetch(`${url}${endpoint}`, { // Use the decided endpoint here
        method: "POST",
        headers: headers,
        body: JSON.stringify(request),
      });
      const parsedResponse = await result.json();
      console.log(parsedResponse)
      setAnswers([...answers, [question, parsedResponse]]);
      fetchHistoryData();
    } catch (e) {
      alert(e);
    } finally {
      setChatLoading(false);
    }
  ;

  }


  return (
    <>
      <div className="flex justify-center mx-10 ">
        <div
          className={`flex flex-col max-w-[1400px] w-full h-[90vh] ${
            open ? "ml-80" : "md:ml-20"
          } transition-all duration-300 ease-in-out`}
        >
          {question || answers.length !== 0 ? (
            <Chat
              answers={answers}
              question={question}
              chatLoading={chatLoading}
              historyByIdLoading={historyByIdLoading}
            />
          ) : (
            <Initial />
          )}
          <div className="mt-auto flex items-center justify-between h-20 bg-[#3B3B7E] rounded-lg p-2">
            <div className="flex-grow flex items-center mx-4">
              <input
                type="text"
                className="flex-grow py-2 px-4 rounded-md bg-transparent text-[#F7E8D3] placeholder-[#F7E8D3] outline-none"
                placeholder="Enter Your Prompt Here !!"
                value={inputValue}
                onChange={(e) => {
                  setQuestion(e.target.value)
                  setInputValue(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue !== "") {
                    e.preventDefault()
                    askQuestion(inputValue)
                  }
                }}
              />
              <MicIcon sx={{ color: '#F7E8D3', ml: 2 }} />
              <ImageIcon sx={{ color: '#F7E8D3', ml: 2, mr: 4 }} />
              <button onClick={() => askQuestion(inputValue)}>
                <SendIcon sx={{ color: '#F7E8D3' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
