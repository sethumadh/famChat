import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()
    if (!profile) {
      return new NextResponse("Forbidden", { status: 500 })
    }
    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile.id,
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
        },
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
      },
    })
    return NextResponse.json(server)
  } catch (err) {
    console.log("[SERVER_POST]:", err)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
