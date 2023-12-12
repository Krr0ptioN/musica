export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
  passwordResetTokenExpiresIn: string;
}
