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

  // Update account balance based on transaction type
  try {
    const { data: accountData, error: accountError } = await supabase
      .from('accounts')
      .select('id, balance')
      .eq('id', transactionData.account_id)
      .single()

    if (accountError) {
      console.error('Error fetching account for balance update:', accountError)
    } else if (accountData) {
      const currentBalance = Number(accountData.balance || 0)
      const delta = transactionData.type === 'income' ? Number(transactionData.amount) : -Number(transactionData.amount)
      const newBalance = currentBalance + delta

      const { error: updateAccountError } = await supabase
        .from('accounts')
        .update({ balance: newBalance })
        .eq('id', transactionData.account_id)

      if (updateAccountError) {
        console.error('Error updating account balance:', updateAccountError)
      }
    }
  } catch (e) {
    console.error('Unexpected error updating account balance:', e)
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

  // If account or amount/type changed, adjust balances accordingly
  try {
    // fetch original transaction to compute delta
    const { data: original, error: origErr } = await supabase
      .from('transactions')
      .select('id, account_id, amount, type')
      .eq('id', transactionId)
      .single()

    if (!origErr && original) {
      const oldAccountId = original.account_id
      const oldAmount = Number(original.amount)
      const oldType = original.type

      const newAccountId = updates.account_id ?? oldAccountId
      const newAmount = updates.amount !== undefined ? Number(updates.amount) : oldAmount
      const newType = updates.type ?? oldType

      // If account changed, reverse old on old account and apply new on new account
      const adjust = async (accountId: string, delta: number) => {
        const { data: acc, error: accErr } = await supabase
          .from('accounts')
          .select('id, balance')
          .eq('id', accountId)
          .single()
        if (!accErr && acc) {
          const current = Number(acc.balance || 0)
          await supabase.from('accounts').update({ balance: current + delta }).eq('id', accountId)
        }
      }

      const oldDelta = oldType === 'income' ? oldAmount : -oldAmount
      const newDelta = newType === 'income' ? newAmount : -newAmount

      if (oldAccountId !== newAccountId) {
        await adjust(oldAccountId, -oldDelta)
        await adjust(newAccountId, newDelta)
      } else {
        const net = newDelta - oldDelta
        if (net !== 0) await adjust(newAccountId, net)
      }
    }
  } catch (e) {
    console.error('Error adjusting balances after transaction update:', e)
  }

  revalidatePath('/', 'layout')
  return { data, error: null }
}

export async function deleteTransaction(transactionId: string) {
  const supabase = await createClient()

  // fetch transaction to reverse its effect on account balance
  try {
    const { data: transaction, error: tErr } = await supabase
      .from('transactions')
      .select('id, account_id, amount, type')
      .eq('id', transactionId)
      .single()

    if (tErr) {
      console.error('Error fetching transaction before delete:', tErr)
    } else if (transaction) {
      const delta = transaction.type === 'income' ? -Number(transaction.amount) : Number(transaction.amount)
      const { data: acc, error: accErr } = await supabase
        .from('accounts')
        .select('id, balance')
        .eq('id', transaction.account_id)
        .single()

      if (!accErr && acc) {
        const current = Number(acc.balance || 0)
        await supabase.from('accounts').update({ balance: current + delta }).eq('id', acc.id)
      }
    }
  } catch (e) {
    console.error('Unexpected error while reversing balance on delete:', e)
  }

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
