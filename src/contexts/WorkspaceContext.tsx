"use client";

import { createContext, useContext, ReactNode } from "react";

interface WorkspaceContextType {
  workspaceId: string;
  workspaceName?: string;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({
  children,
  workspaceId,
  workspaceName,
}: {
  children: ReactNode;
  workspaceId: string;
  workspaceName?: string;
}) {
  return (
    <WorkspaceContext.Provider value={{ workspaceId, workspaceName }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
