import DateFieldRenderer from './DateFieldRenderer';
import HttpLinkFieldRenderer from './HttpLinkFieldRenderer';
import MultipleLineTextFieldRenderer from './MultipleLineTextFieldRenderer';
import NumberFieldRenderer from './NumberFieldRenderer';
import ResolverFieldRenderer from './ResolverFieldRenderer';
import SingleLineTextFieldRenderer from './SingleLineTextFieldRenderer';
import { registerFieldRenderer } from './utils';

registerFieldRenderer(SingleLineTextFieldRenderer);
registerFieldRenderer(MultipleLineTextFieldRenderer);
registerFieldRenderer(NumberFieldRenderer);
registerFieldRenderer(DateFieldRenderer);
registerFieldRenderer(HttpLinkFieldRenderer);
registerFieldRenderer(ResolverFieldRenderer);

export * from './utils';
