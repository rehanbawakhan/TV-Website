import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default function AdminRoot() {
  // Make legacy admin dashboard the default admin entry
  redirect('/sus')
}
