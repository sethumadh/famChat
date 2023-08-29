"use client"
import { FileIcon, X } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import React from "react"

type FileUploadProps = {
  onChange: (url?: string) => void
  endpoint: "messageFile" | "serverImage"
  value: string
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
          console.log("Files:", res)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(error)
          alert(`ERROR! ${error.message}`)
        }}
      />
    </>
  )
}

export default FileUpload
