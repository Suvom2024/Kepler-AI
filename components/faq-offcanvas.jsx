"use client"

import { useEffect } from "react"
const url = process.env.NEXT_PUBLIC_BASE_URL
import { useSidebarState } from "@/hooks/use-sidebar-state"
import { getHistoryData } from "@/actions/get-history-data"

const FaqOffCanvas = () => {
  const {
    setFaqData,
    faqData,
    setChatLoading,
    answers,
    setAnswers,
    setQuestion,
    setHistoryData,
  } = useSidebarState()

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

  const fetchHistoryData = async () => {
    try {
      const orderedData = await getHistoryData()
      setHistoryData(orderedData)
    } catch (error) {
      alert(error)
    }
  }

  const askQuestion = async (question) => {
    setQuestion(question)
    const sessionId = sessionStorage.getItem("sessionId") || ""
    const userId = sessionStorage.getItem("userId") || ""
    try {
      setChatLoading(true)
      const history = answers.map((a) => ({ user: a[0], bot: a[1].answer }))
      const request = {
        history: [...history, { user: question, bot: undefined }],
        approach: "rrr",
        session_id: sessionId,
        user_id: userId,
      }
      const result = await fetch(`${url}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  useEffect(() => {
    fetchFaqData()
    // eslint-disable-next-line
  }, [])

  return (
    <div
      id="hs-overlay-right"
      className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-lg w-full z-[80] bg-white dark:bg-gray-800 dark:border-gray-700"
      tabIndex="-1"
    >
      <div className="flex justify-end items-center py-3 px-4 dark:border-gray-700">
        <button
          type="button"
          className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-overlay-right"
        >
          <span className="sr-only">Close modal</span>
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6 9.4L9.4 16.6M9.4 9.4L16.6 16.6M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
              stroke="#02132F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="px-8">
        <div className="flex items-center py-6">
          <svg
            width="45"
            height="36"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.39583 0H2.59603C1.87988 0 1.26628 0.252279 0.756836 0.756836C0.245768 1.26139 0 1.875 0 2.59603V7.15332C0 7.87598 0.252279 8.48958 0.756836 8.99251C1.26139 9.49707 1.875 9.74935 2.59603 9.74935H4.72982C4.58008 10.3223 4.39779 10.8675 4.16829 11.377C3.94531 11.8929 3.5612 12.3861 3.03385 12.8564C4.04785 12.5928 4.94792 12.1973 5.74544 11.6764C6.53646 11.1605 7.22494 10.5127 7.79134 9.75098H9.51009C10.2262 9.75098 10.8398 9.49382 11.3493 8.99414C11.8587 8.48958 12.1061 7.87598 12.1061 7.15495V2.59766C12.1061 1.88151 11.8538 1.2679 11.3493 0.758464C10.8464 0.245768 10.2327 0 9.51009 0H7.39583ZM15.957 9.23014H14.4368L14.2188 9.90723H12.8499L14.484 5.80241H15.9521L17.5781 9.90723H16.1735L15.957 9.23014ZM15.6738 8.34147L15.2002 6.86686L14.7249 8.34147H15.6738ZM7.87923 6.13607C8.05664 6.25326 8.17383 6.32813 8.22754 6.35742C8.30892 6.40137 8.4196 6.45182 8.55632 6.51042L8.16081 7.26725C7.96224 7.17611 7.76367 7.06706 7.56836 6.94173C7.37305 6.81478 7.23633 6.72038 7.1582 6.65853C6.84245 6.78711 6.44694 6.85221 5.97168 6.85221C5.26855 6.85221 4.71354 6.67969 4.30827 6.33301C3.82812 5.92448 3.58887 5.34831 3.58887 4.60775C3.58887 3.88835 3.79883 3.32845 4.21875 2.92969C4.63867 2.53092 5.22461 2.33236 5.97819 2.33236C6.74642 2.33236 7.33724 2.52604 7.75553 2.91667C8.17383 3.30566 8.38216 3.86393 8.38216 4.58822C8.38216 5.23112 8.21452 5.74707 7.87923 6.13607ZM6.78385 5.44271C6.89779 5.25065 6.95475 4.96256 6.95475 4.57845C6.95475 4.13737 6.86686 3.82324 6.69434 3.63444C6.52018 3.44564 6.28092 3.35124 5.97494 3.35124C5.6901 3.35124 5.45898 3.44727 5.2832 3.64095C5.10579 3.83301 5.0179 4.13411 5.0179 4.54427C5.0179 5.02116 5.10417 5.35645 5.27669 5.5485C5.44922 5.74056 5.68685 5.83822 5.98796 5.83822C6.08561 5.83822 6.17676 5.82845 6.26302 5.81217C6.14258 5.7015 5.95378 5.59896 5.69336 5.5013L5.91797 5.01628C6.04492 5.03744 6.14421 5.0651 6.21419 5.09603C6.28581 5.12695 6.42253 5.21159 6.62923 5.34668C6.6748 5.37598 6.72689 5.40853 6.78385 5.44271ZM20 5.23275V9.79004C20 10.2035 19.9251 10.5924 19.777 10.9538C19.6273 11.3151 19.4108 11.6423 19.1113 11.9336C18.986 12.0589 18.8477 12.1745 18.7109 12.2721C18.5677 12.3747 18.418 12.4609 18.2699 12.5358C18.2633 12.5423 18.252 12.5423 18.2471 12.5472C18.0518 12.6383 17.8516 12.7018 17.6449 12.7474C17.4268 12.793 17.2038 12.8158 16.9743 12.8158H14.777C14.8063 12.9069 14.834 12.9997 14.8682 13.0908C14.9544 13.3431 15.057 13.5954 15.166 13.8411V13.8477C15.2637 14.0771 15.4004 14.2952 15.568 14.5133C15.7406 14.7363 15.9456 14.9544 16.193 15.179C16.3704 15.3337 16.3883 15.6038 16.2272 15.7812C16.1182 15.9066 15.9521 15.9538 15.8024 15.9131C15.2751 15.7747 14.7705 15.6038 14.3001 15.3971C13.8298 15.1904 13.3838 14.9495 12.9639 14.6745C12.5505 14.4043 12.1615 14.0951 11.8001 13.7581C11.4958 13.4717 11.2093 13.1559 10.9408 12.8239H9.43848C9.1569 12.8239 8.88184 12.7897 8.62467 12.7214C8.36751 12.653 8.12012 12.5439 7.88574 12.4007C7.68555 12.2803 7.62207 12.0166 7.74251 11.8164C7.86296 11.6162 8.12663 11.5527 8.32682 11.6732C8.48796 11.7708 8.65885 11.8457 8.84766 11.8962C9.03158 11.9482 9.23177 11.971 9.43848 11.971H11.1523C11.2842 11.971 11.4095 12.028 11.4958 12.1436C11.766 12.5049 12.0638 12.8369 12.3893 13.1413C12.71 13.4456 13.0599 13.7207 13.4375 13.9665C13.7988 14.2008 14.1829 14.4141 14.5898 14.5964C14.5101 14.4645 14.4466 14.3327 14.3831 14.2008C14.2692 13.9372 14.1602 13.667 14.0625 13.3805C13.9714 13.1104 13.8851 12.8304 13.8102 12.5488C13.7923 12.5033 13.7874 12.4512 13.7874 12.3991C13.7874 12.1647 13.9762 11.9694 14.2171 11.9694H16.9743C17.1468 11.9694 17.3063 11.9515 17.4609 11.9173C17.6107 11.8831 17.7474 11.8376 17.8792 11.779C17.8857 11.7725 17.8906 11.7725 17.8971 11.7676C18.0062 11.7155 18.1152 11.6536 18.2129 11.5837C18.3154 11.5088 18.4131 11.429 18.5059 11.3314C18.7174 11.1198 18.8786 10.8838 18.9811 10.6315C19.0837 10.3792 19.1357 10.0977 19.1357 9.79492V5.23763C19.1357 4.93327 19.0837 4.65332 18.9811 4.40104C18.8786 4.14876 18.7174 3.91439 18.5059 3.70117C18.2943 3.48958 18.0583 3.32845 17.806 3.22591C17.5537 3.12337 17.2721 3.07129 16.9694 3.07129H14.0902C13.8558 3.07129 13.6605 2.88249 13.6605 2.6416C13.6605 2.40723 13.8493 2.21191 14.0902 2.21191H16.9743C17.3877 2.21191 17.7718 2.28678 18.1315 2.4349C18.4928 2.58464 18.8135 2.80111 19.1113 3.09408C19.4043 3.38704 19.6273 3.71257 19.7705 4.07389C19.9202 4.43522 19.9935 4.81934 19.9935 5.23112H20V5.23275Z"
              fill="#347DF6"
            />
          </svg>
          <p className="font-bold text-xl ps-2">FAQ</p>
        </div>
        <div className="h-[70vh] mt-5">
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#cccfd6] [&::-webkit-scrollbar-thumb]:bg-[#67696b]">
            <div className="me-6" data-hs-overlay="#hs-overlay-right">
              {faqData &&
                faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="text-gray-800 disabled:opacity-50 cursor-pointer dark:text-gray-400 mb-6 w-full bg-[#e7eef9] rounded-full border-[#c1cee2] border-2"
                    onClick={() => askQuestion(faq)}
                  >
                    <div className="p-4">{faq}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqOffCanvas
