import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { WorkspaceProvider } from "@/src/contexts/WorkspaceContext";
import NavigationWrapper from "@/src/components/navigation-wrapper";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user's first workspace
  const { data: workspaceData } = await supabase
    .from('workspace_members')
    .select('workspace_id, workspaces(id, name)')
    .eq('user_id', user.id)
    .single();

  const workspaceId = workspaceData?.workspace_id || "";
  const workspaceName = (workspaceData?.workspaces as any)?.name || "";

  return (
    <WorkspaceProvider workspaceId={workspaceId} workspaceName={workspaceName}>
      <NavigationWrapper />
      {children}
    </WorkspaceProvider>
  );
}
