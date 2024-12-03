/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Password validation rules
 */
export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < PASSWORD_RULES.minLength) return false;
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) return false;
  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) return false;
  if (PASSWORD_RULES.requireNumber && !/\d/.test(password)) return false;
  if (PASSWORD_RULES.requireSpecial && !/[!@#$%^&*]/.test(password))
    return false;
  return true;
};

/**
 * Get password strength message
 */
export const getPasswordStrengthMessage = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < PASSWORD_RULES.minLength) {
    return `Password must be at least ${PASSWORD_RULES.minLength} characters`;
  }
  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (PASSWORD_RULES.requireNumber && !/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  if (PASSWORD_RULES.requireSpecial && !/[!@#$%^&*]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return "";
};
