import { VerificationCodeType } from '@prisma/client';

export interface IConditionFindValidVerificationCode {
  email: string;
  code?: string;
  type: VerificationCodeType;
}
