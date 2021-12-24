import { PictureOutlined } from '@ant-design/icons';
import { Popover, PopoverProps } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { getMainColor, getMainImageUrl } from '../../api/unsplash/helpers';
import BackgroundSelect from '../../components/BackgroundSelect';
import { useProjectStore } from '../../components/hooks';
import { IBackground, ISelectedStandByBgData } from '../../stores/types';

interface IBackgroundPopoverProps extends PopoverProps {
  onChange?: (bg: IBackground) => void;
}

function BackgroundPopover(props: IBackgroundPopoverProps) {
  const { onChange } = props;
  const {
    standByBgColors,
    standByBgPhotos,
    standByUnsplashPhotos,
    selectedStandByBg,
    selectedStandByBgData,
    setSelectedStandByBgData,
  } = useProjectStore();

  const handleBackgroundChange = (data: ISelectedStandByBgData | null) => {
    setSelectedStandByBgData(data);
  };

  useEffect(() => {
    const bg: IBackground = {};
    if (selectedStandByBgData) {
      const { type, index } = selectedStandByBgData;
      if (type === 'color') {
        bg.color = standByBgColors[index];
      }
      if (type === 'photo') {
        const photo = standByUnsplashPhotos[index];
        bg.image = getMainImageUrl(photo);
        bg.color = getMainColor(photo);
      }
    }
    if (onChange) {
      onChange(bg);
    }
  }, [selectedStandByBgData, standByBgColors, standByUnsplashPhotos, onChange]);

  return (
    <Popover
      prefixCls={props.prefixCls}
      trigger="click"
      content={
        <BackgroundSelect
          colors={standByBgColors}
          photos={standByBgPhotos}
          value={selectedStandByBg}
          onChange={handleBackgroundChange}
        />
      }>
      <PictureOutlined />
    </Popover>
  );
}

export default observer(BackgroundPopover);
