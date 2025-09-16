'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email){
      alert('Por favor preencher o campo E-mail!')
      return
    }

     if(!password){
      alert('Por favor preencher o campo Senha!')
      return
    }
    
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 ">
      <div className="bg-white p-8 rounded-lg shadow-lg md:w-[350px] max-w-md px-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 outline-0">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full text-slate-900 px-3 py-2 outline-0 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-900">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full text-slate-900 px-3 py-2 border outline-0 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-indigo-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Entrar
          </button>
        </div>
        <p className="mt-4 text-center text-slate-900">
          Não tem uma conta? <a href="/register" className="text-indigo-600 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}