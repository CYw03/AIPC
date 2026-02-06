import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-black text-white px-6 py-4">
          <h1 className="text-xl font-bold">联想 AIPC AI 销售系统 Demo</h1>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
