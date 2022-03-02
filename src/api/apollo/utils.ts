import { Element } from '../../graphql';

export function convertToGlobalId(className: string, id: string) {
  return window.btoa(`${className}:${id}`);
}

export function convertToObjectId(className: string, id: string) {
  return window.atob(id).slice(className.length + 1);
}

export function generateElement<T = any>(value: T) {
  return {
    __typename: 'Element',
    value,
  } as Element;
}
