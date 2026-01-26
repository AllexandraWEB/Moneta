import HeroSection from "@/src/app/(app)/[workspace]/_components/home-section";
import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return <HeroSection userName={userName} />;
}