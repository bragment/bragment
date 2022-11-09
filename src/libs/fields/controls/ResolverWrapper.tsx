import { memo } from 'react';
import { checkIfHttpLink } from '../../../utils';
import {
  EDataFieldType,
  IProjectDataField,
  IProjectDataRecord,
} from '../../client/types';
import { useLinkFieldDataQuery } from '../../react-query';

interface IResolverWrapperProps {
  children: JSX.Element;
  relatedField: IProjectDataField;
  relatedRecord: IProjectDataRecord;
}

function ResolverWrapper(props: IResolverWrapperProps) {
  const { children, relatedField, relatedRecord } = props;
  const fieldId = relatedField._id;
  const fieldType = relatedField.asType || relatedField.type;
  const data = relatedRecord.data[fieldId];
  const isHttpLink = !!data?.value && checkIfHttpLink(data.value);
  const existing = !!data?.metadata || !!data?.unreached;
  const enable =
    fieldType === EDataFieldType.HttpLink && isHttpLink && !existing;

  // NOTE: fetch link type field data
  const { isLoading } = useLinkFieldDataQuery(
    relatedRecord.project,
    relatedRecord._id,
    fieldId,
    data?.value,
    enable
  );

  if (enable && isLoading) {
    // TODO: show loading tips
    return <>Loading</>;
  }
  return <>{children}</>;
}

export default memo(ResolverWrapper);
