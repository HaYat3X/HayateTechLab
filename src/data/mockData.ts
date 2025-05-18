export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: 'programming' | 'design' | 'technology' | 'career';
  coverImage: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Reactの最新機能を使いこなす',
    excerpt: 'React 18の新機能と、それらをプロジェクトで活用するためのベストプラクティスについて解説します。',
    date: '2025-04-15',
    readTime: 8,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'モダンUIデザインの原則',
    excerpt: '美しく機能的なUIを設計するための原則と、ユーザーエクスペリエンスを向上させるテクニックを紹介します。',
    date: '2025-04-10',
    readTime: 6,
    category: 'design',
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    title: 'AIを活用した開発効率化',
    excerpt: '人工知能を活用して開発プロセスを効率化し、生産性を高める方法について詳しく解説します。',
    date: '2025-04-05',
    readTime: 7,
    category: 'technology',
    coverImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    title: 'テック業界でのキャリア構築',
    excerpt: '急速に変化するテクノロジー業界で長期的なキャリアを構築するための戦略とアドバイスを提供します。',
    date: '2025-04-01',
    readTime: 5,
    category: 'career',
    coverImage: 'https://images.pexels.com/photos/3184316/pexels-photo-3184316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    title: 'TypeScriptの高度な型システム',
    excerpt: 'TypeScriptの高度な型システムを理解し、型安全なコードを書くためのテクニックを詳しく解説します。',
    date: '2025-03-28',
    readTime: 9,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    title: 'アクセシブルなWebデザイン',
    excerpt: '誰もが利用できるWebサイトを設計するための原則とテクニックについて詳しく解説します。',
    date: '2025-03-22',
    readTime: 7,
    category: 'design',
    coverImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '7',
    title: 'エッジコンピューティングの実用例',
    excerpt: 'エッジコンピューティングの実際の応用例と、それがもたらす利点について詳しく解説します。',
    date: '2025-03-18',
    readTime: 6,
    category: 'technology',
    coverImage: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '8',
    title: 'リモートワークでの生産性向上',
    excerpt: 'リモートワーク環境での生産性を最大化するための実践的なテクニックとツールを紹介します。',
    date: '2025-03-12',
    readTime: 5,
    category: 'career',
    coverImage: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '9',
    title: 'マイクロフロントエンドアーキテクチャ',
    excerpt: '大規模Webアプリケーションのためのマイクロフロントエンドアーキテクチャの実装方法を解説します。',
    date: '2025-03-08',
    readTime: 10,
    category: 'programming',
    coverImage: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];