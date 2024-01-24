import React from "react"

const AIMessage = ({ answer }) => {
  return (
    <div className="border-2 border-dashed rounded-lg border-[#c0c2c8] bg-[#e8f4fd] mb-10">
      <div className="flex items-center px-4">
        <svg
          width="33"
          height="44"
          viewBox="0 0 33 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="22" r="15" fill="#2E70DD" />
          <path
            d="M19.18 25.68H13.32V23.44H19.18V25.68ZM15.92 17.5H16.58L12.54 29H10.06L15.04 15H17.46L22.44 29H19.96L15.92 17.5Z"
            fill="white"
          />
        </svg>
        <p className="font-bold text-lg ps-3 pt-1">AI Gen</p>
      </div>
      <p className="ms-10 pb-4 px-4">{answer.answer}</p>
    </div>
  )
}

export default AIMessage
