import { Card } from "@/components/ui/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, Tag, User } from "lucide-react";

const posts = {
  1: {
    id: 1,
    title: "マイクロサービスアーキテクチャの実践的な実装方法",
    content: `
# マイクロサービスアーキテクチャの実践的な実装方法

マイクロサービスアーキテクチャは、大規模なアプリケーションを小さな独立したサービスに分割する設計手法です。
この記事では、Kubernetes上でのマイクロサービスの実装について、具体的な手順とベストプラクティスを解説します。

## 1. マイクロサービスの設計原則

- 単一責任の原則
- サービス間の疎結合
- データの分散管理

## 2. Kubernetesを使用した実装

### 2.1 コンテナ化
各マイクロサービスは、Dockerコンテナとしてパッケージ化されます。これにより、サービスの依存関係を完全に分離し、一貫した実行環境を確保できます。

### 2.2 オーケストレーション
Kubernetesを使用して、以下の機能を実現します：
- 自動スケーリング
- ロードバランシング
- サービスディスカバリ
- ヘルスチェック

## 3. 通信パターン

### 3.1 同期通信
RESTful APIやgRPCを使用した直接的な通信

### 3.2 非同期通信
メッセージキューを使用したイベント駆動型アーキテクチャ

## 4. モニタリングと運用

- Prometheusによるメトリクス収集
- Grafanaによる可視化
- 分散トレーシング
- ログ集約

## まとめ

マイクロサービスアーキテクチャの実装には、適切な技術選定と運用戦略が重要です。
本記事で紹介した手法を参考に、プロジェクトに最適なアーキテクチャを設計してください。
    `,
    date: "2024-03-20",
    category: "Backend",
    author: "Hayate Takeda",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Kubernetes", "マイクロサービス", "Docker"],
  },
  2: {
    id: 2,
    title: "Next.js 14で作るモダンなWebアプリケーション",
    content: `
# Next.js 14で作るモダンなWebアプリケーション

Next.js 14は、Reactベースのフレームワークの最新バージョンです。
App RouterとServer Componentsを活用することで、高速で保守性の高いWebアプリケーションを構築できます。

## 1. App Routerの特徴

- ファイルベースのルーティング
- レイアウトの共有
- ローディング UI
- エラーハンドリング

## 2. Server Components

### 2.1 メリット
- 初期ロード時間の短縮
- SEOの改善
- バンドルサイズの削減

### 2.2 実装例
具体的なコード例を交えて解説します。
    `,
    date: "2024-03-18",
    category: "Frontend",
    author: "Hayate Takeda",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    tags: ["Next.js", "React", "TypeScript"],
  },
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts[Number(params.id)];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card className="overflow-hidden border-none bg-card/50 backdrop-blur-sm light:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-primary/90 rounded-full text-sm backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                <Tag className="w-4 h-4" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content}
          </div>
        </div>
      </Card>
    </div>
  );
}