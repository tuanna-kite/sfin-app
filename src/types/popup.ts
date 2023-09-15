export enum EPopupType {
  Success,
  Confirm,
}

export interface IPopup {
  type: EPopupType;
  title: string;
  desc?: string;
}
