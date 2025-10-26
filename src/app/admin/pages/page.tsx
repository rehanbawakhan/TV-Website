import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default function AdminPagesRedirect() {
  // Redirect /admin/pages to the legacy admin dashboard at /sus
  redirect('/sus')
}
