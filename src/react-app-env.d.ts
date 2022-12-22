/// <reference types="react-scripts" />

declare interface IRCDropdownRef {
  state: { prevPopupVisible: boolean; popupVisible: boolean };
  setPopupVisible: (visible: boolean) => void;
  close: () => void;
}
