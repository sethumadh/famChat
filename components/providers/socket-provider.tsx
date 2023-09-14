"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { io as ClientIO } from "socket.io-client"

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  // The useEffect hook is used to set up and manage the WebSocket connection when the component mounts.
  useEffect(() => {
    // this connects to the websocket server defined in the api/io.ts.
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    )

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
    })
    socketInstance.on("connect", () => {
      setIsConnected(true)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
