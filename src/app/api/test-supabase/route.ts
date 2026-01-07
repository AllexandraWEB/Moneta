import { createClient } from '@/src/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test the connection by getting the current user (will be null if not authenticated, but connection works)
    const { data, error } = await supabase.auth.getUser()
    
    if (error && error.message !== 'Auth session missing!') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Supabase connection failed',
          error: error.message 
        },
        { status: 500 }
      )
    }

    // Test database connection by checking if we can query
    const { error: dbError } = await supabase.from('_test_').select('*').limit(1)
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful!',
      authenticated: !!data.user,
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
      databaseAccessible: !dbError || dbError.message.includes('does not exist')
    })
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Connection test failed',
        error: error.message 
      },
      { status: 500 }
    )
  }
}
