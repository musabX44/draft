import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">TeamBoard — Premium Minimal</h1>
        <div>
          {session?.user ? (
            <div className="flex items-center gap-4">
              <img src={session.user.image || '/avatar.png'} className="w-8 h-8 rounded-full" alt="avatar"/>
              <button onClick={() => signOut()} className="px-3 py-1 rounded bg-gray-100">Sign out</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => signIn("github")} className="px-3 py-1 rounded bg-black text-white">GitHub</button>
              <button onClick={() => signIn("google")} className="px-3 py-1 rounded bg-blue-600 text-white">Google</button>
              <button onClick={() => signIn("email")} className="px-3 py-1 rounded bg-gray-100">Email</button>
            </div>
          )}
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/boards/new" className="p-6 border rounded-lg hover:shadow">
          <div className="text-xl font-medium">+ Yeni Panoya Başla</div>
          <p className="text-sm text-gray-500">Hızlıca bir board oluştur ve kart ekle.</p>
        </Link>
        <div className="p-6 border rounded-lg">
          <div className="text-xl font-medium">Premium UI</div>
          <p className="text-sm text-gray-500">Minimal, canlı ve premium görünümlü bileşenler.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="text-xl font-medium">Deploy</div>
          <p className="text-sm text-gray-500">Netlify ile tek tık deploy ve otomatik preview.</p>
        </div>
      </section>
    </main>
  );
}
