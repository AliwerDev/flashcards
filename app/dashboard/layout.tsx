import { AuthGuard } from "@/src/auth/guard";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <h2>PROTECTED ROUTES</h2>
      {children}
    </AuthGuard>
  );
}
