import { CheckOutlined } from '@ant-design/icons';
import { Card as AntCard, Col, Row } from 'antd';
import classNames from 'classnames';
import { memo, MouseEvent as ReactMouseEvent } from 'react';
import type {
  IBackground,
  IPhoto,
  ISelectedStandByBgData,
} from '../../stores/types';
import styles from './index.module.scss';

interface IBackgroundSelectProps {
  size?: 'small' | 'large';
  colors: string[];
  photos: IPhoto[];
  value: IBackground;
  onChange: (data: ISelectedStandByBgData | null) => void;
}

function BackgroundSelect(props: IBackgroundSelectProps) {
  const { colors, photos, size = 'small', value, onChange } = props;

  const handleClick = (event: ReactMouseEvent) => {
    const { target } = event;
    const option =
      target instanceof Element ? target.closest('.' + styles.option) : null;

    if (
      !(option instanceof HTMLElement) ||
      !option.dataset ||
      option.dataset.index === undefined
    ) {
      return;
    }
    const type = option.dataset.type;
    const index = parseInt(option.dataset.index, 10);
    if (onChange) {
      const data =
        option.dataset.selected || (type !== 'color' && type !== 'photo')
          ? null
          : { type, index };
      onChange(data);
    }
  };

  const colorOrPhotoList: (string | IPhoto)[] = [...photos, ...colors];

  return (
    <div
      className={classNames(styles.wrapper, styles[size])}
      onClick={handleClick}>
      <Row gutter={[12, 12]}>
        {colorOrPhotoList.map((el, i) => {
          let selected;
          let type;
          let key;
          let backgroundColor;
          let backgroundImage;
          let index;
          if (typeof el === 'string') {
            type = 'color';
            key = el;
            index = i - photos.length;
            selected = value.color === el;
            backgroundColor = el;
          } else {
            type = 'photo';
            key = el.image;
            index = i;
            selected = value.image === el.image;
            backgroundColor = el.color;
            backgroundImage = `url(${el.image})`;
          }
          return (
            <Col span={6} key={key}>
              <AntCard
                className={styles.option}
                data-type={type}
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
