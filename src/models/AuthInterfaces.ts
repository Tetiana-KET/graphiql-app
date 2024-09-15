export type TranslationFunction = (
  key: string,
  options?: Record<string, unknown>,
) => string;

export interface SignInFormInputs {
  email: string;
  password: string;
}

export interface SignUpFormInputs extends SignInFormInputs {
  name: string;
}
