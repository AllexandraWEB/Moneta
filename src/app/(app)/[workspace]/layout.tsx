import { WorkspaceProvider } from "@/src/contexts/WorkspaceContext";
import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspace: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user's first workspace
  const { data: workspaceData, error } = await supabase
    .from('workspace_members')
    .select('workspace_id, workspaces(id, name)')
    .eq('user_id', user.id)
    .single();

  const workspaceId = workspaceData?.workspace_id || "";
  const workspaceName = (workspaceData?.workspaces as any)?.name || "";

  if (!workspaceId || error) {
    return (
      <WorkspaceProvider workspaceId="" workspaceName="">
        <div className="p-8 text-center min-h-screen flex items-center justify-center">
          <div className="max-w-lg">
            <p className="text-lg font-semibold mb-2">⚠️ Workspace Setup Required</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please set up your workspace in Supabase first.
            </p>
            <p className="text-xs text-gray-500 mt-2">User ID: {user.id}</p>
            {error && <p className="text-xs text-red-500 mt-2">Error: {error.message}</p>}
            <div className="mt-6 text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Quick Fix:</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                Run this in Supabase SQL Editor:
              </p>
              <code className="text-xs bg-gray-200 dark:bg-gray-700 p-2 rounded block overflow-x-auto">
                DROP POLICY IF EXISTS "Users can view members of their workspaces" ON workspace_members;<br/>
                CREATE POLICY "Users can view their own workspace memberships" ON workspace_members FOR SELECT USING (user_id = auth.uid());
              </code>
            </div>
          </div>
        </div>
      </WorkspaceProvider>
    );
  }

  return (
    <WorkspaceProvider workspaceId={workspaceId} workspaceName={workspaceName}>
      {children}
    </WorkspaceProvider>
  );
}
