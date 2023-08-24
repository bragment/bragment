import { autoRetryExecute, scrollIntoView } from '@/utils';

export function scrollToTableHeader(id: string) {
  autoRetryExecute(() => {
    const th = document.querySelector(`table thead th[data-header-id=${id}]`);
    if (th) {
      scrollIntoView(th);
      return true;
    }
    return false;
  });
}

export function scrollToTableBodyRow(id: string) {
  autoRetryExecute(() => {
    const tr = document.querySelector(`table tbody tr[data-row-id=${id}]`);
    if (tr) {
      scrollIntoView(tr);
      return true;
    }
    return false;
  });
}
