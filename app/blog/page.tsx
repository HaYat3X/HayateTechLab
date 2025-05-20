import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "マイクロサービスアーキテクチャの実践的な実装方法",
    excerpt: "Kubernetes上でのマイクロサービスの実装について、具体的な手順とベストプラクティスを解説します。",
    date: "2024-03-20",
    category: "Backend",
    author: "Hayate Takeda",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Kubernetes", "マイクロサービス", "Docker"]
  },
  {
    id: 2,
    title: "Next.js 14で作るモダンなWebアプリケーション",
    excerpt: "App RouterとServer Componentsを活用した、パフォーマンスの高いWebアプリケーションの構築方法を紹介します。",
    date: "2024-03-18",
    category: "Frontend",
    author: "Hayate Takeda",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tags: ["Next.js", "React", "TypeScript"]
  },
  {
    id: 3,
    title: "AIを活用したチャットボットの実装方法",
    excerpt: "OpenAI APIを使用して、高度な自然言語処理が可能なチャットボットを実装する方法を解説します。",
    date: "2024-03-15",
    category: "AI",
    author: "Hayate Takeda",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    tags: ["AI", "OpenAI", "Node.js"]
  },
  {
    id: 4,
    title: "効率的なデータベース設計のベストプラクティス",
    excerpt: "スケーラブルで保守性の高いデータベース設計の方法と、実際のプロジェクトでの適用例を紹介します。",
    date: "2024-03-12",
    category: "Database",
    author: "Hayate Takeda",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    tags: ["Database", "PostgreSQL", "設計"]
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold gradient-text">技術ブログ</h1>
          <p className="text-lg text-muted-foreground">
            フロントエンド、バックエンド、インフラなど、実践的な技術情報を発信しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="group overflow-hidden border-none bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full light:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-sm backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}