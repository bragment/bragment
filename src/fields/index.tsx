import DateFieldRenderer from './renderers/DateFieldRenderer';
import HttpLinkFieldRenderer from './renderers/HttpLinkFieldRenderer';
import MultipleLineTextFieldRenderer from './renderers/MultipleLineTextFieldRenderer';
import NumberFieldRenderer from './renderers/NumberFieldRenderer';
import ResolverFieldRenderer from './renderers/ResolverFieldRenderer';
import SingleLineTextFieldRenderer from './renderers/SingleLineTextFieldRenderer';
import { registerFieldRenderer } from './utils';

registerFieldRenderer(SingleLineTextFieldRenderer);
registerFieldRenderer(MultipleLineTextFieldRenderer);
registerFieldRenderer(NumberFieldRenderer);
registerFieldRenderer(DateFieldRenderer);
registerFieldRenderer(HttpLinkFieldRenderer);
registerFieldRenderer(ResolverFieldRenderer);

export * from './utils';
