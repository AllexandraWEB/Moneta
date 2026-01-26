'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getWorkspaceAccounts(workspaceId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching accounts:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createAccount(workspaceId: string, accountData: {
  name: string
  type: string
  balance?: number
  currency?: string
  icon?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('accounts')
    .insert({
      workspace_id: workspaceId,
      ...accountData,
      created_by: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating account:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  return { data, error: null }
}

export async function updateAccount(accountId: string, updates: {
  name?: string
  type?: string
  icon?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('accounts')
    .update(updates)
    .eq('id', accountId)
    .select()
    .single()

  if (error) {
    console.error('Error updating account:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  return { data, error: null }
}

export async function deleteAccount(accountId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', accountId)

  if (error) {
    console.error('Error deleting account:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  return { error: null }
}

export async function getAccountBalance(accountId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('accounts')
    .select('balance, currency')
    .eq('id', accountId)
    .single()

  if (error) {
    console.error('Error fetching account balance:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
