import { auth } from "@clerk/nextjs"

import { db } from "./db"

export const currentProfile = async () => {
  const { userId }: { userId: string | null } = auth()
  if (!userId) {
    return null
  }
  const currentProfile = await db.profile.findUnique({
    where: {
      userId,
    },
  })
  console.log(currentProfile, ": currentprofile")
  return currentProfile
}
