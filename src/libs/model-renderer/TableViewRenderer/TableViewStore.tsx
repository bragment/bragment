import { makeAutoObservable } from 'mobx';

export default class TableViewStore {
  public activeCellRecord: Record<string, Record<string, boolean>> = {};
  public editingCellRecord: Record<string, Record<string, boolean>> = {};

  public constructor() {
    makeAutoObservable(this);
  }

  public getCellRecordValue = (
    key: 'activeCellRecord' | 'editingCellRecord',
    row: string,
    col: string
  ) => {
    return !!(this[key][row] && this[key][row][col]);
  };

  public checkIfCellActive = (row: string, col: string) => {
    return this.getCellRecordValue('activeCellRecord', row, col);
  };

  public checkIfCellEditing = (row: string, col: string) => {
    return this.getCellRecordValue('editingCellRecord', row, col);
  };

  public setCellRecordValue = (
    key: 'activeCellRecord' | 'editingCellRecord',
    row: string,
    col: string,
    value: boolean
  ) => {
    if (value) {
      if (this[key][row]) {
        this[key][row][col] = true;
        return;
      }
      this[key][row] = { [col]: true };
      return;
    }
    if (this[key][row] && this[key][row][col]) {
      this[key][row][col] = false;
    }
  };

  public setActiveCell = (row: string, col: string, active: boolean) => {
    this.setCellRecordValue('activeCellRecord', row, col, active);
  };

  public setEditingCell = (row: string, col: string, editing: boolean) => {
    this.setCellRecordValue('editingCellRecord', row, col, editing);
  };
}
