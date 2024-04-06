"use client"

import { useState } from "react"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const UserChatMessage = ({ message }) => {
  const notify = () =>
    toast.success("Question saved successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    })

  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [loading, setLoading] = useState(false)
  const { setFaqData } = useSidebarState()

  const fetchFaqData = async () => {
    try {
      const response = await fetch(`${url}/get_human_messages`)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const result = await response.json()
      setFaqData(result)
    } catch (error) {
      alert(`${error}`)
    }
  }

  const saveQuestionHandler = async (message) => {
    setLoading(true)
    const sessionId = sessionStorage.getItem("sessionId") || ""
    const userId = sessionStorage.getItem("userId") || ""
    try {
      const request = {
        history: [{ user: message }],
        session_id: sessionId,
        user_id: userId,
      }
      await fetch(`${url}/upsert_question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })
      fetchFaqData()
      notify()
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mb-10">
      <div className="flex items-center px-4">
      <div className="bg-white rounded-full p-1">

      <img src="https://img.icons8.com/color/48/user.png" alt="User Icon" width="30" height="30" />
      </div>

        <p className="font-bold text-lg ps-3">You</p>
        {/* <button
          onClick={() => saveQuestionHandler(message)}
          className="ms-auto border-2 rounded-lg border-[#2174FF] text-[#1F1F38] w-14 text-sm p-1"
        >
          {loading ? (
            <div
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <p>SAVE</p>
          )}
        </button> */}
      </div>
      <p className="ms-14">{message}</p>
    </div>
  )
}

export default UserChatMessage
