import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <>
      <p className="text-red-300 font-bold">This is a protected route</p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle/>
    </>
  )
}
