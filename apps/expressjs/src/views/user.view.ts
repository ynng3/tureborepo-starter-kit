import type { PublicUser, UserRecord } from '../models/user.model.js';

export function serializeUser(user: UserRecord): PublicUser {
  const { password: _password, ...safeUser } = user;
  return safeUser;
}
