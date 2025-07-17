// utils/auth.ts - Server-side authentication utilities
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function getServerSession() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('authToken')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    // Get user from database
    const user = await getUserById(decoded.userId);
    
    return user;
  } catch (error) {
    console.error('Server session error:', error);
    return null;
  }
}

export async function requireServerAuth() {
  const session = await getServerSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }
  
  return session;
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

