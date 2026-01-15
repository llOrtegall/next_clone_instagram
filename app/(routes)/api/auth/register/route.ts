import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, username } = await request.json();

    // Validaciones básicas
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Crear el usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
        username,
      }
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente', user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json(
      { message: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}
