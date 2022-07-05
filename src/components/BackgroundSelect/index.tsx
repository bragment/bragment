import { CheckOutlined } from '@ant-design/icons';
import { Card as AntCard, Col, Row } from 'antd';
import classNames from 'classnames';
import { memo, MouseEvent as ReactMouseEvent } from 'react';
import styles from './index.module.scss';

export type IBackgroundOption =
  | { type: 'color'; color: string }
  | { type: 'photo'; image: string; color?: string };

export interface IBackgroundSelectProps {
  size?: 'small' | 'large';
  options: IBackgroundOption[];
  current: number;
  onChange: (index: number) => void;
}

function BackgroundSelect(props: IBackgroundSelectProps) {
  const { current, options, size = 'small', onChange } = props;

  const handleClick = (event: ReactMouseEvent) => {
    const { target } = event;
    const div =
      target instanceof Element ? target.closest('.' + styles.option) : null;

    if (
      !(div instanceof HTMLElement) ||
      !div.dataset ||
      div.dataset.index === undefined
    ) {
      return;
    }
    if (onChange) {
      const selected = div.dataset.selected;
      const index = parseInt(div.dataset.index, 10);
      const option = options[index];
      if (selected || index < 0 || !option) {
        onChange(-1);
      } else {
        onChange(index);
      }
    }
  };

  return (
    <div
      className={classNames(styles.wrapper, styles[size])}
      onClick={handleClick}>
      <Row gutter={[12, 12]}>
        {options.map((option, index) => {
          const selected = index === current;
          let key;
          let backgroundColor;
          let backgroundImage;
          if (option.type === 'color') {
            key = option.color;
            backgroundColor = option.color;
          } else {
            key = option.image;
            backgroundColor = option.color;
            backgroundImage = `url(${option.image})`;
          }
          return (
            <Col span={6} key={key}>
              <AntCard
                className={styles.option}
                data-index={index}
                data-selected={selected || undefined}
                bordered={false}
                hoverable={!selected}
                style={{
                  backgroundColor,
                  backgroundImage,
                }}>
                {selected && <CheckOutlined />}
              </AntCard>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default memo(BackgroundSelect);
