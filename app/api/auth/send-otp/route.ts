// app/api/auth/send-otp/route.ts
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

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP in database/cache with expiration
    await storeOTP(phone, otp);

    // Send SMS
    const smsSent = await sendSMS(phone, otp);

    if (!smsSent) {
      return NextResponse.json(
        { error: 'خطا در ارسال پیامک' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'کد تایید ارسال شد',
      expiresIn: 120 // 2 minutes
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'خطا در ارسال کد تایید' },
      { status: 500 }
    );
  }
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function storeOTP(phone: string, otp: string): Promise<void> {
  // Store in Redis or database with 2-minute expiration
  // Example with Redis:
  // await redis.setex(`otp:${phone}`, 120, otp);
  
  // For demo purposes, we'll use a simple in-memory store
  // In production, use Redis or database
  global.otpStore = global.otpStore || {};
  global.otpStore[phone] = {
    otp,
    expiresAt: Date.now() + 2 * 60 * 1000 // 2 minutes
  };
}

async function sendSMS(phone: string, otp: string): Promise<boolean> {
  try {
    // Replace with your SMS provider (e.g., Kavenegar, Payamak, etc.)
    // Example with Kavenegar:
    // const response = await fetch(`https://api.kavenegar.com/v1/${API_KEY}/verify/lookup.json`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     receptor: phone,
    //     token: otp,
    //     template: 'verify'
    //   })
    // });
    
    // Mock SMS sending
    console.log(`Sending OTP ${otp} to ${phone}`);
    return true;
  } catch (error) {
    console.error('SMS sending error:', error);
    return false;
  }
}


