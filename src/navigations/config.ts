import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabsParams = {
  Home: undefined;
  Activities:undefined;
  Profile: {};
  Notification: {};
};

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  PhoneVerification: {
    phone:string;
  };
  FillProfile: undefined;
};

export type RootStackParams = {
  Auth:undefined;
  Activities:undefined;
  ChangePassword:undefined;
  EditProfile:undefined;
  LoanRequest:undefined;
  Notifications:undefined;
  Payment:undefined;
  ProfileVerification:{
    onPaymentRequest:boolean;
  };
  TabNav: undefined;
  Home:undefined;

}
  
  
  
  
