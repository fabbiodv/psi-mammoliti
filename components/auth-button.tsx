/**
 * AuthButton - Componente de autenticación híbrido
 * 
 * Solución para el problema de estado desactualizado después del login:
 * - Usa un Client Component para escuchar cambios de autenticación en tiempo real
 * - onAuthStateChange detecta cambios inmediatamente sin necesidad de recargar
 * - Muestra estado de carga durante la hidratación inicial
 * - Se actualiza automáticamente al hacer login/logout
 */
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Obtener usuario inicial
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    
    getUser();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-muted animate-pulse rounded-md"></div>
        <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
      </div>
    );
  }

  return user ? (
    <div className="flex items-center gap-4">
      {/* Email completo en desktop, solo inicial en mobile */}
      <span className="hidden sm:inline">{user.email}</span>
      <span className="sm:hidden w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
        {user.email?.[0]?.toUpperCase()}
      </span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Iniciar sesión</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Registrarse</Link>
      </Button>
    </div>
  );
}
