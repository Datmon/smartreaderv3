export type RootStackParamList = {
  Verification: { onVerification: () => void; email: string };
  Auth: undefined;
  Onboarding: undefined;
  ResetPassword: { email: string } | undefined;
  CreateNewPassword: undefined;
  SuccessChanged: undefined;
  Bookshelf: undefined;
  Organaizer: undefined;
  Meeting: undefined;
  Profile: undefined;
};
