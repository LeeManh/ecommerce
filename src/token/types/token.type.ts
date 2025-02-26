export interface TokenPayload {
  userId: number;
  roleId: number;
  deviceId: number;
  exp?: number;
  iat?: number;
}
