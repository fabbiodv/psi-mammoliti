"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh(); // Asegurar que se recargue el estado del servidor
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Cerrar sesión</Button>;
}
