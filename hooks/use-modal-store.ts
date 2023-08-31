import { Server } from "@prisma/client"
import { create } from "zustand"

export type ModalType = "createServer" | "invite" | "editServer" | "members"

type ModalData = {
  server?: Server
}

type ModalStore = {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
