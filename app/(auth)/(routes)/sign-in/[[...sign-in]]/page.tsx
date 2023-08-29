import { SignIn } from "@clerk/nextjs";
 
export default function Page({searcParams}:any) {
  const {redirectUrl}= searcParams
  return <SignIn redirectUrl={redirectUrl || "/"} />;
}