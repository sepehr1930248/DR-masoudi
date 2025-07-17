'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'phone' | 'otp' | 'loading' | 'success';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const router = useRouter();

  // Validate Iranian phone number
  const validatePhoneNumber = (phone: string) => {
    const iranianPhoneRegex = /^09\d{9}$/;
    return iranianPhoneRegex.test(phone);
  };

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  // Check if user exists
  const checkUserExists = async (phone: string) => {
    try {
      // Simulate API call to check if user exists
      const response = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };

  // Send OTP
  const sendOTP = async (phone: string) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Simulate API call to send OTP
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      if (!response.ok) {
        throw new Error('خطا در ارسال کد تایید');
      }

      setStep('otp');
      setCountdown(120); // 2 minutes countdown
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در ارسال کد تایید');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (phone: string, otp: string) => {
    try {
      setIsLoading(true);
      setError('');

      // Simulate API call to verify OTP
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });

      if (!response.ok) {
        throw new Error('کد تایید نامعتبر است');
      }

      const data = await response.json();
      
      // Store auth token
      localStorage.setItem('authToken', data.token);
      
      setStep('success');
      
      // Redirect to dashboard after success
      setTimeout(() => {
        router.push('/dashboard');
        onClose();
      }, 1500);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'کد تایید نامعتبر است');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle phone number submit
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone) return;

    const userExists = await checkUserExists(phoneNumber);
    if (userExists) {
      // User exists, send OTP for login
      await sendOTP(phoneNumber);
    } else {
      // New user, send OTP for registration
      await sendOTP(phoneNumber);
    }
  };

  // Handle OTP submit
  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setError('کد تایید باید 6 رقم باشد');
      return;
    }
    await verifyOTP(phoneNumber, otpCode);
  };

  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhoneNumber(value);
      setIsValidPhone(validatePhoneNumber(value));
      setError('');
    }
  };

  // Handle OTP change
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtpCode(value);
      setError('');
    }
  };

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtpCode('');
      setError('');
      setCountdown(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600/70 hover:text-gray-800 dark:text-gray-400/70 dark:hover:text-gray-200 transition-colors z-10 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-full p-2"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/10 dark:to-gray-900/5 backdrop-blur-sm p-8 border-b border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 dark:border-gray-700/30">
              {step === 'phone' && <Phone size={28} className="text-gray-700 dark:text-gray-300" />}
              {step === 'otp' && <MessageSquare size={28} className="text-gray-700 dark:text-gray-300" />}
              {step === 'loading' && <Loader2 size={28} className="animate-spin text-gray-700 dark:text-gray-300" />}
              {step === 'success' && <CheckCircle size={28} className="text-emerald-600 dark:text-emerald-400" />}
            </div>
          </div>
          <h2 className="text-2xl font-light text-center text-gray-800 dark:text-gray-100">
            {step === 'phone' && 'ورود / ثبت نام'}
            {step === 'otp' && 'تایید شماره موبایل'}
            {step === 'loading' && 'در حال پردازش...'}
            {step === 'success' && 'ورود موفق!'}
          </h2>
          <p className="text-center text-gray-600/80 dark:text-gray-400/80 mt-2 text-sm">
            {step === 'phone' && 'شماره موبایل خود را وارد کنید'}
            {step === 'otp' && 'کد تایید ارسال شده را وارد کنید'}
            {step === 'loading' && 'لطفاً منتظر بمانید...'}
            {step === 'success' && 'در حال انتقال به داشبورد...'}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  شماره موبایل
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="09123456789"
                    className="w-full px-4 py-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-2xl focus:ring-2 focus:ring-gray-400/50 focus:border-transparent dark:text-white text-right transition-all duration-300 placeholder:text-gray-500/70"
                    dir="ltr"
                    disabled={isLoading}
                  />
                  {isValidPhone && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
                      <CheckCircle size={20} />
                    </div>
                  )}
                </div>
                {phoneNumber && !isValidPhone && (
                  <p className="text-red-500 text-sm mt-2">
                    شماره موبایل معتبر نیست
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!isValidPhone || isLoading}
                className="w-full bg-gray-800/80 dark:bg-gray-700/80 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-medium hover:bg-gray-700/90 dark:hover:bg-gray-600/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-gray-600/30"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span>ارسال کد تایید</span>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  کد تایید
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  کد تایید به شماره {formatPhoneNumber(phoneNumber)} ارسال شد
                </p>
                <input
                  type="text"
                  value={otpCode}
                  onChange={handleOTPChange}
                  placeholder="123456"
                  className="w-full px-4 py-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 rounded-2xl focus:ring-2 focus:ring-gray-400/50 focus:border-transparent dark:text-white text-center text-2xl tracking-widest transition-all duration-300"
                  dir="ltr"
                  maxLength={6}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={otpCode.length !== 6 || isLoading}
                className="w-full bg-gray-800/80 dark:bg-gray-700/80 backdrop-blur-sm text-white py-4 px-6 rounded-2xl font-medium hover:bg-gray-700/90 dark:hover:bg-gray-600/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 border border-gray-600/30"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <span>تایید</span>
                )}
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ارسال مجدد کد تا {formatTime(countdown)}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => sendOTP(phoneNumber)}
                    className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors underline underline-offset-4"
                  >
                    ارسال مجدد کد تایید
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm py-2"
              >
                تغییر شماره موبایل
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle className="text-emerald-500" size={32} />
              </div>
              <h3 className="text-lg font-light text-gray-900 dark:text-white mb-2">
                ورود موفق!
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                در حال انتقال به داشبورد...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}