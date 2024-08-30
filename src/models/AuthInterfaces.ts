export type TranslationFunction = (
  key: string,
  options?: Record<string, unknown>,
) => string;

export type SignInFormInputs = {
  email: string;
  password: string;
};
