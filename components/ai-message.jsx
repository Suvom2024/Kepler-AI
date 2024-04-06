// import {useMemo} from "react"
import { parseAnswerToHtml } from "./AnswerParser"
import DOMPurify from "dompurify"

const AIMessage = ({ answer,images }) => {
  const parsedAnswer = parseAnswerToHtml(answer.answer, images);
  const sanitizedAnswerHtml = DOMPurify.sanitize(parsedAnswer.answerHtml)

  return (
    <div className="border-2 border-dashed rounded-lg  mb-10">
      <div className="flex items-center px-4">
      <div className="bg-[#3B3B7E] rounded-full p-1">
      <img src="https://i.ibb.co/sqXS23n/robot.png" alt="Robot Icon" width="30" height="30" />
      </div>
        <p className="font-bold text-lg ps-3">Kepler</p>
      </div>
      <div
        className="answerText ms-10 pb-4 px-4 text-wrap"
        style={{ whiteSpaceCollapse: "preserve-breaks" }}
        dangerouslySetInnerHTML={{ __html: sanitizedAnswerHtml }}
      >
        {/* {parseAnswerToHtml(sanitizedAnswerHtml)} */}
      </div>
      
    </div>
  )
}

export default AIMessage
