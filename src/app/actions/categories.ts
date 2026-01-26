'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getWorkspaceCategories(workspaceId: string, type?: 'income' | 'expense') {
  const supabase = await createClient()

  let query = supabase
    .from('categories')
    .select('*')
    .eq('workspace_id', workspaceId)

  if (type) {
    query = query.eq('type', type)
  }

  const { data, error } = await query.order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createCategory(workspaceId: string, categoryData: {
  name: string
  type: 'income' | 'expense'
  icon?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('categories')
    .insert({
      workspace_id: workspaceId,
      ...categoryData,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  return { data, error: null }
}
