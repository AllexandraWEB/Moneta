'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createWorkspace(name: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'User not authenticated' }
  }

  // Create workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert({ name })
    .select()
    .single()

  if (workspaceError) {
    console.error('Error creating workspace:', workspaceError)
    return { data: null, error: workspaceError.message }
  }

  // Add user as owner
  const { error: memberError } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspace.id,
      user_id: user.id,
      role: 'owner'
    })

  if (memberError) {
    console.error('Error adding workspace member:', memberError)
    return { data: null, error: memberError.message }
  }

  revalidatePath('/')
  return { data: workspace, error: null }
}

export async function getUserWorkspaces() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('workspace_members')
    .select(`
      workspace_id,
      role,
      workspaces (*)
    `)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching workspaces:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function addWorkspaceMember(workspaceId: string, userEmail: string) {
  const supabase = await createClient()

  // Find user by email
  const { data: userData, error: userError } = await supabase
    .from('auth.users')
    .select('id')
    .eq('email', userEmail)
    .single()

  if (userError || !userData) {
    return { error: 'User not found' }
  }

  // Add as member
  const { error } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspaceId,
      user_id: userData.id,
      role: 'member'
    })

  if (error) {
    console.error('Error adding workspace member:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  return { error: null }
}

export async function getWorkspaceMembers(workspaceId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workspace_members')
    .select('*')
    .eq('workspace_id', workspaceId)

  if (error) {
    console.error('Error fetching workspace members:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
