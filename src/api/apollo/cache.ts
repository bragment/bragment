import {
  ApolloCache,
  FieldPolicy,
  FieldReadFunction,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import { IProjectFragmentDoc } from '../../graphql';

function generateFieldPolicies(fieldToType: Record<string, string>) {
  const result: Record<string, FieldPolicy<any> | FieldReadFunction<any>> = {};
  for (const field in fieldToType) {
    result[field] = {
      read(_, { args, toReference }) {
        return toReference({
          __typename: fieldToType[field],
          id: args?.id,
        });
      },
    };
  }
  return result;
}

export function unshiftCachedField<
  C = any,
  D = any,
  E extends { edges: any[] } = any
>(
  field: string,
  fragment: TypedDocumentNode,
  __typename: string,
  cache: ApolloCache<C>,
  data: D
) {
  cache.modify({
    fields: {
      [field]: (existing: E) => {
        const newProjectRef = cache.writeFragment({
          data,
          fragment,
        });
        return {
          ...existing,
          edges: [{ node: newProjectRef, __typename }, ...existing.edges],
        };
      },
    },
  });
}

export function unshiftCachedProjects<C = any, D = any>(
  cache: ApolloCache<C>,
  data: D
) {
  return unshiftCachedField(
    'projects',
    IProjectFragmentDoc,
    'ProjectEdge',
    cache,
    data
  );
}

export const memoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: generateFieldPolicies({ project: 'Project' }),
    },
  },
});
