export type User = { email: string; passwordHash: string; name?: string };
export const users = new Map<string, User>();
