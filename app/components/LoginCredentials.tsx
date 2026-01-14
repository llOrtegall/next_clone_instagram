'use client';

import { Button, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginCredentials() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validación básica
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Credenciales inválidas');
        setLoading(false);
        return;
      }

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <TextField.Root size="3" name="email" placeholder="email@example.com" type="email" />

      <TextField.Root size="3" name="password" type="password" placeholder="Password" />

      {error && (
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="solid"
        size="3"
        className="w-full"
        style={{ width: '100%', cursor: 'pointer' }}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Iniciar sesión'}
      </Button>
    </form>

  )
}