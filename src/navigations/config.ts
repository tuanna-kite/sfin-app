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
  FillProfile: {
    phone: string;
    password: string;
  };
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
  ProfileVerification: undefined;
  TabNav: undefined;
  Home: undefined;
};
