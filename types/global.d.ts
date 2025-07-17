// Extend the global type definitions
declare global {
  namespace NodeJS {
    interface Global {
      otpStore: {
        [key: string]: {
          otp: string;
          expiresAt: number;
        };
      };
    }
  }
}

export {}; // This file needs to be a module
