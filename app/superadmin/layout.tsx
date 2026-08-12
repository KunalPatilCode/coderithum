import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin - Coderithum",
  description: "Management Console for Coderithum Tech Club Portal",
};

export default function SuperAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="superadmin-layout min-h-screen w-full">
      {children}
    </div>
  );
}
