import { NextResponse } from 'next/server'
import axios from 'axios'

const TRENDING_URL = process.env.TRENDING_URL!

export async function GET() {
    try {
        const response = await axios.get(TRENDING_URL)
        return NextResponse.json(response.data)
    } catch (error) {
        console.error('Error fetching trending data:', error)
        return NextResponse.json({ error: 'Failed to fetch trending data' }, { status: 500 })
    }
}