import { NextResponse } from 'next/server'
import axios from 'axios'

const NEWS_URL = process.env.NEWS_URL!
const NEWS_API_KEY = process.env.NEWS_API_KEY!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const pageSize = searchParams.get('pageSize') || '10'

  try {
    const response = await axios.get(NEWS_URL, {
      params: {
        q: 'cryptocurrency',
        sortBy: 'publishedAt',
        apiKey: NEWS_API_KEY,
        language: 'en',
        page,
        pageSize
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching news data:', error)
    return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 })
  }
}