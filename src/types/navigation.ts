export type RootStackParamList = {
  Verification: {
    onVerification: () => void;
    data: {
      email: string;
      id: string;
    };
  };
  Auth: undefined;
  Onboarding: undefined;
  ResetPassword: { email: string } | undefined;
  CreateNewPassword: undefined;
  SuccessChanged: undefined;
  Bookshelf: undefined;
};
