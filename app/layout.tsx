// =============================================================================
// モジュール
// =============================================================================
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// =============================================================================
// 自作モジュール
// =============================================================================
import '../public/css/globals.css';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { ChatBot } from '@/components/chat-bot';
import { Toaster } from "@/components/ui/sonner";

// =============================================================================
// セットアップ
// =============================================================================
// フォント設定
const inter = Inter({ subsets: ['latin'] });

// メタデータ設定
export const metadata: Metadata = {
  title: 'HayateTechLab',
  description: 'HayateTechLabは、エンジニアのHayate Takedaが日々の技術調査や学びをまとめた個人ブログです。',
  verification: {
    google: "p-kJaxyGWUgRBZ98DZ7uHzRjnawEhzYkLCpjqu2ZS8Y",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
            <AppHeader />

            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>

            <Toaster />
            <AppFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}