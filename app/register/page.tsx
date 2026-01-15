'use client';

import { Button, Card, Flex, Heading, Separator, Text, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;

    // Validaciones básicas
    if (!email || !password || !name || !username) {
      setError('Todos los campos son requeridos');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      setLoading(false);
      return;
    }

    try {
      // Crear usuario vía API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error al registrar usuario');
        setLoading(false);
        return;
      }

      // Login automático
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Error al iniciar sesión automáticamente');
        setLoading(false);
        return;
      }

      router.push('/home');
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen "
      p="4"
    >
      <Card size="4" style={{ width: "100%", maxWidth: "420px" }}>
        <Flex direction="column" gap="4">
          <Flex direction="column" align="center" gap="2">
            <Heading size="8" weight="bold">
              Instagram Clone
            </Heading>
            <Text size="2" color="gray">
              Create an account to see photos from your friends.
            </Text>
          </Flex>

          <Separator size="4" className="my-2" />

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <TextField.Root size="3" name="email" placeholder="email@example.com" type="email" required />
              <TextField.Root size="3" name="password" placeholder="Password (min 6 caracteres)" type="password" required />
              <TextField.Root size="3" name="name" placeholder="Full name" type="text" required />
              <TextField.Root size="3" name="username" placeholder="Username" type="text" required />

              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                  {error}
                </div>
              )}

              <Button type="submit" size="3" variant="solid" style={{ width: "100%" }} disabled={loading}>
                {loading ? 'Registrando...' : 'Sign Up'}
              </Button>
            </Flex>
          </form>

          <Separator size="4" className="my-2" />

          <Flex justify="center" align={"center"}>
            <Text size="2" color="gray">
              ¿Tienes una cuenta?
            </Text>
            <Link href="/" className="px-2 text-blue-400 hover:text-gray-300">
              Iniciar sesión
            </Link>
          </Flex>

        </Flex>
      </Card>
    </Flex>
  )
}