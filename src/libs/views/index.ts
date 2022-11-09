import ListViewRenderer from './renderers/ListViewRenderer';
import TableViewRenderer from './renderers/TableViewRenderer';
import { registerViewRenderer } from './utils';

registerViewRenderer(TableViewRenderer);
registerViewRenderer(ListViewRenderer);

export * from './utils';
