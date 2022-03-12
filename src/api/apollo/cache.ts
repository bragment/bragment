import {
  ApolloCache,
  ApolloClient,
  FieldPolicy,
  FieldReadFunction,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import {
  EClassName,
  GetProjectColumnDocument,
  GetProjectViewDocument,
  IProjectColumnFragment,
  IProjectColumnFragmentDoc,
  IProjectFragment,
  IProjectFragmentDoc,
  IProjectViewFragment,
} from '../../graphql';
import { convertToGlobalId } from './utils';

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

export function unshiftCachedObjectList<
  C = any,
  D = any,
  E extends { edges: any[] } = any
>(
  cache: ApolloCache<C>,
  fragment: TypedDocumentNode,
  typeName: string,
  listName: string,
  data: D
) {
  return cache.modify({
    fields: {
      [listName]: (existing: E) => {
        const newRef = cache.writeFragment({
          data,
          fragment,
        });
        return {
          ...existing,
          edges: [{ node: newRef, __typename: typeName }, ...existing.edges],
        };
      },
    },
  });
}

export function unshiftCachedProjects<C = any>(
  cache: ApolloCache<C>,
  data: IProjectFragment
) {
  return unshiftCachedObjectList(
    cache,
    IProjectFragmentDoc,
    'ProjectEdge',
    'projects',
    data
  );
}

export function unshiftCachedProjectColumns<C = any>(
  cache: ApolloCache<C>,
  data: IProjectColumnFragment
) {
  return unshiftCachedObjectList(
    cache,
    IProjectColumnFragmentDoc,
    'ProjectColumnEdge',
    'projectColumns',
    data
  );
}

export function readCachedObject<C = any>(
  client: ApolloClient<C>,
  fragment: TypedDocumentNode,
  className: string,
  objectId: string
) {
  return client.readQuery({
    query: fragment,
    variables: {
      id: convertToGlobalId(className, objectId),
    },
  });
}

export function writeCachedObject<C = any, D extends { id: string } = any>(
  client: ApolloClient<C>,
  fragment: TypedDocumentNode,
  objectName: string,
  objectData: D
) {
  return client.writeQuery({
    query: fragment,
    data: {
      [objectName]: objectData,
    },
    variables: {
      id: objectData.id,
    },
  });
}

export function writeCachedProjectView<C = any, D extends { id: string } = any>(
  client: ApolloClient<C>,
  data: D
) {
  return writeCachedObject(client, GetProjectViewDocument, 'projectView', data);
}

export function readCachedProjectView<C = any>(
  client: ApolloClient<C>,
  objectId: string
) {
  const result = readCachedObject(
    client,
    GetProjectViewDocument,
    EClassName.ProjectView,
    objectId
  );
  return result ? (result.projectView as IProjectViewFragment) : undefined;
}

export function writeCachedProjectColumn<
  C = any,
  D extends { id: string } = any
>(client: ApolloClient<C>, data: D) {
  return writeCachedObject(
    client,
    GetProjectColumnDocument,
    'projectColumn',
    data
  );
}

export function readCachedProjectColumn<C = any>(
  client: ApolloClient<C>,
  objectId: string
) {
  const result = readCachedObject(
    client,
    GetProjectColumnDocument,
    EClassName.ProjectColumn,
    objectId
  );
  return result ? (result.projectColumn as IProjectColumnFragment) : undefined;
}

export const memoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: generateFieldPolicies({
        project: EClassName.Project,
        projectView: EClassName.ProjectView,
        projectColumn: EClassName.ProjectColumn,
        projectItem: EClassName.ProjectItem,
      }),
    },
  },
});
