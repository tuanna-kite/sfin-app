export type BottomTabsParams = {
  Home: undefined;
  Activities: undefined;
  Profile: {};
  Notification: {};
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  PhoneVerification: {
    phone: string;
  };
  FillProfile: undefined;
};

export type RootStackParams = {
  Auth: undefined;
  Activities: undefined;
  ChangePassword: undefined;
  EditProfile: undefined;
  LoanRequest: {
    loan: number;
  };
  Notifications: undefined;
  Payment: undefined;
  ProfileVerification: {
    onPaymentRequest: boolean;
    loan: number;
  };
  TabNav: undefined;
  Home: undefined;
};
