import { v4 as uuidv4 } from "uuid"
import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const profile = currentProfile()
  if (!profile) {
    return new NextResponse("Forbidden", { status: 401 })
  }
  if (!params.serverId)
    return new NextResponse("No Server ID available: Invide Api")

  const updateInvite = await db.server.update({
    where: {
      id: params.serverId,
    },
    data: {
      inviteCode: uuidv4(),
    },
  })
  return NextResponse.json(updateInvite)
}
