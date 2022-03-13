import { Typography } from 'antd';
import classnames from 'classnames';
import { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { ICardSampleViewProps } from '../types';
import styles from './index.module.scss';

const { Paragraph, Text } = Typography;
function checkIfSingleLine(str: string) {
  return str.indexOf('\n') === -1;
}

function SampleView(props: ICardSampleViewProps) {
  const { title, content } = props.data;
  const isSingleLineTitle = !content && title && checkIfSingleLine(title);
  const isSingleLineContent = !title && content && checkIfSingleLine(content);
  return (
    <Typography className={styles.sampleView}>
      {title && (
        <Paragraph
          className={classnames(isSingleLineTitle && styles.singleLineTitle)}>
          <Text strong>{title}</Text>
        </Paragraph>
      )}
      {content && (
        <ReactMarkdown
          className={classnames(
            styles.content,
            isSingleLineContent && styles.singleLineContent
          )}
          remarkPlugins={[remarkBreaks, remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          children={content}
        />
      )}
    </Typography>
  );
}

export default memo(SampleView);
