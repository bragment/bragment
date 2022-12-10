/// <reference types="react-scripts" />

declare interface IRCDropdownRef {
  state: { prevPopupVisible: boolean; popupVisible: boolean };
  setPopupVisible: (visible: boolean) => void;
  close: () => void;
}

declare type TypeOfClass<T, A = any[]> = { new (...args: A): T };
