import { createClient } from '@supabase/supabase-js'



const supabase = createClient(
    'https://okkjgmkdgbmtzvoalxpj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ra2pnbWtkZ2JtdHp2b2FseHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Njg0ODksImV4cCI6MjA2MDE0NDQ4OX0.in17AFh2JSudHvkbDYJQBSzTOYRLvqqufx-UyPSzWnc'
)

export default supabase