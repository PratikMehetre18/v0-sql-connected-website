import crypto from "crypto"
import { sql } from "@neondatabase/serverless"

export async function hashPassword(password: string): Promise<string> {
  return crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = crypto.pbkdf2Sync(password, "salt", 1000, 64, "sha512").toString("hex")
  return hashedPassword === hash
}

export async function createUser(email: string, password: string, username: string, fullName: string) {
  const hashedPassword = await hashPassword(password)

  const result = await sql.query(
    `INSERT INTO users (email, password_hash, username, full_name)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, username, full_name`,
    [email, hashedPassword, username, fullName],
  )

  return result[0] || null
}

export async function getUserByEmail(email: string) {
  const result = await sql.query(`SELECT * FROM users WHERE email = $1`, [email])
  return result[0] || null
}

export async function getUserById(id: number) {
  const result = await sql.query(
    `SELECT id, email, username, full_name, profile_image_url, bio, created_at, is_admin FROM users WHERE id = $1`,
    [id],
  )
  return result[0] || null
}

export async function validateCredentials(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(password, user.password_hash)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.full_name,
    isAdmin: user.is_admin,
  }
}
