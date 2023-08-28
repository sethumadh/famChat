import { currentUser, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Profile } from "@prisma/client"
import { User } from "@clerk/nextjs/server"

export const initialProfile = async () => {
  const user = (await currentUser()) as User
  if (!user) {
    redirectToSignIn()
  }
  const existingProfile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (existingProfile) return existingProfile
  const profile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  })
  return profile
}
