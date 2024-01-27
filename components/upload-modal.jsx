"use client"

import Image from "next/image"
import { useState } from "react"
import { uploadFiles } from "@/actions/file-upload"

const UploadModal = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccessful, setUploadSuccessful] = useState(false)

  const handleFileChange = (e) => {
    const newFiles = e.target.files

    if (newFiles) {
      const filesArray = Array.from(newFiles)
      setSelectedFiles((prevSelectedFiles) => [
        ...prevSelectedFiles,
        ...filesArray,
      ])
    }
  }

  const removeFile = (file) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((f) => f !== file)
    )
  }

  const onUploadClick = async () => {
    if (!selectedFiles) return
    setIsLoading(true)
    try {
      await uploadFiles(selectedFiles)
      setUploadSuccessful(true)
    } catch (e) {
      alert(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOk = () => {
    setSelectedFiles([])
    setUploadSuccessful(false)
  }
  return (
    <div
      id="hs-vertically-centered-modal"
      className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    >
      <div
        className={`hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all ${
          uploadSuccessful ? "max-w-2xl" : "max-w-6xl"
        }  w-full m-3 mx-auto min-h-[calc(100%-3.5rem)] flex items-center`}
      >
        <div className="w-full flex flex-col pointer-events-auto bg-[#E8F4FD] border shadow-sm rounded-3xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex cursor-pointer justify-end items-center py-3 px-4 dark:border-gray-700">
            <button
              type="button"
              className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-vertically-centered-modal"
            >
              <span className="sr-only">Close</span>
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
          {uploadSuccessful && selectedFiles.length !== 0 ? (
            <div className="flex flex-col items-center justify-center gap-5">
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 23C0 16.9 2.42321 11.0499 6.73654 6.73654C11.0499 2.42321 16.9 0 23 0C29.1 0 34.9501 2.42321 39.2635 6.73654C43.5768 11.0499 46 16.9 46 23C46 29.1 43.5768 34.9501 39.2635 39.2635C34.9501 43.5768 29.1 46 23 46C16.9 46 11.0499 43.5768 6.73654 39.2635C2.42321 34.9501 0 29.1 0 23ZM21.6875 32.844L34.9293 16.2901L32.5373 14.3765L21.2459 28.4863L13.248 21.8224L11.2853 24.1776L21.6875 32.844Z"
                  fill="#2E70DD"
                />
              </svg>
              <div className="font-bold text-3xl">
                {selectedFiles.length} file(s) uploaded Successfully
              </div>
              <button
                data-hs-overlay="#hs-vertically-centered-modal"
                className="px-4 py-2 bg-[#347DF6] text-white rounded-lg mt-2 mb-10"
                onClick={() => handleOk()}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between gap-5 px-8 pb-8">
              <div className="w-full md:w-1/2">
                <div className="font-bold text-[#2E70DD] text-2xl">
                  Add New Files & Objects
                </div>
                <p className="text-sm py-5">
                  Documents and attachments that have been uploaded as part of
                  your projects
                </p>
                <div className="flex flex-col justify-center border-2 border-dashed rounded-lg border-[#c0c2c8] px-20 py-10">
                  <div className="text-center font-semibold text-[#737A82]">
                    Click button below or drag file to upload
                  </div>
                  <p className="pt-5 text-[#2174FF] text-sm text-center tracking-tight">
                    Any assets used in projects will live here. Start creating
                    by uploading your files
                  </p>
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer rounded-full bg-[#2174FF] text-center text-white mt-14 p-4 w-32 mx-auto"
                  >
                    Browse
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="application/pdf"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="font-bold text-[#2E70DD] text-2xl">
                  Uploaded Files
                </div>
                <p className="text-sm py-5">
                  Nulla convallis viverra imperdiet. Donec interdum porta
                  congue.
                </p>
                <div className="flex flex-col justify-center border-2 border-dashed rounded-lg border-[#c0c2c8] px-20 pt-8 pb-4">
                  <div className="text-center font-semibold text-[#737A82] mb-6">
                    Selected Files
                  </div>
                  <div className="flex gap-3 pb-2 mb-4 overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#cccfd6] [&::-webkit-scrollbar-thumb]:bg-[#67696b]">
                    {selectedFiles.length !== 0 && (
                      <>
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex max-w-20 flex-col items-center justify-center border-2 border-dashed rounded-lg border-[#c0c2c8]"
                          >
                            <div
                              className="ms-auto cursor-pointer"
                              onClick={() => removeFile(file)}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.6 9.4L9.4 16.6M9.4 9.4L16.6 16.6M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
                                  stroke="#949596"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="pb-2">
                              <Image
                                src="/icons/pdf.png"
                                width={28}
                                height={28}
                                alt="pdf logo"
                              />
                            </div>
                            <p className="text-xs text-[#838F9C] truncate w-28 px-6 pb-2">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <button
                    disabled={selectedFiles.length === 0 ? true : false}
                    className={`rounded-full disabled:opacity-50 bg-[#2174FF] text-center text-white ${
                      selectedFiles.length === 0 ? "mt-[93px]" : "mt-4"
                    } pb-2`}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin inline-block mt-4 w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full dark:text-blue-500"
                        role="status"
                        aria-label="loading"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <p
                        onClick={() => onUploadClick()}
                        className="w-full h-full p-4"
                      >
                        Upload
                      </p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadModal
