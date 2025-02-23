// 6-digit OTP code
export const generateOTPCode = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};
