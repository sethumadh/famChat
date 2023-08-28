import Image from "next/image"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <>
      <p className="text-red-300 font-bold">This is a protected route</p>
      <UserButton afterSignOutUrl="/" />
    </>
  )
}
