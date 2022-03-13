import { ApolloError, ServerError } from '@apollo/client';
import { Element } from '../../graphql';

export function convertToGlobalId(className: string, id: string) {
  return window.btoa(`${className}:${id}`);
}

export function convertToObjectId(className: string, id: string) {
  return window.atob(id).slice(className.length + 1);
}

export function checkClassGlobalId(className: string, id: string) {
  return window.atob(id).startsWith(className);
}

export function generateElement<T = any>(value: T) {
  return {
    __typename: 'Element',
    value,
  } as Element;
}

export function getGraphqlErrorCode(error: ApolloError): number | undefined {
  return (error.networkError as ServerError)?.result?.code;
}
