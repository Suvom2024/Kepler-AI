const url = process.env.NEXT_PUBLIC_BASE_URL

export async function uploadFiles(files) {
  const formData = new FormData()

  files.forEach((file) => {
    formData.append("files", file)
  })

  const response = await fetch(`${url}/upload_and_index`, {
    method: "POST",
    body: formData,
  })

  const parsedResponse = await response.json()
  if (response.status > 299 || !response.ok) {
    throw Error(parsedResponse.message || "Unknown error")
  }

  return parsedResponse
}
