import SettingsForms from "@/app/components/SettingForm";
import { auth } from "@/auth"

export default async function SettingsPage() {
  const session = await auth();

  if(!session?.user?.email){
    return 'not logged in'
  }

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>

      <SettingsForms userEmail={session.user.email}/>
    </div>
  )
}