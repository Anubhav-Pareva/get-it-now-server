export function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};
export function verifyOTP(inputOTP, actualOTP) {
  if (inputOTP === actualOTP) {
    return true
  }
    return false;
}