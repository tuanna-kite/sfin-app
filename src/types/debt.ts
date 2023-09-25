import { collection, doc, setDoc } from "firebase/firestore";
import { UserProfile } from "./user";
import { firebaseDb } from "../firebase";
import moment from "moment";

export enum EAccept {
  Pending,
  Success,
  Failed,
}

export interface IDebt {
  user: string | UserProfile;
  loan: number;
  reason: string;
  fullname: string;
  momo: string;
  createdAt: Date;
  endAt: Date;
  paid: boolean;
  accept: EAccept;
}

const debtRef = collection(firebaseDb, "debts");

export type LoanRequestForm = {
  loan: number;
  reason: string;
  fullname: string;
  momo: string;
};

export async function createLoan(user: string, loanRequest: LoanRequestForm) {
  const newDebt: IDebt = {
    user,
    ...loanRequest,
    createdAt: new Date(),
    endAt: moment(new Date()).add(30, "d").toDate(),
    paid: false,
    accept: EAccept.Pending,
  };
  // TODO: Add doc
  await setDoc(doc(debtRef), newDebt)
}

export async function getAllDebts(user: string) {
  // TODO: Get docs by user, sort by createdAt
}
