'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTransaction(transactionData: {
  workspace_id: string
  account_id: string
  category_id?: string
  amount: number
  type: 'income' | 'expense'
  note?: string
  date?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: 'User not authenticated' }
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transactionData,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating transaction:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { data, error: null }
}

export async function getWorkspaceTransactions(workspaceId: string, limit?: number) {
  const supabase = await createClient()

  let query = supabase
    .from('transactions')
    .select(`
      *,
      accounts (name, type, icon),
      categories (name, icon, type)
    `)
    .eq('workspace_id', workspaceId)
    .order('date', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching transactions:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getAccountTransactions(accountId: string, limit?: number) {
  const supabase = await createClient()

  let query = supabase
    .from('transactions')
    .select(`
      *,
      categories (name, icon, type)
    `)
    .eq('account_id', accountId)
    .order('date', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching account transactions:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateTransaction(transactionId: string, updates: {
  account_id?: string
  category_id?: string
  amount?: number
  type?: 'income' | 'expense'
  note?: string
  date?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', transactionId)
    .select()
    .single()

  if (error) {
    console.error('Error updating transaction:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/', 'layout')
  return { data, error: null }
}

export async function deleteTransaction(transactionId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId)

  if (error) {
    console.error('Error deleting transaction:', error)
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { error: null }
}
