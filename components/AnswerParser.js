// import { renderToStaticMarkup } from "react-dom/server";
// import { getCitationFilePath } from "../../api";

export function parseAnswerToHtml(answer) {
  // Convert **text** to <strong>text</strong>
  let parsedAnswer = answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Extract any follow-up questions that might be in the answer
  //   parsedAnswer = parsedAnswer.replace(/<<([^>>]+)>>/g, (match, content) => {
  //     followupQuestions.push(content)
  //     return ""
  //   })

  // Trim any whitespace from the end of the answer after removing follow-up questions
  parsedAnswer = parsedAnswer.trim()

  const parts = parsedAnswer.split(/\[([^\]]+)\]/g)

  const fragments = parts.map((part, index) => {
    if (index % 2 === 0) {
      return part
    }

    // else {
    //     let citationIndex;
    //     if (citations.indexOf(part) !== -1) {
    //         citationIndex = citations.indexOf(part) + 1;
    //     } else {
    //         citations.push(part);
    //         citationIndex = citations.length;
    //     }

    //     const path = getCitationFilePath(part);

    //     return renderToStaticMarkup(
    //         <a className="supContainer" title={part} onClick={() => onCitationClicked(path)}>
    //             <sup>{citationIndex}</sup>
    //         </a>
    //     );
    // }
  })

  return {
    answerHtml: fragments.join(""),
    // citations,
    // followupQuestions
  }
}
