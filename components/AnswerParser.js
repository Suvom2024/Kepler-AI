export function parseAnswerToHtml(answer, images) {
  let parsedAnswer = answer || '';
  let imageHtml = '';

  // Process the answer text
  parsedAnswer = parsedAnswer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  parsedAnswer = parsedAnswer.trim();

  // If images are provided, create image HTML strings
  if (images && images.length > 0) {
    imageHtml = images.map(image => `<img src="data:image/png;base64,${image}" alt="Response Image" style="max-width: 100%; height: auto; display: block; margin: 10px 0;" />`).join('');
  }

  return {
    answerHtml: parsedAnswer + imageHtml, // Append the image HTML after the answer
  };
}
