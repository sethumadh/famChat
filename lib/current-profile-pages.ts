

import { getAuth } from "@clerk/nextjs/server"
import { db } from "./db"
import { NextApiRequest } from "next"

export const currentProfilePages = async (req:NextApiRequest) => {
  const { userId }: { userId: string | null } = getAuth(req )
  if (!userId) {
    return null
  }
  const currentProfile = await db.profile.findUnique({
    where: {
      userId,
    },
  })
  // console.log(currentProfile, ": currentprofile")
  return currentProfile
}
