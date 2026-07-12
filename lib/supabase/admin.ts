import { createClient } from '@supabase/supabase-js'

// Service-role client — only used in server-side API routes.
// Never expose this to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
