import { createClient } from "@/src/lib/supabase/server";
import AccountSection from "./_components/account-section/account-section";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userName = user.user_metadata?.full_name || "User";
  const userEmail = user.email || "";

  return <AccountSection userName={userName} userEmail={userEmail} />;
}
