import { memo } from 'react';
import { IProjectDataField, IProjectDataRecord } from '../../libs/client/types';
import { useLinkFieldDataQuery } from '../../libs/react-query';
import { checkIfHttpLink } from '../../utils';

interface ILinkWrapperProps {
  children: JSX.Element;
  field: IProjectDataField;
  record: IProjectDataRecord;
}

function LinkWrapper(props: ILinkWrapperProps) {
  const { children, record, field } = props;
  const fieldId = field._id;
  const data = record.data[fieldId];
  const isHttpLink = !!data?.value && checkIfHttpLink(data.value);
  const existing = !!data?.metadata || !!data?.unreached;
  // NOTE: fetch link type field data
  useLinkFieldDataQuery(
    record.project,
    record._id,
    fieldId,
    data?.value,
    isHttpLink && !existing
  );
  return <>{children}</>;
}

export default memo(LinkWrapper);
