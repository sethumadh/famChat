import { createUploadthing, type FileRouter } from "uploadthing/next"
import { auth } from "@clerk/nextjs"

const f = createUploadthing()

export const handleAuth = () => {
  const { userId }: { userId: string | null } = auth()

  // If you throw, the user will not be able to upload
  if (!userId) throw new Error("Unauthorized")

  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId }
}
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId)

      console.log("file url", file.url)
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete((async ({ metadata, file }) => {console.log("Upload complete for userId:", metadata.userId)

      console.log("file url", file.url)}))
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
// import { auth } from "@clerk/nextjs";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
 
// const f = createUploadthing();
 
// const handleAuth = () => {
//   const { userId } = auth();
//   if (!userId) throw new Error("Unauthorized");
//   return { userId: userId };
// }

// export const ourFileRouter = {
//   serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   messageFile: f(["image", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {})
// } satisfies FileRouter;
 
// export type OurFileRouter = typeof ourFileRouter;