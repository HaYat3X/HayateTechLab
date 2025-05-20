import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code2, Brain, Rocket, Database } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const techStacks = {
    frontend: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Vue.js', icon: '/icons/vue.svg' },
      { name: 'Nuxt.js', icon: '/icons/nuxt.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' }
    ],
    backend: [
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
      { name: 'Express', icon: '/icons/express.svg' },
      { name: 'Flask', icon: '/icons/flask.svg' },
      { name: 'Ruby on Rails', icon: '/icons/rails.svg' }
    ],
    tools: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'Postman', icon: '/icons/postman.svg' },
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'GitHub', icon: '/icons/github.svg' },
      { name: 'Visual Studio', icon: '/icons/visualstudio.svg' }
    ]
  };



  return (
    <div className="space-y-16">

      <section
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br -z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] animate-fade-in" />
        <div className="text-center relative">
          <h1 className="text-6xl font-bold gradient-text animate-slide-in animate-delay-200">
            HayateTechLab<span className="text-gray-900 dark:text-white">で技術を探求する</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto my-8 leading-relaxed animate-slide-in animate-delay-200">
            HayateTechLab は、個人エンジニアによる技術検証と知見の記録を目的とした開発ラボです。<br />
            主にフロントエンド、バックエンド、AI、ビジネスなどの分野を中心に、実践ベースの情報を発信しています。
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-slide-in animate-delay-300"
          >
            記事を読む <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>


      {/* <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 space-y-8 text-center">
          <h1 className="text-6xl font-bold gradient-text">
            HayateTechLab
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            個人エンジニアによる技術検証と知見の記録を目的とした開発ラボです。
            フロントエンド、バックエンド、AI、ビジネスなどの分野を中心に、
            実践ベースの情報を発信しています。
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="gradient-border rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform">
              <Link href="/blog">記事を読む</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform backdrop-blur-sm">
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </section> */}

      <section className="skewed-section py-32 my-20">
        <div className="max-w-5xl mx-auto px-4 text-center text-white space-y-4">
          <h2 className="text-4xl font-bold">最新の記事をチェックしよう</h2>
          <p className="text-lg opacity-90">
            プログラミング、ビジネスに関する実践的な記事が揃っています。
            一緒に技術を探求しましょう！
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full px-8">
            <Link href="/blog">記事一覧を見る</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center gradient-text">私について</h2>
          <div className="bg-card/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden gradient-border p-[1px]">
                <Image
                  src="https://images.unsplash.com/photo-1534607287018-541c7d97748f"
                  alt="Waterfall"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl font-bold">Hayate Takeda</h3>
                <p className="text-muted-foreground leading-relaxed">
                  鳥取県出身のエンジニア。専門学校でIT技術を学んだ後、20歳でIT業界へ。
                  現在はデスクトップアプリやWebアプリの開発を中心に、フロントエンド・バックエンドの開発を担当しています。
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">フロントエンド開発</span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">バックエンド開発</span>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">UI/UXデザイン</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="space-y-16">
          <h2 className="text-3xl font-bold text-center gradient-text">技術スキル</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  <Image src="/icons/react.svg" width={32} height={32} alt="Frontend" />
                </div>
                <span className="text-xl font-semibold">フロントエンド</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {techStacks.frontend.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors">
                    <Image src={tech.icon} width={32} height={32} alt={tech.name} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  <Image src="/icons/nodejs.svg" width={32} height={32} alt="Backend" />
                </div>
                <span className="text-xl font-semibold">バックエンド</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {techStacks.backend.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors">
                    <Image src={tech.icon} width={32} height={32} alt={tech.name} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-card/50 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  <Image src="/icons/git.svg" width={32} height={32} alt="Tools" />
                </div>
                <span className="text-xl font-semibold">開発ツール</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {techStacks.tools.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center gap-2 p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors">
                    <Image src={tech.icon} width={32} height={32} alt={tech.name} />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center gradient-text">最新の開発事例</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group space-y-4 hover:scale-105 transition-all duration-300">
              <div className="relative aspect-video rounded-xl overflow-hidden gradient-border p-[1px]">
                <Image
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">マイクロサービス実装例</h3>
              <p className="text-muted-foreground">
                Kubernetes上で動作する分散システムの設計と実装事例を紹介。
                スケーラビリティとレジリエンスを考慮したアーキテクチャ。
              </p>
            </div>
            <div className="group space-y-4 hover:scale-105 transition-all duration-300">
              <div className="relative aspect-video rounded-xl overflow-hidden gradient-border p-[1px]">
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                  alt="AI Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">AI画像認識システム</h3>
              <p className="text-muted-foreground">
                PyTorchを使用した画像認識システムの開発事例。
                転移学習を活用した効率的なモデル構築手法の解説。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}