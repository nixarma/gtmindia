import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET() {
  revalidatePath('/')
  revalidatePath('/events')
  revalidatePath('/presales-india')
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}