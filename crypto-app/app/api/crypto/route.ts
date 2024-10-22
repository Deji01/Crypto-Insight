import { NextResponse } from 'next/server'
import axios from 'axios'

const MARKETS_URL = process.env.MARKETS_URL!

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const perPage = searchParams.get('perPage') || '50'

    try {
        const response = await axios.get(MARKETS_URL, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: perPage,
                page: page,
                sparkline: false
            }
        })

        return NextResponse.json(response.data)
    } catch (error) {
        console.error('Error fetching crypto data:', error)
        return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 })
    }
}