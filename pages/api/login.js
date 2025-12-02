import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Eksik bilgi' });

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (!user) return res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış' });

  res.status(200).json({ message: 'Giriş başarılı', user });
}
