import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
