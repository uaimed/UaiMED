import bcrypt from "bcryptjs";

const rounds = parseInt(process.env.BCRYPT_ROUNDS || "10");

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export default { hashPassword, comparePassword };
