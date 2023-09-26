import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";

export interface UserProfile {
  phone: string;
  password: string;
  avatarName: string;
  avatarUrl: string;
  frontIdUrl: string;
  frontIdName: string;
  backIdUrl: string;
  backIdName: string;
  frontPersonalName:string,
  frontPersonalUrl:string,
  schoolRecordName:string,
  schoolRecordUrl:string,
  userName: string;
  school: string;
  birthday: string;
  gender: EGender;
  verified: boolean;
}

export enum EGender {
  M,
  F,
}


