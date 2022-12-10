import classNames from 'classnames';
import { observer } from 'mobx-react';
import Highlighter from 'react-highlight-words';
import TextAreaControl from '../../controls/TextAeraControl';
import type SingleLineTextFieldRenderer from '../SingleLineTextFieldRenderer';
import { ICurrentFieldProps } from '../types';

interface ISingleLineTextFieldProps extends ICurrentFieldProps {
  singleLine?: boolean;
  renderer: SingleLineTextFieldRenderer;
}

function TextField(props: ISingleLineTextFieldProps) {
  const {
    data,
    renderer,
    active,
    editing,
    loading,
    singleLine,
    onCancel,
    onChange,
  } = props;
  const text = (data?.value || '').toString();
  const { searchWords } = renderer.getCommonStore();
  if (editing) {
    return (
      <TextAreaControl
        className="w-full px-3"
        autoFocus
        singleLine={singleLine}
        loading={loading}
        bordered={false}
        defaultValue={text}
        onCancel={onCancel}
        onChange={onChange}
      />
    );
  }

  if (active) {
    return (
      <div
        className={classNames(
          'w-full px-3',
          'py-2 whitespace-normal break-words'
        )}>
        {text.split('\n').map((el, i) => (
          <span key={i} className="whitespace-pre-wrap">
            <Highlighter
              autoEscape
              searchWords={searchWords}
              textToHighlight={el}
            />
            <br />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'w-full px-3',
        'text-ellipsis overflow-hidden whitespace-nowrap'
      )}>
      <Highlighter
        autoEscape
        searchWords={searchWords}
        textToHighlight={text}
      />
    </div>
  );
}

export default observer(TextField);
