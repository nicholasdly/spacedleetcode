import "server-only";

import { hash, verify } from "@node-rs/argon2";

/**
 * Hashes a password using Argon2id.
 * @param password The password.
 * @returns The hashed password.
 */
export async function hashPassword(password: string) {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
}

/**
 * Verifies if a password matches an Argon2id password hash.
 * @param hashed The password hash.
 * @param password The password.
 * @returns Whether or not the passwords match.
 */
export async function verifyPassword(hashed: string, password: string) {
  return await verify(hashed, password);
}
