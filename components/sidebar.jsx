"use client"

import { useState, useEffect } from "react"
import UploadModal from "./upload-modal"
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { getHistoryData } from "@/actions/get-history-data"

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
  } = useSidebarState()
  const [isDeleteLoading, setDeleteLoading] = useState(false)
  const [selectedHistoryId, setSelectedHistoryId] = useState("")

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

  const historyFetchById = async (session_id) => {
    let result = []
    setSelectedHistoryId(session_id)
    // setSelectedUserId(user_id)
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

  useEffect(() => {
    let sessionId = generateTabIdWithSuffix("session_id")
    sessionStorage.setItem("sessionId", sessionId)

    let userId = generateTabIdWithSuffix("user_id")
    sessionStorage.setItem("userId", userId)
  }, [])

  return (
    <div>
      <div
        className={`${
          open ? "w-[304px]" : "-translate-x-full"
        } absolute z-20 top-0 left-0 h-screen transition-all duration-300 transform bg-[#2E70DD] rounded-r-[50px]`}
      >
        <div className="flex flex-col h-[100%] pt-7">
          <div className="text-xl font-semibold text-white text-center">
            Chat History
          </div>
          <div className="mx-2 my-8 text-sm text-white overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#2460C2] [&::-webkit-scrollbar-thumb]:bg-[#154086]">
            {Object.keys(historyData).map((date) => (
              <div
                key={date}
                className="mx-2 mb-4 cursor-pointer border-dashed rounded-2xl border-2 border-[#3b85ff] bg-[#2868d1]"
              >
                <div className="mx-2">
                  <p className="ps-2 pt-2 -mb-3 font-bold text-black">{date}</p>
                  {historyData[date].map((session, index) => (
                    <div
                      key={session.id}
                      className={`flex items-center ${
                        index !== historyData[date].length - 1
                          ? "border-b-[1px] border-[#3b85ff]"
                          : ""
                      }`}
                    >
                      <div
                        onClick={() => historyFetchById(session.session_id)}
                        className="px-2 py-3 w-full hover:text-[#ff0202]"
                      >
                        {session.title}
                      </div>
                      <button
                        onClick={() =>
                          deleteHistoryById(session.session_id.toString())
                        }
                        className="pe-2"
                      >
                        {isDeleteLoading &&
                        session.session_id === selectedHistoryId ? (
                          <div
                            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-blue-500"
                            role="status"
                            aria-label="loading"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:scale-125 hover:duration-300"
                          >
                            <path
                              d="M1 3.8H2.33333M2.33333 3.8H13M2.33333 3.8V13.6C2.33333 13.9713 2.47381 14.3274 2.72386 14.5899C2.97391 14.8525 3.31304 15 3.66667 15H10.3333C10.687 15 11.0261 14.8525 11.2761 14.5899C11.5262 14.3274 11.6667 13.9713 11.6667 13.6V3.8M4.33333 3.8V2.4C4.33333 2.0287 4.47381 1.6726 4.72386 1.41005C4.97391 1.1475 5.31304 1 5.66667 1H8.33333C8.68696 1 9.02609 1.1475 9.27614 1.41005C9.52619 1.6726 9.66667 2.0287 9.66667 2.4V3.8M5.66667 7.3V11.5M8.33333 7.3V11.5"
                              stroke="#ffffff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <hr className="bg-[#7faffd]" />
            <div>
              <div className="flex flex-col pt-8 ps-8 gap-2 text-sm text-white">
                <div className="flex items-center">
                  <span className="pe-2">
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.10071 15.4033L5.56814 14.5806L6.01257 14.7966C7.04107 15.2953 8.2165 15.561 9.5 15.561C13.7451 15.561 16.7857 12.5299 16.7857 8.88721C16.7857 5.23119 13.767 2.21342 9.5 2.21342C5.233 2.21342 2.21429 5.23119 2.21429 8.88721C2.22146 10.2863 2.68247 11.6454 3.52814 12.7604L3.93857 13.3065L3.10071 15.402V15.4033ZM2.24221 16.9686C2.13233 17.0054 2.0142 17.01 1.90179 16.9818C1.78937 16.9537 1.68737 16.894 1.60782 16.8098C1.52827 16.7255 1.4745 16.6203 1.45286 16.5066C1.43123 16.3928 1.44263 16.2752 1.48571 16.1677L2.55793 13.4897C1.55393 12.1644 1.00726 10.5494 1 8.88721C1 4.86595 4.25671 1 9.5 1C14.7433 1 18 4.86595 18 8.88721C18 12.9085 14.7093 16.7744 9.5 16.7744C7.98821 16.7744 6.63793 16.4492 5.48314 15.8886L2.241 16.9686H2.24221Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </span>
                  Chat
                </div>
                <button
                  type="button"
                  className="flex items-center cursor-pointer disabled:pointer-events-none"
                  data-hs-overlay="#hs-vertically-centered-modal"
                >
                  <span className="pe-2">
                    <svg
                      width="19"
                      height="16"
                      viewBox="0 0 19 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.0652 6.00373V15.0037M9.0652 6.00373L12.0652 9.00373M9.0652 6.00373L6.0652 9.00373M14.5652 11.0037C16.0842 11.0037 17.0652 9.77273 17.0652 8.25373C17.0651 7.65234 16.868 7.06756 16.5039 6.58893C16.1397 6.11031 15.6288 5.76424 15.0492 5.60373C14.96 4.48218 14.4952 3.42349 13.7299 2.59882C12.9646 1.77414 11.9435 1.23169 10.8317 1.05915C9.71993 0.886616 8.58246 1.09408 7.60319 1.64802C6.62392 2.20195 5.8601 3.06996 5.4352 4.11173C4.54063 3.86375 3.58418 3.9813 2.77628 4.43851C1.96837 4.89572 1.37518 5.65515 1.1272 6.54973C0.879224 7.4443 0.996772 8.40074 1.45399 9.20865C1.9112 10.0166 2.67063 10.6097 3.5652 10.8577"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Upload
                </button>
                <div className="flex items-center">
                  <span className="pe-2">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 11.8182C10.7803 11.8182 11.8182 10.7803 11.8182 9.5C11.8182 8.2197 10.7803 7.18182 9.5 7.18182C8.2197 7.18182 7.18182 8.2197 7.18182 9.5C7.18182 10.7803 8.2197 11.8182 9.5 11.8182Z"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.2182 11.8182C15.1153 12.0512 15.0846 12.3098 15.1301 12.5605C15.1755 12.8111 15.295 13.0424 15.4732 13.2245L15.5195 13.2709C15.6632 13.4144 15.7772 13.5849 15.855 13.7725C15.9328 13.9601 15.9728 14.1612 15.9728 14.3643C15.9728 14.5674 15.9328 14.7685 15.855 14.9561C15.7772 15.1437 15.6632 15.3142 15.5195 15.4577C15.376 15.6014 15.2056 15.7154 15.018 15.7932C14.8303 15.871 14.6292 15.911 14.4261 15.911C14.223 15.911 14.0219 15.871 13.8343 15.7932C13.6467 15.7154 13.4763 15.6014 13.3327 15.4577L13.2864 15.4114C13.1042 15.2332 12.8729 15.1137 12.6223 15.0683C12.3716 15.0228 12.1131 15.0535 11.88 15.1564C11.6515 15.2543 11.4565 15.417 11.3192 15.6243C11.1819 15.8316 11.1083 16.0745 11.1073 16.3232V16.4545C11.1073 16.8644 10.9444 17.2575 10.6546 17.5473C10.3648 17.8372 9.9717 18 9.56182 18C9.15194 18 8.75885 17.8372 8.46902 17.5473C8.17919 17.2575 8.01636 16.8644 8.01636 16.4545V16.385C8.01038 16.1292 7.92759 15.8812 7.77876 15.6731C7.62992 15.465 7.42193 15.3065 7.18182 15.2182C6.94875 15.1153 6.69021 15.0846 6.43955 15.1301C6.18888 15.1755 5.95757 15.295 5.77545 15.4732L5.72909 15.5195C5.58556 15.6632 5.41511 15.7772 5.2275 15.855C5.03988 15.9328 4.83878 15.9728 4.63568 15.9728C4.43259 15.9728 4.23148 15.9328 4.04386 15.855C3.85625 15.7772 3.6858 15.6632 3.54227 15.5195C3.39858 15.376 3.28459 15.2056 3.20682 15.018C3.12904 14.8303 3.08901 14.6292 3.08901 14.4261C3.08901 14.223 3.12904 14.0219 3.20682 13.8343C3.28459 13.6467 3.39858 13.4763 3.54227 13.3327L3.58864 13.2864C3.76678 13.1042 3.88628 12.8729 3.93173 12.6223C3.97718 12.3716 3.9465 12.1131 3.84364 11.88C3.74568 11.6515 3.58304 11.4565 3.37572 11.3192C3.16841 11.1819 2.92547 11.1083 2.67682 11.1073H2.54545C2.13557 11.1073 1.74248 10.9444 1.45265 10.6546C1.16282 10.3648 1 9.9717 1 9.56182C1 9.15194 1.16282 8.75885 1.45265 8.46902C1.74248 8.17919 2.13557 8.01636 2.54545 8.01636H2.615C2.87077 8.01038 3.11882 7.92759 3.32691 7.77876C3.535 7.62992 3.69351 7.42193 3.78182 7.18182C3.88468 6.94875 3.91536 6.69021 3.86991 6.43955C3.82446 6.18888 3.70496 5.95757 3.52682 5.77545L3.48045 5.72909C3.33676 5.58556 3.22277 5.41511 3.145 5.2275C3.06722 5.03988 3.02719 4.83878 3.02719 4.63568C3.02719 4.43259 3.06722 4.23148 3.145 4.04386C3.22277 3.85625 3.33676 3.6858 3.48045 3.54227C3.62399 3.39858 3.79443 3.28459 3.98205 3.20682C4.16966 3.12904 4.37077 3.08901 4.57386 3.08901C4.77696 3.08901 4.97807 3.12904 5.16568 3.20682C5.3533 3.28459 5.52374 3.39858 5.66727 3.54227L5.71364 3.58864C5.89575 3.76678 6.12706 3.88628 6.37773 3.93173C6.6284 3.97718 6.88693 3.9465 7.12 3.84364H7.18182C7.41037 3.74568 7.60529 3.58304 7.74258 3.37572C7.87988 3.16841 7.95355 2.92547 7.95455 2.67682V2.54545C7.95455 2.13557 8.11737 1.74248 8.4072 1.45265C8.69703 1.16282 9.09012 1 9.5 1C9.90988 1 10.303 1.16282 10.5928 1.45265C10.8826 1.74248 11.0455 2.13557 11.0455 2.54545V2.615C11.0464 2.86365 11.1201 3.10659 11.2574 3.31391C11.3947 3.52122 11.5896 3.68386 11.8182 3.78182C12.0512 3.88468 12.3098 3.91536 12.5605 3.86991C12.8111 3.82446 13.0424 3.70496 13.2245 3.52682L13.2709 3.48045C13.4144 3.33676 13.5849 3.22277 13.7725 3.145C13.9601 3.06722 14.1612 3.02719 14.3643 3.02719C14.5674 3.02719 14.7685 3.06722 14.9561 3.145C15.1437 3.22277 15.3142 3.33676 15.4577 3.48045C15.6014 3.62399 15.7154 3.79443 15.7932 3.98205C15.871 4.16966 15.911 4.37077 15.911 4.57386C15.911 4.77696 15.871 4.97807 15.7932 5.16568C15.7154 5.3533 15.6014 5.52374 15.4577 5.66727L15.4114 5.71364C15.2332 5.89575 15.1137 6.12706 15.0683 6.37773C15.0228 6.6284 15.0535 6.88693 15.1564 7.12V7.18182C15.2543 7.41037 15.417 7.60529 15.6243 7.74258C15.8316 7.87988 16.0745 7.95355 16.3232 7.95455H16.4545C16.8644 7.95455 17.2575 8.11737 17.5473 8.4072C17.8372 8.69703 18 9.09012 18 9.5C18 9.90988 17.8372 10.303 17.5473 10.5928C17.2575 10.8826 16.8644 11.0455 16.4545 11.0455H16.385C16.1363 11.0464 15.8934 11.1201 15.6861 11.2574C15.4788 11.3947 15.3161 11.5896 15.2182 11.8182Z"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Settings
                </div>
              </div>
              <div className="pt-10 pb-8 ps-4 text-white">
                <p>@ EBIW | All right reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute h-screen top-0 flex items-center transition-all duration-300 transform ${
          open ? "left-[265px]" : "-left-[45px]"
        }`}
      >
        <button
          onClick={() => setOpen()}
          className="h-16 w-24 bg-[#2174FF] rounded-r-3xl flex items-center justify-end pe-6"
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
                fill="white"
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
                fill="white"
              />
            </svg>
          )}
        </button>
      </div>
      <UploadModal />
    </div>
  )
}

export default Sidebar

// className={`${
//   index !== items.length - 1 ? 'border-b border-gray-200' : ''
// } p-4`}
