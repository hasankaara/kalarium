import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'Eksik bilgi' });

  // username benzersiz mi kontrol
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (existingUser) return res.status(409).json({ message: 'Kullanıcı adı zaten mevcut' });

  const { data, error } = await supabase
    .from('users')
    .insert({ username, password });

  if (error) return res.status(500).json({ message: error.message });

  res.status(200).json({ message: 'Kayıt başarılı', user: data[0] });
}
