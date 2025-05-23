// import { NextResponse } from 'next/server';


// const NOTION_API_KEY = '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';
// const NOTION_VERSION = '2022-06-28';

// export const dynamic = 'force-dynamic'; // 動的ルートを許可（App Router）

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const id = url.searchParams.get('id');

//   if (!id) {
//     return NextResponse.json({ error: 'Missing id' }, { status: 400 });
//   }

//   try {
//     const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${NOTION_API_KEY}`,
//         'Notion-Version': NOTION_VERSION,
//         'Content-Type': 'application/json'
//       },
//       cache: 'no-store'
//     });

//     if (!res.ok) {
//       const err = await res.text();
//       return NextResponse.json({ error: err }, { status: res.status });
//     }

//     const blockData = await res.json();



//     return NextResponse.json({
//       blockData
//     });
//   } catch (err) {
//     console.error('❌ Notion fetch error:', err);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


// app/api/articles/detail/route.ts
import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

export const dynamic = 'force-dynamic'; // App Router で必要

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pageId = url.searchParams.get('id');

  if (!pageId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);
    return NextResponse.json({ recordMap });
  } catch (error) {
    console.error('❌ Notion fetch error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
