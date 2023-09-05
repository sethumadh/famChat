import { Server as NetServer } from "http"
import { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"

import { NextApiResponseServerIo } from "@/types"

// This setting disables automatic parsing of the request body for API routes. It means that for API routes where this configuration is applied, you'll need to manually parse the request body if you want to access its contents. It can be useful when you have specific requirements for handling the request body in your API route.
export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io"
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: path,
      //   @ts-ignore
      addTrailingSlash: false,
    })
    res.socket.server.io = io
  }

  res.end()
}

export default ioHandler
// port is handled internally

// You initialize and configure the WebSocket server (io) using Socket.io 

// You store a reference to this WebSocket server (io) in res.socket.server.io. This allows you to access the WebSocket server instance from the res object.

// Code 1 sets up the WebSocket server and attaches it to the HTTP server, and it stores a reference to this WebSocket server in res.socket.server.io.

// Code 4 uses this reference to the WebSocket server to emit messages to connected WebSocket clients. This ensures that WebSocket communication can occur independently of HTTP request/response handling.

// In essence, by attaching the WebSocket server to the HTTP server in Code 1 and storing a reference in res.socket.server.io, you're making the WebSocket server accessible to other parts of your application, such as your WebSocket event handlers in Code 4. This separation of concerns allows you to handle WebSocket communication independently while still having access to the WebSocket server instance when needed.




// Inside ioHandler, the io WebSocket server is created when an HTTP request is made to the /api/socket/io path.

// It checks if res.socket.server.io is not already initialized, and if not, it creates a new io instance and assigns it to res.socket.server.io.

// The res.end() statement is used to terminate the HTTP response after the WebSocket server setup is complete.

// To clarify, this approach sets up the WebSocket server (io) in response to a specific HTTP request, but it does not directly attach it to your existing HTTP server. The WebSocket server will be available at the specified path (/api/socket/io) for WebSocket clients to connect to, but it doesn't become part of your main HTTP server in the traditional sense.