// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();

    // Validate inputs
    if (!phone || !otp || !/^09\d{9}$/.test(phone) || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'داده‌های ورودی نامعتبر' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = await verifyOTP(phone, otp);

    if (!isValidOTP) {
      return NextResponse.json(
        { error: 'کد تایید نامعتبر یا منقضی شده' },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await getUserByPhone(phone);
    
    if (!user) {
      // Create new user
      user = await createUser(phone);
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        phone: user.phone 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    // Clear OTP from store
    await clearOTP(phone);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        isNewUser: !user.name // If no name, it's a new user
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'خطا در تایید کد' },
      { status: 500 }
    );
  }
}

async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  // Check OTP from store
  const stored = global.otpStore?.[phone];
  
  if (!stored || stored.expiresAt < Date.now()) {
    return false;
  }

  return stored.otp === otp;
}

async function getUserByPhone(phone: string) {
  // Replace with your database logic
  // Example with Prisma:
  // return await prisma.user.findUnique({
  //   where: { phone }
  // });
  
  // Mock implementation
  return null; // Simulate new user
}

async function createUser(phone: string) {
  // Replace with your database logic
  // Example with Prisma:
  // return await prisma.user.create({
  //   data: { phone }
  // });
  
  // Mock implementation
  return {
    id: Math.random().toString(36).substr(2, 9),
    phone,
    name: null,
    createdAt: new Date()
  };
}

async function clearOTP(phone: string): Promise<void> {
  // Clear OTP from store
  if (global.otpStore && global.otpStore[phone]) {
    delete global.otpStore[phone];
  }
}
