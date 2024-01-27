"use client"

import Initial from "./initial-chat"
import Chat from "./chat"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { useState } from "react"
import { getHistoryData } from "@/actions/get-history-data"

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

    try {
      setChatLoading(true)
      const history = answers.map((a) => ({ user: a[0], bot: a[1].answer }))
      const request = {
        history: [...history, { user: question, bot: undefined }],
        approach: "rrr",
        session_id: selectedHistoryId,
        user_id: selectedUserId,
      }
      const result = await fetch(`${url}/chat`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request),
      })
      const parsedResponse = await result.json()
      setAnswers([...answers, [question, parsedResponse]])
      fetchHistoryData()
    } catch (e) {
      alert(e)
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <>
      <div className={`flex justify-center mx-10`}>
        <div
          className={`flex flex-col max-w-[1400px] w-full h-[90vh] ${
            open ? "ms-80" : "md:ms-40"
          } `}
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
          <div className="mt-auto flex items-center h-20 bg-[#021e4e] rounded-lg mx-4">
            <div className="flex w-full mx-8">
              <svg
                width="23"
                height="32"
                viewBox="0 0 23 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 22.6909C13.298 22.6886 15.0217 21.9829 16.2931 20.7286C17.5644 19.4743 18.2797 17.7738 18.2821 16V6.69091C18.2821 4.91637 17.5675 3.21451 16.2956 1.95972C15.0238 0.704933 13.2987 0 11.5 0C9.70129 0 7.97625 0.704933 6.70437 1.95972C5.43248 3.21451 4.71795 4.91637 4.71795 6.69091V16C4.72029 17.7738 5.43558 19.4743 6.70695 20.7286C7.97833 21.9829 9.70201 22.6886 11.5 22.6909ZM6.48718 6.69091C6.48718 5.37929 7.01531 4.1214 7.9554 3.19394C8.89549 2.26649 10.1705 1.74545 11.5 1.74545C12.8295 1.74545 14.1045 2.26649 15.0446 3.19394C15.9847 4.1214 16.5128 5.37929 16.5128 6.69091V16C16.5128 17.3116 15.9847 18.5695 15.0446 19.497C14.1045 20.4244 12.8295 20.9455 11.5 20.9455C10.1705 20.9455 8.89549 20.4244 7.9554 19.497C7.01531 18.5695 6.48718 17.3116 6.48718 16V6.69091ZM12.3846 27.3091V31.1273C12.3846 31.3587 12.2914 31.5807 12.1255 31.7444C11.9596 31.9081 11.7346 32 11.5 32C11.2654 32 11.0404 31.9081 10.8745 31.7444C10.7086 31.5807 10.6154 31.3587 10.6154 31.1273V27.3091C7.72872 27.0863 5.03313 25.7987 3.06578 23.7028C1.09843 21.6068 0.00378844 18.8566 0 16C0 15.7685 0.0932002 15.5466 0.259098 15.3829C0.424995 15.2192 0.650001 15.1273 0.884615 15.1273C1.11923 15.1273 1.34424 15.2192 1.51013 15.3829C1.67603 15.5466 1.76923 15.7685 1.76923 16C1.76923 18.5461 2.79443 20.9879 4.61931 22.7882C6.44418 24.5886 8.91924 25.6 11.5 25.6C14.0808 25.6 16.5558 24.5886 18.3807 22.7882C20.2056 20.9879 21.2308 18.5461 21.2308 16C21.2308 15.7685 21.324 15.5466 21.4899 15.3829C21.6558 15.2192 21.8808 15.1273 22.1154 15.1273C22.35 15.1273 22.575 15.2192 22.7409 15.3829C22.9068 15.5466 23 15.7685 23 16C22.9962 18.8566 21.9016 21.6068 19.9342 23.7028C17.9669 25.7987 15.2713 27.0863 12.3846 27.3091Z"
                  fill="#FF0202"
                />
              </svg>
              <input
                type="text"
                className="ps-8 w-full text-white text-start bg-transparent outline-none"
                placeholder="Type anything"
                value={inputValue}
                onChange={(e) => {
                  setQuestion(e.target.value)
                  setInputValue(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputValue !== "") {
                    e.preventDefault()
                    askQuestion(inputValue) // Make sure this function uses the current input value
                  }
                }}
              />
              <button className="ms-auto" onClick={() => askQuestion(question)}>
                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hover:scale-125 hover:duration-300"
                >
                  <path
                    d="M23.6099 0.253589C23.451 0.120455 23.2579 0.0356334 23.0531 0.00900947C22.8483 -0.0176144 22.6403 0.0150555 22.4531 0.103212L0 10.7406V12.799L9.43079 16.6065L15.48 26H17.5197L23.9645 1.37522C24.0168 1.17356 24.0112 0.961059 23.9484 0.76248C23.8856 0.5639 23.7682 0.387417 23.6099 0.253589ZM16.2604 24.0368L11.0608 15.9625L19.062 7.11711L17.7961 5.95043L9.73219 14.8647L1.95648 11.7254L21.9628 2.24688L16.2604 24.0368Z"
                    fill="#FF0202"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
