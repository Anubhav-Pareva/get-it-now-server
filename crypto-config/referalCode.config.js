import crypto from "crypto";
export async function generateReferralCode(userName, dob) {
  const input = `${userName}-${dob}`; // Combine as one unique string
  const hash = await sha256(input);
  const base36 = BigInt("0x" + hash)
    .toString(36)
    .toUpperCase();
  return base36.slice(0, 6); // First 6 characters
}

export async function sha256(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
  