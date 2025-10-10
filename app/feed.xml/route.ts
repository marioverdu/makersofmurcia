import { NextResponse } from 'next/server'
import { getPublishedPosts } from '@/lib/posts-db'

export async function GET() {
  const baseUrl = 'https://marioverdu.com'
  
  try {
    const posts = await getPublishedPosts()
    
    // Generar RSS XML
    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mario Verdú - Blog</title>
    <link>${baseUrl}</link>
    <description>Blog personal de Mario Verdú con artículos sobre UX/UI Design, desarrollo web, tecnología y experiencias profesionales.</description>
    <language>es-ES</language>
    <managingEditor>mario@marioverdu.com (Mario Verdú)</managingEditor>
    <webMaster>mario@marioverdu.com (Mario Verdú)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>Mario Verdú - Blog</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
    ${posts.map(post => {
      const postUrl = `${baseUrl}/es/posts/view/${post.id}`
      const description = post.excerpt || (post.content ? post.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...' : '')
      const cleanContent = post.content ? post.content.replace(/<script[^>]*>.*?<\/script>/gi, '') : ''
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[${cleanContent}]]></content:encoded>
      <dc:creator><![CDATA[${post.author || 'Mario Verdú'}]]></dc:creator>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ''}
      ${post.tags ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') : ''}
    </item>`
    }).join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}
