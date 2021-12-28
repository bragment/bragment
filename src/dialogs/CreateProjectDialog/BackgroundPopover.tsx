import { Popover, PopoverProps } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import {
  getMainColor,
  getMainImageUrl,
  getThumbImageUrl,
} from '../../api/unsplash/helpers';
import BackgroundSelect, {
  IBackgroundOption,
} from '../../components/BackgroundSelect';
import { useProjectStore } from '../../components/hooks';

export interface IBackground {
  image?: string;
  color?: string;
}
export interface IBackgroundPopoverProps extends PopoverProps {
  onChange?: (bg: IBackground) => void;
}

function BackgroundPopover(props: IBackgroundPopoverProps) {
  const { onChange } = props;
  const {
    standByBuiltinColors,
    standByUnsplashPhotos,
    selectedBuiltinColor,
    selectedUnsplashPhoto,
    setSelectedBuiltinColor,
    setSelectedUnsplashPhoto,
  } = useProjectStore();

  const backgroundOptions: IBackgroundOption[] = [];
  standByUnsplashPhotos.forEach((el) => {
    backgroundOptions.push({
      type: 'photo',
      color: getMainColor(el),
      image: getThumbImageUrl(getMainImageUrl(el)),
    });
  });
  standByBuiltinColors.forEach((el) => {
    backgroundOptions.push({ type: 'color', color: el });
  });
  let backgroundIndex = -1;
  if (selectedBuiltinColor) {
    backgroundIndex = standByBuiltinColors.findIndex(
      (el) => el === selectedBuiltinColor
    );
    if (backgroundIndex > -1) {
      backgroundIndex += standByUnsplashPhotos.length;
    }
  }
  if (selectedUnsplashPhoto) {
    backgroundIndex = standByUnsplashPhotos.findIndex(
      (el) => el.id === selectedUnsplashPhoto.id
    );
  }

  const handleBackgroundChange = (index: number) => {
    const bg = backgroundOptions[index];
    if (!bg) {
      setSelectedUnsplashPhoto(null);
      setSelectedBuiltinColor(null);
    } else if (bg.type === 'color') {
      index -= standByUnsplashPhotos.length;
      setSelectedUnsplashPhoto(null);
      setSelectedBuiltinColor(standByBuiltinColors[index]);
    } else {
      setSelectedBuiltinColor(null);
      setSelectedUnsplashPhoto(standByUnsplashPhotos[index]);
    }
  };

  useEffect(() => {
    const bg: IBackground = {};
    if (selectedBuiltinColor) {
      bg.color = selectedBuiltinColor;
    }
    if (selectedUnsplashPhoto) {
      bg.color = getMainColor(selectedUnsplashPhoto);
      bg.image = getMainImageUrl(selectedUnsplashPhoto);
    }
    if (onChange) {
      onChange(bg);
    }
  }, [selectedBuiltinColor, selectedUnsplashPhoto, onChange]);

  return (
    <Popover
      {...props}
      trigger="click"
      content={
        <BackgroundSelect
          options={backgroundOptions}
          current={backgroundIndex}
          onChange={handleBackgroundChange}
        />
      }
    />
  );
}

export default observer(BackgroundPopover);
