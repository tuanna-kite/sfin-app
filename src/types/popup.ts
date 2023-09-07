export enum EPopupType {
  Success,
  Error,
}

export interface IPopup {
  type: EPopupType;
  title: string;
  desc: string;
}
