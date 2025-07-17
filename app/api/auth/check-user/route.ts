// app/api/auth/check-user/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    // Validate phone number
    if (!phone || !/^09\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'شماره موبایل نامعتبر است' },
        { status: 400 }
      );
    }

    // Check if user exists in database
    // Replace this with your actual database query
    const userExists = await checkUserInDatabase(phone);

    return NextResponse.json({ exists: userExists });
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'خطا در بررسی کاربر' },
      { status: 500 }
    );
  }
}

async function checkUserInDatabase(phone: string): Promise<boolean> {
  // Replace with your actual database logic
  // For example, using Prisma:
  // const user = await prisma.user.findUnique({
  //   where: { phone }
  // });
  // return !!user;
  
  // Mock implementation
  return Math.random() > 0.5; // 50% chance user exists
}

