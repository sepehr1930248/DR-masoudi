// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a real app, you might want to blacklist the token
    // For now, we'll just return success since we're using localStorage
    
    return NextResponse.json({ 
      message: 'خروج موفقیت‌آمیز' 
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { error: 'خطا در خروج' },
      { status: 500 }
    );
  }
}

