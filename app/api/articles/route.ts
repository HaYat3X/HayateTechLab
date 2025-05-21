// app/api/articles/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const NOTION_API_KEY = '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';
  const DATABASE_ID = '1d4fab19d29580a2bc13d8f559d5fa7a';

  if (!NOTION_API_KEY || !DATABASE_ID) {
    return NextResponse.json({ error: 'Missing Notion credentials' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        // page_size: 100,
        filter: {
          property: '公開',
          select: {
            equals: '公開'
          }
        }
      }),
      cache: 'no-store' // ←これでNext.jsのfetchキャッシュを無効化
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const data = await response.json();



    // シンプルに整形して返す
    const articles = data.results.map((page: any) => {
      const properties = page.properties;

      const rawDate = properties['最終更新日']?.last_edited_time || page.last_edited_time;
      const formattedDate = new Date(rawDate).toISOString().split('T')[0]; //

      const cover = page.cover;
      const coverImage =
        cover?.type === 'external'
          ? cover.external.url
          : cover?.type === 'file'
            ? cover.file.url
            : 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; // デフォルト画像にしてもOK


      return {
        id: page.id,
        title: properties['タイトル']?.title?.[0]?.plain_text || '無題',
        excerpt: properties['記事の説明']?.rich_text?.[0]?.plain_text || '無題',
        date: formattedDate,
        readTime: properties['読むのにかかる時間']?.rich_text?.[0]?.plain_text || '',
        category: properties['タグ']?.multi_select?.map((tag: any) => tag.name) || [],
        coverImage: coverImage,
      };
    });

    return NextResponse.json({ articles }, { status: 200 });
  } catch (err) {
    console.error('❌ Notion fetch error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
