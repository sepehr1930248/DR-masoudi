// app/api/auth/verify-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'توکن ارائه نشده' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Get user details
    const user = await getUserById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'کاربر یافت نشد' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { error: 'توکن نامعتبر' },
      { status: 401 }
    );
  }
}

async function getUserById(userId: string) {
  // Replace with your database logic
  // Example with Prisma:
  // return await prisma.user.findUnique({
  //   where: { id: userId }
  // });
  
  // Mock implementation
  return {
    id: userId,
    phone: '09123456789',
    name: 'کاربر تست',
    createdAt: new Date()
  };
}