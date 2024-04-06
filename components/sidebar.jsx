"use client"

import { useState, useEffect } from "react"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { getHistoryData } from "@/actions/get-history-data"
import { FaRegCommentDots } from "react-icons/fa"
import { IoEllipsisVerticalSharp } from "react-icons/io5"

const Sidebar = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const {
    open,
    setOpen,
    setAnswers,
    setQuestion,
    setHistoryByIdLoading,
    historyData,
    setHistoryData,
    selectedHistoryId,
    setSelectedHistoryId,
    selectedUserId,
    setSelectedUserId,
  } = useSidebarState()
  const [isDeleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteOption, setShowDeleteOption] = useState(false)

  function generateTabIdWithSuffix(suffix) {
    return (
      suffix + Date.now().toString(36) + Math.random().toString(36).substr(2)
    )
  }

  const fetchHistoryData = async () => {
    try {
      const orderedData = await getHistoryData()
      setHistoryData(orderedData)
    } catch (error) {
      alert(error)
    }
  }

  const deleteHistoryById = async (session_id) => {
    try {
      setDeleteLoading(true)
      setSelectedHistoryId(session_id)
      const response = await fetch(`${url}/delete_session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      })
      if (!response.ok) {
        throw new Error("Failed to delete Session")
      }
      fetchHistoryData()
    } catch (error) {
      alert(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const historyFetchById = async (session_id, user_id) => {
    let result = []
    setSelectedHistoryId(session_id)
    setSelectedUserId(user_id)
    setQuestion("open")
    try {
      setHistoryByIdLoading(true)
      const response = await fetch(`${url}/chat/${session_id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      result = await response.json()
    } catch (error) {
      alert(error)
    } finally {
      setHistoryByIdLoading(false)
    }
    setAnswers(result)
  }

  useEffect(() => {
    fetchHistoryData()
    // eslint-disable-next-line
  }, [])

  const truncateTitle = (title, maxLength = 20) => {
    if (title.length <= maxLength) {
      return title
    }
    return `${title.substring(0, maxLength)}...`
  }

  useEffect(() => {
    let sessionId = generateTabIdWithSuffix("session_id")
    sessionStorage.setItem("sessionId", sessionId)

    let userId = generateTabIdWithSuffix("user_id")
    sessionStorage.setItem("userId", userId)
  }, [])

  // Icon components for Message and Dots

  return (
    <div>
      <div
      className={`transform top-0 left-0 w-72 ${open ? "translate-x-0" : "-translate-x-full"}
        fixed z-20 h-screen transition-transform duration-300 ease-in-out bg-[#1F1F38] rounded-r-[50px]
        border-r-2 border-[#F7E8D3] overflow-y-auto`}
    >
        <div className="flex flex-col h-full pt-7">
          <div className="text-xl font-semibold text-white text-center mb-4">
            Chat History
          </div>
          <div className="flex-1 mx-2 text-sm text-white overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2460C2] [&::-webkit-scrollbar-thumb]:bg-[#154086]">
            {Object.keys(historyData).map((date) => (
              <div key={date} className="mb-4 flex flex-col">
                <p className="text-gray-400 mb-2">{date}</p>
                {historyData[date].map((session, index) => (
                  <div
                    key={session.id}
                    className="flex items-center p-2 rounded-md hover:bg-[#3B3B7E] cursor-pointer relative"
                    onClick={() =>
                      historyFetchById(session.session_id, session.user_id)
                    }
                  >
                    <FaRegCommentDots className="w-6 h-6 mr-2" />
                    <div className="flex-1 relative">
                      <span
                        className="hover:text-[#F7E8D3]"
                        title={session.title}
                      >
                        {truncateTitle(session.title)}
                      </span>
                    </div>
                    <IoEllipsisVerticalSharp
                      className="w-6 h-6 text-white hover:bg-[#4B4B9D] rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteOption(
                          showDeleteOption === session.session_id
                            ? null
                            : session.session_id
                        )
                      }}
                    />
                    {showDeleteOption === session.session_id && (
                      <div className="absolute right-0 mt-8 p-2 bg-white rounded shadow-lg">
                        <div className="flex flex-col">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteHistoryById(session.session_id.toString())
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <hr className="bg-[#7faffd]" />
            <div>
              <div className="flex flex-col pt-8 ps-8 gap-2 text-sm text-white">
              </div>
              <div className="pt-4 pb-8 ps-3 text-white flex items-center">
                <p className="mr-1">Partnered with</p>
                <img src="./icons/reader.png" alt="Reader AI Logo" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute h-screen top-0 flex items-center transition-all  duration-300 transform ${
          open ? "left-[265px]" : "-left-[45px]"
        }`}
      >
        <button
          onClick={() => setOpen()}
          className="h-16 w-24 bg-transparent rounded-r-3xl flex items-center justify-end pe-9 "
        >
          {open ? (
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9732 18.9989L14.9732 0.998876C14.9727 0.816634 14.9224 0.638 14.8279 0.4822C14.7333 0.3264 14.5981 0.199334 14.4367 0.114681C14.2753 0.0300268 14.0939 -0.00900902 13.912 0.00177323C13.73 0.0125555 13.5545 0.0727495 13.4042 0.175876L0.404249 9.17588C-0.13475 9.54888 -0.13475 10.4469 0.40425 10.8209L13.4042 19.8209C13.5542 19.9251 13.7298 19.9861 13.912 19.9975C14.0943 20.0089 14.2761 19.9701 14.4379 19.8854C14.5996 19.8006 14.735 19.6732 14.8294 19.5169C14.9238 19.3606 14.9735 19.1815 14.9732 18.9989Z"
                fill="#1F1F38"
                stroke="#F7E8D3"
                strokeWidth="1"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-0.00010486 18.9989L-0.000104074 0.998876C0.000467185 0.816634 0.0507306 0.638 0.145274 0.4822C0.239818 0.3264 0.375061 0.199334 0.536448 0.114681C0.697836 0.0300268 0.879256 -0.00900902 1.06118 0.00177323C1.2431 0.0125555 1.41864 0.0727495 1.5689 0.175876L14.5689 9.17588C15.1079 9.54888 15.1079 10.4469 14.5689 10.8209L1.5689 19.8209C1.41895 19.9251 1.24333 19.9861 1.0611 19.9975C0.878874 20.0089 0.697017 19.9701 0.535288 19.8854C0.373559 19.8006 0.238141 19.6732 0.143751 19.5169C0.0493613 19.3606 -0.000392878 19.1815 -0.00010486 18.9989Z"
                fill="#1F1F38"
                stroke="#F7E8D3"
                strokeWidth="1"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export default Sidebar