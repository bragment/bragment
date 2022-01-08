import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The Any scalar type is used in operations and types that involve any type of value. */
  Any: any;
  /** The Bytes scalar type is used in operations and types that involve base 64 binary data. */
  Bytes: any;
  /** The Date scalar type is used in operations and types that involve dates. */
  Date: any;
  /** The File scalar type is used in operations and types that involve files. */
  File: any;
  /** The Object scalar type is used in operations and types that involve objects. */
  Object: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Current access control list of the current object. */
export type Acl = {
  __typename?: 'ACL';
  /** Public access control list. */
  public?: Maybe<PublicAcl>;
  /** Access control list for roles. */
  roles?: Maybe<Array<RoleAcl>>;
  /** Access control list for users. */
  users?: Maybe<Array<UserAcl>>;
};

/** Allow to manage access rights. If not provided object will be publicly readable and writable */
export type AclInput = {
  /** Public access control list. */
  public?: InputMaybe<PublicAclInput>;
  /** Access control list for roles. */
  roles?: InputMaybe<Array<RoleAclInput>>;
  /** Access control list for users. */
  users?: InputMaybe<Array<UserAclInput>>;
};

/** Use Inline Fragment on Array to get results: https://graphql.org/learn/queries/#inline-fragments */
export type ArrayResult = Element | Project | Role | Session | User;

/** The ArrayWhereInput input type is used in operations that involve filtering objects by a field of type Array. */
export type ArrayWhereInput = {
  /** This is the containedBy operator to specify a constraint to select the objects where the values of an array field is contained by another specified array. */
  containedBy?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the contains operator to specify a constraint to select the objects where the values of an array field contain all elements of another specified array. */
  contains?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Any']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Any']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Any']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Any']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Any']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The BooleanWhereInput input type is used in operations that involve filtering objects by a field of type Boolean. */
export type BooleanWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The BoxInput type is used to specifiy a box operation on a within geo query. */
export type BoxInput = {
  /** This is the bottom left coordinates of the box. */
  bottomLeft: GeoPointInput;
  /** This is the upper right coordinates of the box. */
  upperRight: GeoPointInput;
};

/** The BytesWhereInput input type is used in operations that involve filtering objects by a field of type Bytes. */
export type BytesWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Bytes']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Bytes']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Bytes']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Bytes']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Bytes']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

export type CallCloudCodeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the function to be called. */
  functionName: CloudCodeFunction;
  /** These are the params to be passed to the function. */
  params?: InputMaybe<Scalars['Object']>;
};

export type CallCloudCodePayload = {
  __typename?: 'CallCloudCodePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the result value of the cloud code function execution. */
  result?: Maybe<Scalars['Any']>;
};

/** The CenterSphereInput type is used to specifiy a centerSphere operation on a geoWithin query. */
export type CenterSphereInput = {
  /** This is the center of the sphere. */
  center: GeoPointInput;
  /** This is the radius of the sphere. */
  distance: Scalars['Float'];
};

/** The Class type is used to return the information about an object class. */
export type Class = {
  __typename?: 'Class';
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields: Array<SchemaField>;
};

/** The CloudCodeFunction enum type contains a list of all available cloud code functions. */
export enum CloudCodeFunction {
  CreateProject = 'createProject'
}

export type CreateClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields?: InputMaybe<SchemaFieldsInput>;
};

export type CreateClassPayload = {
  __typename?: 'CreateClassPayload';
  /** This is the created class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateFileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the new file to be created and uploaded. */
  upload: Scalars['Upload'];
};

export type CreateFilePayload = {
  __typename?: 'CreateFilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created file info. */
  fileInfo: FileInfo;
};

/** The CreateProjectFieldsInput input type is used in operations that involve creation of objects in the Project class. */
export type CreateProjectFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object color. */
  color?: InputMaybe<Scalars['String']>;
  /** This is the object creator. */
  creator?: InputMaybe<UserPointerInput>;
  /** This is the object description. */
  description?: InputMaybe<Scalars['String']>;
  /** This is the object image. */
  image?: InputMaybe<Scalars['String']>;
  /** This is the object owner. */
  owner?: InputMaybe<UserPointerInput>;
  /** This is the object title. */
  title?: InputMaybe<Scalars['String']>;
  /** This is the object visibility. */
  visibility?: InputMaybe<Scalars['String']>;
};

export type CreateProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<CreateProjectFieldsInput>;
};

export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  project: Project;
};

/** The CreateRoleFieldsInput input type is used in operations that involve creation of objects in the Role class. */
export type CreateRoleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationInput>;
};

export type CreateRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateRoleFieldsInput>;
};

export type CreateRolePayload = {
  __typename?: 'CreateRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  role: Role;
};

/** The CreateSessionFieldsInput input type is used in operations that involve creation of objects in the Session class. */
export type CreateSessionFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<Scalars['Date']>;
  /** This is the object installationId. */
  installationId?: InputMaybe<Scalars['String']>;
  /** This is the object restricted. */
  restricted?: InputMaybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<Scalars['String']>;
  /** This is the object user. */
  user?: InputMaybe<UserPointerInput>;
};

export type CreateSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateSessionFieldsInput>;
};

export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  session: Session;
};

/** The CreateUserFieldsInput input type is used in operations that involve creation of objects in the User class. */
export type CreateUserFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object authData. */
  authData?: InputMaybe<Scalars['Object']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  /** This is the object password. */
  password: Scalars['String'];
  /** This is the object username. */
  username: Scalars['String'];
};

export type CreateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to create the new object. */
  fields?: InputMaybe<CreateUserFieldsInput>;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the created object. */
  user: User;
};

/** The DateWhereInput input type is used in operations that involve filtering objects by a field of type Date. */
export type DateWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Date']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Date']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Date']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Date']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

export type DeleteClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
};

export type DeleteClassPayload = {
  __typename?: 'DeleteClassPayload';
  /** This is the deleted class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  role: Role;
};

export type DeleteSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  session: Session;
};

export type DeleteUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the deleted object. */
  user: User;
};

/** The Element object type is used to return array items' value. */
export type Element = {
  __typename?: 'Element';
  /** Return the value of the element in the array */
  value: Scalars['Any'];
};

/** The FileInfo object type is used to return the information about files. */
export type FileInfo = {
  __typename?: 'FileInfo';
  /** This is the file name. */
  name: Scalars['String'];
  /** This is the url in which the file can be downloaded. */
  url: Scalars['String'];
};

export type FileInput = {
  /** A File Scalar can be an url or a FileInfo object. If this field is set to null the file will be unlinked. */
  file?: InputMaybe<Scalars['File']>;
  /** Use this field if you want to unlink the file (the file will not be deleted on cloud storage) */
  unlink?: InputMaybe<Scalars['Boolean']>;
  /** Use this field if you want to create a new file. */
  upload?: InputMaybe<Scalars['Upload']>;
};

/** The FileWhereInput input type is used in operations that involve filtering objects by a field of type File. */
export type FileWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['File']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['File']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['File']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['File']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the matchesRegex operator to specify a constraint to select the objects where the value of a field matches a specified regular expression. */
  matchesRegex?: InputMaybe<Scalars['String']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['File']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['File']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
  /** This is the options operator to specify optional flags (such as "i" and "m") to be added to a matchesRegex operation in the same set of constraints. */
  options?: InputMaybe<Scalars['String']>;
};

/** The GeoIntersectsInput type is used to specify a geoIntersects operation on a constraint. */
export type GeoIntersectsInput = {
  /** This is the point to be specified. */
  point?: InputMaybe<GeoPointInput>;
};

/** The GeoPoint object type is used to return the information about geo point fields. */
export type GeoPoint = {
  __typename?: 'GeoPoint';
  /** This is the latitude. */
  latitude: Scalars['Float'];
  /** This is the longitude. */
  longitude: Scalars['Float'];
};

/** The GeoPointInput type is used in operations that involve inputting fields of type geo point. */
export type GeoPointInput = {
  /** This is the latitude. */
  latitude: Scalars['Float'];
  /** This is the longitude. */
  longitude: Scalars['Float'];
};

/** The GeoPointWhereInput input type is used in operations that involve filtering objects by a field of type GeoPoint. */
export type GeoPointWhereInput = {
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the geoWithin operator to specify a constraint to select the objects where the values of a geo point field is within a specified polygon or sphere. */
  geoWithin?: InputMaybe<GeoWithinInput>;
  /** This is the maxDistance operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in radians) from the geo point specified in the $nearSphere operator. */
  maxDistance?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInKilometers operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in kilometers) from the geo point specified in the $nearSphere operator. */
  maxDistanceInKilometers?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInMiles operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in miles) from the geo point specified in the $nearSphere operator. */
  maxDistanceInMiles?: InputMaybe<Scalars['Float']>;
  /** This is the maxDistanceInRadians operator to specify a constraint to select the objects where the values of a geo point field is at a max distance (in radians) from the geo point specified in the $nearSphere operator. */
  maxDistanceInRadians?: InputMaybe<Scalars['Float']>;
  /** This is the nearSphere operator to specify a constraint to select the objects where the values of a geo point field is near to another geo point. */
  nearSphere?: InputMaybe<GeoPointInput>;
  /** This is the within operator to specify a constraint to select the objects where the values of a geo point field is within a specified box. */
  within?: InputMaybe<WithinInput>;
};

/** The GeoWithinInput type is used to specify a geoWithin operation on a constraint. */
export type GeoWithinInput = {
  /** This is the sphere to be specified. */
  centerSphere?: InputMaybe<CenterSphereInput>;
  /** This is the polygon to be specified. */
  polygon?: InputMaybe<Array<GeoPointInput>>;
};

/** The IdWhereInput input type is used in operations that involve filtering objects by an id. */
export type IdWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['ID']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['ID']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['ID']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['ID']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** An entry from an object, i.e., a pair of key and value. */
export type KeyValueInput = {
  /** The key used to retrieve the value of this entry. */
  key: Scalars['String'];
  /** The value of the entry. Could be any type of scalar data. */
  value: Scalars['Any'];
};

export type LogInInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the password used to log in the user. */
  password: Scalars['String'];
  /** This is the username used to log in the user. */
  username: Scalars['String'];
};

export type LogInPayload = {
  __typename?: 'LogInPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the existing user that was logged in and returned as a viewer. */
  viewer: Viewer;
};

export type LogInWithInput = {
  authData: Scalars['Object'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<UserLoginWithInput>;
};

export type LogInWithPayload = {
  __typename?: 'LogInWithPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the new user that was created, signed up and returned as a viewer. */
  viewer: Viewer;
};

export type LogOutInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type LogOutPayload = {
  __typename?: 'LogOutPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** Mutation is the top level type for mutations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** The callCloudCode mutation can be used to invoke a cloud code function. */
  callCloudCode?: Maybe<CallCloudCodePayload>;
  /** The createClass mutation can be used to create the schema for a new object class. */
  createClass?: Maybe<CreateClassPayload>;
  /** The createFile mutation can be used to create and upload a new file. */
  createFile?: Maybe<CreateFilePayload>;
  createProject?: Maybe<CreateProjectPayload>;
  /** The createRole mutation can be used to create a new object of the Role class. */
  createRole?: Maybe<CreateRolePayload>;
  /** The createSession mutation can be used to create a new object of the Session class. */
  createSession?: Maybe<CreateSessionPayload>;
  /** The createUser mutation can be used to create a new object of the User class. */
  createUser?: Maybe<CreateUserPayload>;
  /** The deleteClass mutation can be used to delete an existing object class. */
  deleteClass?: Maybe<DeleteClassPayload>;
  /** The deleteRole mutation can be used to delete an object of the Role class. */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** The deleteSession mutation can be used to delete an object of the Session class. */
  deleteSession?: Maybe<DeleteSessionPayload>;
  /** The deleteUser mutation can be used to delete an object of the User class. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** The logIn mutation can be used to log in an existing user. */
  logIn?: Maybe<LogInPayload>;
  /** The logInWith mutation can be used to signup, login user with 3rd party authentication system. This mutation create a user if the authData do not correspond to an existing one. */
  logInWith?: Maybe<LogInWithPayload>;
  /** The logOut mutation can be used to log out an existing user. */
  logOut?: Maybe<LogOutPayload>;
  /** The resetPassword mutation can be used to reset the password of an existing user. */
  resetPassword?: Maybe<ResetPasswordPayload>;
  /** The sendVerificationEmail mutation can be used to send the verification email again. */
  sendVerificationEmail?: Maybe<SendVerificationEmailPayload>;
  /** The signUp mutation can be used to create and sign up a new user. */
  signUp?: Maybe<SignUpPayload>;
  /** The updateClass mutation can be used to update the schema for an existing object class. */
  updateClass?: Maybe<UpdateClassPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  /** The updateRole mutation can be used to update an object of the Role class. */
  updateRole?: Maybe<UpdateRolePayload>;
  /** The updateSession mutation can be used to update an object of the Session class. */
  updateSession?: Maybe<UpdateSessionPayload>;
  /** The updateUser mutation can be used to update an object of the User class. */
  updateUser?: Maybe<UpdateUserPayload>;
};


/** Mutation is the top level type for mutations. */
export type MutationCallCloudCodeArgs = {
  input: CallCloudCodeInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateFileArgs = {
  input: CreateFileInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteClassArgs = {
  input: DeleteClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteSessionArgs = {
  input: DeleteSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogInArgs = {
  input: LogInInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogInWithArgs = {
  input: LogInWithInput;
};


/** Mutation is the top level type for mutations. */
export type MutationLogOutArgs = {
  input: LogOutInput;
};


/** Mutation is the top level type for mutations. */
export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


/** Mutation is the top level type for mutations. */
export type MutationSendVerificationEmailArgs = {
  input: SendVerificationEmailInput;
};


/** Mutation is the top level type for mutations. */
export type MutationSignUpArgs = {
  input: SignUpInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};


/** Mutation is the top level type for mutations. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** The NumberWhereInput input type is used in operations that involve filtering objects by a field of type Number. */
export type NumberWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['Float']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['Float']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['Float']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['Float']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** The ObjectWhereInput input type is used in operations that involve filtering result by a field of type Object. */
export type ObjectWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<KeyValueInput>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<KeyValueInput>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<KeyValueInput>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<KeyValueInput>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<KeyValueInput>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** The ParseObject interface type is used as a base type for the auto generated object types. */
export type ParseObject = {
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
};

/** The PointerFieldInput is used to specify a field of type pointer for an object class schema. */
export type PointerFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The PolygonWhereInput input type is used in operations that involve filtering objects by a field of type Polygon. */
export type PolygonWhereInput = {
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the geoIntersects operator to specify a constraint to select the objects where the values of a polygon field intersect a specified point. */
  geoIntersects?: InputMaybe<GeoIntersectsInput>;
};

/** The Project object type is used in operations that involve outputting objects of Project class. */
export type Project = Node & ParseObject & {
  __typename?: 'Project';
  ACL: Acl;
  /** This is the object color. */
  color?: Maybe<Scalars['String']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object creator. */
  creator?: Maybe<User>;
  /** This is the object description. */
  description?: Maybe<Scalars['String']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object image. */
  image?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object owner. */
  owner?: Maybe<User>;
  /** This is the object title. */
  title?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object visibility. */
  visibility?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Project>;
};

/** The ProjectOrder input type is used when sorting objects of the Project class. */
export enum ProjectOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  ColorAsc = 'color_ASC',
  ColorDesc = 'color_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatorAsc = 'creator_ASC',
  CreatorDesc = 'creator_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ImageAsc = 'image_ASC',
  ImageDesc = 'image_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  OwnerAsc = 'owner_ASC',
  OwnerDesc = 'owner_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VisibilityAsc = 'visibility_ASC',
  VisibilityDesc = 'visibility_DESC'
}

/** Allow to link OR add and link an object of the Project class. */
export type ProjectPointerInput = {
  /** Link an existing object from Project class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Project class into a relation field. */
export type ProjectRelationInput = {
  /** Add existing objects from the Project class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Remove existing objects from the Project class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The ProjectRelationWhereInput input type is used in operations that involve filtering objects of Project class. */
export type ProjectRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<ProjectWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<ProjectWhereInput>;
};

export enum ProjectVisibility {
  Private = 'PRIVATE',
  Protected = 'PROTECTED',
  Public = 'PUBLIC'
}

/** The ProjectWhereInput input type is used in operations that involve filtering objects of Project class. */
export type ProjectWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<ProjectWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  /** This is the object color. */
  color?: InputMaybe<StringWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object creator. */
  creator?: InputMaybe<UserRelationWhereInput>;
  /** This is the object description. */
  description?: InputMaybe<StringWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object image. */
  image?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object owner. */
  owner?: InputMaybe<UserRelationWhereInput>;
  /** This is the object title. */
  title?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object visibility. */
  visibility?: InputMaybe<StringWhereInput>;
};

/** Allow to manage public rights. */
export type PublicAcl = {
  __typename?: 'PublicACL';
  /** Allow anyone to read the current object. */
  read?: Maybe<Scalars['Boolean']>;
  /** Allow anyone to write on the current object. */
  write?: Maybe<Scalars['Boolean']>;
};

/** Allow to manage public rights. */
export type PublicAclInput = {
  /** Allow anyone to read the current object. */
  read: Scalars['Boolean'];
  /** Allow anyone to write on the current object. */
  write: Scalars['Boolean'];
};

/** Query is the top level type for queries. */
export type Query = {
  __typename?: 'Query';
  /** The class query can be used to retrieve an existing object class. */
  class: Class;
  /** The classes query can be used to retrieve the existing object classes. */
  classes: Array<Class>;
  /** The health query can be used to check if the server is up and running. */
  health: Scalars['Boolean'];
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** The project query can be used to get an object of the Project class by its id. */
  project: Project;
  /** The projects query can be used to find objects of the Project class. */
  projects: ProjectConnection;
  /** The role query can be used to get an object of the Role class by its id. */
  role: Role;
  /** The roles query can be used to find objects of the Role class. */
  roles: RoleConnection;
  /** The session query can be used to get an object of the Session class by its id. */
  session: Session;
  /** The sessions query can be used to find objects of the Session class. */
  sessions: SessionConnection;
  /** The user query can be used to get an object of the User class by its id. */
  user: User;
  /** The users query can be used to find objects of the User class. */
  users: UserConnection;
  /** The viewer query can be used to return the current user data. */
  viewer: Viewer;
};


/** Query is the top level type for queries. */
export type QueryClassArgs = {
  name: Scalars['String'];
};


/** Query is the top level type for queries. */
export type QueryNodeArgs = {
  id: Scalars['ID'];
};


/** Query is the top level type for queries. */
export type QueryProjectArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<ProjectOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryRoleArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<RoleOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleWhereInput>;
};


/** Query is the top level type for queries. */
export type QuerySessionArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QuerySessionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<SessionOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SessionWhereInput>;
};


/** Query is the top level type for queries. */
export type QueryUserArgs = {
  id: Scalars['ID'];
  options?: InputMaybe<ReadOptionsInput>;
};


/** Query is the top level type for queries. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<UserOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

/** The ReadOptionsInputt type is used in queries in order to set the read preferences. */
export type ReadOptionsInput = {
  /** The read preference for the queries to be executed to include fields. */
  includeReadPreference?: InputMaybe<ReadPreference>;
  /** The read preference for the main query to be executed. */
  readPreference?: InputMaybe<ReadPreference>;
  /** The read preference for the subqueries that may be required. */
  subqueryReadPreference?: InputMaybe<ReadPreference>;
};

/** The ReadPreference enum type is used in queries in order to select in which database replica the operation must run. */
export enum ReadPreference {
  Nearest = 'NEAREST',
  Primary = 'PRIMARY',
  PrimaryPreferred = 'PRIMARY_PREFERRED',
  Secondary = 'SECONDARY',
  SecondaryPreferred = 'SECONDARY_PREFERRED'
}

/** The RelationFieldInput is used to specify a field of type relation for an object class schema. */
export type RelationFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

export type ResetPasswordInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** The Role object type is used in operations that involve outputting objects of Role class. */
export type Role = Node & ParseObject & {
  __typename?: 'Role';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object name. */
  name?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object roles. */
  roles: RoleConnection;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object users. */
  users: UserConnection;
};


/** The Role object type is used in operations that involve outputting objects of Role class. */
export type RoleRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<RoleOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoleWhereInput>;
};


/** The Role object type is used in operations that involve outputting objects of Role class. */
export type RoleUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<ReadOptionsInput>;
  order?: InputMaybe<Array<UserOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

/** Allow to manage roles in ACL. If read and write are null the role have read and write rights. */
export type RoleAcl = {
  __typename?: 'RoleACL';
  /** Allow users who are members of the role to read the current object. */
  read: Scalars['Boolean'];
  /** Name of the targetted Role. */
  roleName: Scalars['ID'];
  /** Allow users who are members of the role to write on the current object. */
  write: Scalars['Boolean'];
};

/** Allow to manage roles in ACL. */
export type RoleAclInput = {
  /** Allow users who are members of the role to read the current object. */
  read: Scalars['Boolean'];
  /** Name of the targetted Role. */
  roleName: Scalars['String'];
  /** Allow users who are members of the role to write on the current object. */
  write: Scalars['Boolean'];
};

/** A connection to a list of items. */
export type RoleConnection = {
  __typename?: 'RoleConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RoleEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RoleEdge = {
  __typename?: 'RoleEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Role>;
};

/** The RoleOrder input type is used when sorting objects of the Role class. */
export enum RoleOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  RolesAsc = 'roles_ASC',
  RolesDesc = 'roles_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UsersAsc = 'users_ASC',
  UsersDesc = 'users_DESC'
}

/** Allow to link OR add and link an object of the Role class. */
export type RolePointerInput = {
  /** Create and link an object from Role class. */
  createAndLink?: InputMaybe<CreateRoleFieldsInput>;
  /** Link an existing object from Role class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Role class into a relation field. */
export type RoleRelationInput = {
  /** Add existing objects from the Role class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Role class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateRoleFieldsInput>>;
  /** Remove existing objects from the Role class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The RoleRelationWhereInput input type is used in operations that involve filtering objects of Role class. */
export type RoleRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<RoleWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<RoleWhereInput>;
};

/** The RoleWhereInput input type is used in operations that involve filtering objects of Role class. */
export type RoleWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<RoleWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object name. */
  name?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationWhereInput>;
};

/** The SchemaACLField is used to return information of an ACL field. */
export type SchemaAclField = SchemaField & {
  __typename?: 'SchemaACLField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaArrayField is used to return information of an Array field. */
export type SchemaArrayField = SchemaField & {
  __typename?: 'SchemaArrayField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaArrayFieldInput is used to specify a field of type array for an object class schema. */
export type SchemaArrayFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBooleanField is used to return information of a Boolean field. */
export type SchemaBooleanField = SchemaField & {
  __typename?: 'SchemaBooleanField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBooleanFieldInput is used to specify a field of type boolean for an object class schema. */
export type SchemaBooleanFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBytesField is used to return information of a Bytes field. */
export type SchemaBytesField = SchemaField & {
  __typename?: 'SchemaBytesField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaBytesFieldInput is used to specify a field of type bytes for an object class schema. */
export type SchemaBytesFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaDateField is used to return information of a Date field. */
export type SchemaDateField = SchemaField & {
  __typename?: 'SchemaDateField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaDateFieldInput is used to specify a field of type date for an object class schema. */
export type SchemaDateFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaField interface type is used as a base type for the different supported fields of an object class schema. */
export type SchemaField = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaFieldInput is used to specify a field of an object class schema. */
export type SchemaFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The CreateClassSchemaInput type is used to specify the schema for a new object class to be created. */
export type SchemaFieldsInput = {
  /** These are the Array fields to be added to the class schema. */
  addArrays?: InputMaybe<Array<SchemaArrayFieldInput>>;
  /** These are the Boolean fields to be added to the class schema. */
  addBooleans?: InputMaybe<Array<SchemaBooleanFieldInput>>;
  /** These are the Bytes fields to be added to the class schema. */
  addBytes?: InputMaybe<Array<SchemaBytesFieldInput>>;
  /** These are the Date fields to be added to the class schema. */
  addDates?: InputMaybe<Array<SchemaDateFieldInput>>;
  /** These are the File fields to be added to the class schema. */
  addFiles?: InputMaybe<Array<SchemaFileFieldInput>>;
  /** This is the Geo Point field to be added to the class schema. Currently it is supported only one GeoPoint field per Class. */
  addGeoPoint?: InputMaybe<SchemaGeoPointFieldInput>;
  /** These are the Number fields to be added to the class schema. */
  addNumbers?: InputMaybe<Array<SchemaNumberFieldInput>>;
  /** These are the Object fields to be added to the class schema. */
  addObjects?: InputMaybe<Array<SchemaObjectFieldInput>>;
  /** These are the Pointer fields to be added to the class schema. */
  addPointers?: InputMaybe<Array<PointerFieldInput>>;
  /** These are the Polygon fields to be added to the class schema. */
  addPolygons?: InputMaybe<Array<SchemaPolygonFieldInput>>;
  /** These are the Relation fields to be added to the class schema. */
  addRelations?: InputMaybe<Array<RelationFieldInput>>;
  /** These are the String fields to be added to the class schema. */
  addStrings?: InputMaybe<Array<SchemaStringFieldInput>>;
  /** These are the fields to be removed from the class schema. */
  remove?: InputMaybe<Array<SchemaFieldInput>>;
};

/** The SchemaFileField is used to return information of a File field. */
export type SchemaFileField = SchemaField & {
  __typename?: 'SchemaFileField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaFileFieldInput is used to specify a field of type file for an object class schema. */
export type SchemaFileFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaGeoPointField is used to return information of a Geo Point field. */
export type SchemaGeoPointField = SchemaField & {
  __typename?: 'SchemaGeoPointField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaGeoPointFieldInput is used to specify a field of type geo point for an object class schema. */
export type SchemaGeoPointFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaNumberField is used to return information of a Number field. */
export type SchemaNumberField = SchemaField & {
  __typename?: 'SchemaNumberField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaNumberFieldInput is used to specify a field of type number for an object class schema. */
export type SchemaNumberFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaObjectField is used to return information of an Object field. */
export type SchemaObjectField = SchemaField & {
  __typename?: 'SchemaObjectField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaObjectFieldInput is used to specify a field of type object for an object class schema. */
export type SchemaObjectFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaPointerField is used to return information of a Pointer field. */
export type SchemaPointerField = SchemaField & {
  __typename?: 'SchemaPointerField';
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The SchemaPolygonField is used to return information of a Polygon field. */
export type SchemaPolygonField = SchemaField & {
  __typename?: 'SchemaPolygonField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaPolygonFieldInput is used to specify a field of type polygon for an object class schema. */
export type SchemaPolygonFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaRelationField is used to return information of a Relation field. */
export type SchemaRelationField = SchemaField & {
  __typename?: 'SchemaRelationField';
  /** This is the field name. */
  name: Scalars['String'];
  /** This is the name of the target class for the field. */
  targetClassName: Scalars['String'];
};

/** The SchemaStringField is used to return information of a String field. */
export type SchemaStringField = SchemaField & {
  __typename?: 'SchemaStringField';
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SchemaStringFieldInput is used to specify a field of type string for an object class schema. */
export type SchemaStringFieldInput = {
  /** This is the field name. */
  name: Scalars['String'];
};

/** The SearchInput type is used to specifiy a search operation on a full text search. */
export type SearchInput = {
  /** This is the flag to enable or disable case sensitive search. */
  caseSensitive?: InputMaybe<Scalars['Boolean']>;
  /** This is the flag to enable or disable diacritic sensitive search. */
  diacriticSensitive?: InputMaybe<Scalars['Boolean']>;
  /** This is the language to tetermine the list of stop words and the rules for tokenizer. */
  language?: InputMaybe<Scalars['String']>;
  /** This is the term to be searched. */
  term: Scalars['String'];
};

/** The SelectInput type is used to specify an inQueryKey or a notInQueryKey operation on a constraint. */
export type SelectInput = {
  /** This is the key in the result of the subquery that must match (not match) the field. */
  key: Scalars['String'];
  /** This is the subquery to be executed. */
  query: SubqueryInput;
};

export type SendVerificationEmailInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type SendVerificationEmailPayload = {
  __typename?: 'SendVerificationEmailPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** It's always true. */
  ok: Scalars['Boolean'];
};

/** The Session object type is used in operations that involve outputting objects of Session class. */
export type Session = Node & ParseObject & {
  __typename?: 'Session';
  ACL: Acl;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object createdWith. */
  createdWith?: Maybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: Maybe<Scalars['Date']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object installationId. */
  installationId?: Maybe<Scalars['String']>;
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the object restricted. */
  restricted?: Maybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: Maybe<Scalars['String']>;
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object user. */
  user?: Maybe<User>;
};

/** A connection to a list of items. */
export type SessionConnection = {
  __typename?: 'SessionConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SessionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SessionEdge = {
  __typename?: 'SessionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Session>;
};

/** The SessionOrder input type is used when sorting objects of the Session class. */
export enum SessionOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedWithAsc = 'createdWith_ASC',
  CreatedWithDesc = 'createdWith_DESC',
  ExpiresAtAsc = 'expiresAt_ASC',
  ExpiresAtDesc = 'expiresAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InstallationIdAsc = 'installationId_ASC',
  InstallationIdDesc = 'installationId_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  RestrictedAsc = 'restricted_ASC',
  RestrictedDesc = 'restricted_DESC',
  SessionTokenAsc = 'sessionToken_ASC',
  SessionTokenDesc = 'sessionToken_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UserAsc = 'user_ASC',
  UserDesc = 'user_DESC'
}

/** Allow to link OR add and link an object of the Session class. */
export type SessionPointerInput = {
  /** Create and link an object from Session class. */
  createAndLink?: InputMaybe<CreateSessionFieldsInput>;
  /** Link an existing object from Session class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the Session class into a relation field. */
export type SessionRelationInput = {
  /** Add existing objects from the Session class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the Session class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateSessionFieldsInput>>;
  /** Remove existing objects from the Session class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The SessionRelationWhereInput input type is used in operations that involve filtering objects of Session class. */
export type SessionRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<SessionWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<SessionWhereInput>;
};

/** The SessionWhereInput input type is used in operations that involve filtering objects of Session class. */
export type SessionWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<SessionWhereInput>>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<ObjectWhereInput>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<DateWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object installationId. */
  installationId?: InputMaybe<StringWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object restricted. */
  restricted?: InputMaybe<BooleanWhereInput>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object user. */
  user?: InputMaybe<UserRelationWhereInput>;
};

export type SignUpInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<CreateUserFieldsInput>;
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the new user that was created, signed up and returned as a viewer. */
  viewer: Viewer;
};

/** The StringWhereInput input type is used in operations that involve filtering objects by a field of type String. */
export type StringWhereInput = {
  /** This is the equalTo operator to specify a constraint to select the objects where the value of a field equals to a specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** This is the exists operator to specify a constraint to select the objects where a field exists (or do not exist). */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** This is the greaterThan operator to specify a constraint to select the objects where the value of a field is greater than a specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** This is the greaterThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is greater than or equal to a specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the in operator to specify a constraint to select the objects where the value of a field equals any value in the specified array. */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** This is the inQueryKey operator to specify a constraint to select the objects where a field equals to a key in the result of a different query. */
  inQueryKey?: InputMaybe<SelectInput>;
  /** This is the lessThan operator to specify a constraint to select the objects where the value of a field is less than a specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** This is the lessThanOrEqualTo operator to specify a constraint to select the objects where the value of a field is less than or equal to a specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the matchesRegex operator to specify a constraint to select the objects where the value of a field matches a specified regular expression. */
  matchesRegex?: InputMaybe<Scalars['String']>;
  /** This is the notEqualTo operator to specify a constraint to select the objects where the value of a field do not equal to a specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** This is the notIn operator to specify a constraint to select the objects where the value of a field do not equal any value in the specified array. */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** This is the notInQueryKey operator to specify a constraint to select the objects where a field do not equal to a key in the result of a different query. */
  notInQueryKey?: InputMaybe<SelectInput>;
  /** This is the options operator to specify optional flags (such as "i" and "m") to be added to a matchesRegex operation in the same set of constraints. */
  options?: InputMaybe<Scalars['String']>;
  /** This is the $text operator to specify a full text search constraint. */
  text?: InputMaybe<TextInput>;
};

/** The SubqueryInput type is used to specify a sub query to another class. */
export type SubqueryInput = {
  /** This is the class name of the object. */
  className: Scalars['String'];
  /** These are the conditions that the objects need to match in order to be found */
  where: Scalars['Object'];
};

/** The TextInput type is used to specify a text operation on a constraint. */
export type TextInput = {
  /** This is the search to be executed. */
  search: SearchInput;
};

export type UpdateClassInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** This is the name of the object class. */
  name: Scalars['String'];
  /** These are the schema's fields of the object class. */
  schemaFields?: InputMaybe<SchemaFieldsInput>;
};

export type UpdateClassPayload = {
  __typename?: 'UpdateClassPayload';
  /** This is the updated class. */
  class: Class;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The UpdateProjectFieldsInput input type is used in operations that involve creation of objects in the Project class. */
export type UpdateProjectFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object color. */
  color?: InputMaybe<Scalars['String']>;
  /** This is the object creator. */
  creator?: InputMaybe<UserPointerInput>;
  /** This is the object description. */
  description?: InputMaybe<Scalars['String']>;
  /** This is the object image. */
  image?: InputMaybe<Scalars['String']>;
  /** This is the object owner. */
  owner?: InputMaybe<UserPointerInput>;
  /** This is the object title. */
  title?: InputMaybe<Scalars['String']>;
  /** This is the object visibility. */
  visibility?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<UpdateProjectFieldsInput>;
  id: Scalars['ID'];
};

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  project: Project;
};

/** The UpdateRoleFieldsInput input type is used in operations that involve creation of objects in the Role class. */
export type UpdateRoleFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object name. */
  name?: InputMaybe<Scalars['String']>;
  /** This is the object roles. */
  roles?: InputMaybe<RoleRelationInput>;
  /** This is the object users. */
  users?: InputMaybe<UserRelationInput>;
};

export type UpdateRoleInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateRoleFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateRolePayload = {
  __typename?: 'UpdateRolePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  role: Role;
};

/** The UpdateSessionFieldsInput input type is used in operations that involve creation of objects in the Session class. */
export type UpdateSessionFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object createdWith. */
  createdWith?: InputMaybe<Scalars['Object']>;
  /** This is the object expiresAt. */
  expiresAt?: InputMaybe<Scalars['Date']>;
  /** This is the object installationId. */
  installationId?: InputMaybe<Scalars['String']>;
  /** This is the object restricted. */
  restricted?: InputMaybe<Scalars['Boolean']>;
  /** This is the object sessionToken. */
  sessionToken?: InputMaybe<Scalars['String']>;
  /** This is the object user. */
  user?: InputMaybe<UserPointerInput>;
};

export type UpdateSessionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateSessionFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateSessionPayload = {
  __typename?: 'UpdateSessionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  session: Session;
};

/** The UpdateUserFieldsInput input type is used in operations that involve creation of objects in the User class. */
export type UpdateUserFieldsInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object authData. */
  authData?: InputMaybe<Scalars['Object']>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
  /** This is the object password. */
  password?: InputMaybe<Scalars['String']>;
  /** This is the object username. */
  username?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** These are the fields that will be used to update the object. */
  fields?: InputMaybe<UpdateUserFieldsInput>;
  /** This is the object id. You can use either the global or the object id. */
  id: Scalars['ID'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  /** This is the updated object. */
  user: User;
};

/** The User object type is used in operations that involve outputting objects of User class. */
export type User = Node & ParseObject & {
  __typename?: 'User';
  ACL: Acl;
  /** This is the object authData. */
  authData?: Maybe<Scalars['Object']>;
  /** This is the date in which the object was created. */
  createdAt: Scalars['Date'];
  /** This is the object email. */
  email?: Maybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: Maybe<Scalars['Boolean']>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** This is the object id. */
  objectId: Scalars['ID'];
  /** This is the date in which the object was las updated. */
  updatedAt: Scalars['Date'];
  /** This is the object username. */
  username?: Maybe<Scalars['String']>;
};

/** Allow to manage users in ACL. If read and write are null the users have read and write rights. */
export type UserAcl = {
  __typename?: 'UserACL';
  /** Allow the user to read the current object. */
  read: Scalars['Boolean'];
  /** ID of the targetted User. */
  userId: Scalars['ID'];
  /** Allow the user to write on the current object. */
  write: Scalars['Boolean'];
};

/** Allow to manage users in ACL. */
export type UserAclInput = {
  /** Allow the user to read the current object. */
  read: Scalars['Boolean'];
  /** ID of the targetted User. */
  userId: Scalars['ID'];
  /** Allow the user to write on the current object. */
  write: Scalars['Boolean'];
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** This is the total matched objecs count that is returned when the count flag is set. */
  count: Scalars['Int'];
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<User>;
};

export type UserLoginWithInput = {
  ACL?: InputMaybe<AclInput>;
  /** This is the object email. */
  email?: InputMaybe<Scalars['String']>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<Scalars['Boolean']>;
};

/** The UserOrder input type is used when sorting objects of the User class. */
export enum UserOrder {
  AclAsc = 'ACL_ASC',
  AclDesc = 'ACL_DESC',
  AuthDataAsc = 'authData_ASC',
  AuthDataDesc = 'authData_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailVerifiedAsc = 'emailVerified_ASC',
  EmailVerifiedDesc = 'emailVerified_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ObjectIdAsc = 'objectId_ASC',
  ObjectIdDesc = 'objectId_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UsernameAsc = 'username_ASC',
  UsernameDesc = 'username_DESC'
}

/** Allow to link OR add and link an object of the User class. */
export type UserPointerInput = {
  /** Create and link an object from User class. */
  createAndLink?: InputMaybe<CreateUserFieldsInput>;
  /** Link an existing object from User class. You can use either the global or the object id. */
  link?: InputMaybe<Scalars['ID']>;
};

/** Allow to add, remove, createAndAdd objects of the User class into a relation field. */
export type UserRelationInput = {
  /** Add existing objects from the User class into the relation. You can use either the global or the object ids. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Create and add objects of the User class into the relation. */
  createAndAdd?: InputMaybe<Array<CreateUserFieldsInput>>;
  /** Remove existing objects from the User class out of the relation. You can use either the global or the object ids. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The UserRelationWhereInput input type is used in operations that involve filtering objects of User class. */
export type UserRelationWhereInput = {
  /** Check if the relation/pointer contains objects. */
  exists?: InputMaybe<Scalars['Boolean']>;
  /** Run a relational/pointer query where at least one child object can match. */
  have?: InputMaybe<UserWhereInput>;
  /** Run an inverted relational/pointer query where at least one child object can match. */
  haveNot?: InputMaybe<UserWhereInput>;
};

/** The UserWhereInput input type is used in operations that involve filtering objects of User class. */
export type UserWhereInput = {
  /** This is the object ACL. */
  ACL?: InputMaybe<ObjectWhereInput>;
  /** This is the AND operator to compound constraints. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** This is the NOR operator to compound constraints. */
  NOR?: InputMaybe<Array<UserWhereInput>>;
  /** This is the OR operator to compound constraints. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** This is the object authData. */
  authData?: InputMaybe<ObjectWhereInput>;
  /** This is the object createdAt. */
  createdAt?: InputMaybe<DateWhereInput>;
  /** This is the object email. */
  email?: InputMaybe<StringWhereInput>;
  /** This is the object emailVerified. */
  emailVerified?: InputMaybe<BooleanWhereInput>;
  /** This is the object id. */
  id?: InputMaybe<IdWhereInput>;
  /** This is the object objectId. */
  objectId?: InputMaybe<IdWhereInput>;
  /** This is the object password. */
  password?: InputMaybe<StringWhereInput>;
  /** This is the object updatedAt. */
  updatedAt?: InputMaybe<DateWhereInput>;
  /** This is the object username. */
  username?: InputMaybe<StringWhereInput>;
};

/** The Viewer object type is used in operations that involve outputting the current user data. */
export type Viewer = {
  __typename?: 'Viewer';
  /** The current user session token. */
  sessionToken: Scalars['String'];
  /** This is the current user. */
  user: User;
};

/** The WithinInput type is used to specify a within operation on a constraint. */
export type WithinInput = {
  /** This is the box to be specified. */
  box: BoxInput;
};

export type IProjectFragment = { __typename: 'Project', objectId: string, id: string, title?: string | null | undefined, description?: string | null | undefined, visibility?: string | null | undefined, image?: string | null | undefined, color?: string | null | undefined };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project: { __typename: 'Project', objectId: string, id: string, title?: string | null | undefined, description?: string | null | undefined, visibility?: string | null | undefined, image?: string | null | undefined, color?: string | null | undefined } } | null | undefined };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectQuery = { __typename?: 'Query', project: { __typename: 'Project', objectId: string, id: string, title?: string | null | undefined, description?: string | null | undefined, visibility?: string | null | undefined, image?: string | null | undefined, color?: string | null | undefined } };

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectConnection', count: number, edges?: Array<{ __typename?: 'ProjectEdge', node?: { __typename: 'Project', objectId: string, id: string, title?: string | null | undefined, description?: string | null | undefined, visibility?: string | null | undefined, image?: string | null | undefined, color?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } };

export const IProjectFragmentDoc = gql`
    fragment IProject on Project {
  __typename
  objectId
  id
  title
  description
  visibility
  image
  color
}
    `;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      ...IProject
    }
  }
}
    ${IProjectFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: ID!) {
  project(id: $id) {
    ...IProject
  }
}
    ${IProjectFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetAllProjectsDocument = gql`
    query GetAllProjects {
  projects(order: updatedAt_DESC) {
    count
    edges {
      node {
        ...IProject
      }
    }
  }
}
    ${IProjectFragmentDoc}`;

/**
 * __useGetAllProjectsQuery__
 *
 * To run a query within a React component, call `useGetAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
      }
export function useGetAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProjectsQuery, GetAllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument, options);
        }
export type GetAllProjectsQueryHookResult = ReturnType<typeof useGetAllProjectsQuery>;
export type GetAllProjectsLazyQueryHookResult = ReturnType<typeof useGetAllProjectsLazyQuery>;
export type GetAllProjectsQueryResult = Apollo.QueryResult<GetAllProjectsQuery, GetAllProjectsQueryVariables>;