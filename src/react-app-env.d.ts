/// <reference types="react-scripts" />

declare interface IDropdownRef {
  state: { prevPopupVisible: boolean; popupVisible: boolean };
  setPopupVisible: (visible: boolean) => void;
  close: () => void;
}
