"use client"

import "@uploadthing/react/styles.css"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, RefreshCcw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"
import axios from "axios"
import { useRouter } from "next/navigation"

const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal()
  const { server } = data
  const isModalOpen = isOpen && type == "invite"
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const origin = useOrigin()
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`
  const router = useRouter()

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }
  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )
      onOpen("invite", { server: response.data })
    } catch (err) {
      setIsLoading(false)
      console.log("error for generating new invite code :", err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Invite
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                value={inviteUrl}
              />
              <Button onClick={onCopy}>
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              variant={`link`}
              size="sm"
              className="text-xs text-zinc-500 mt-4"
            >
              Generate a new link
              <RefreshCcw className="w-4 h-4 ml-2" onClick={onNew} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default InviteModal
