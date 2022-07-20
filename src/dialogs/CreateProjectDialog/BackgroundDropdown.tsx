import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import BackgroundSelect, {
  IBackgroundOption,
} from '../../components/BackgroundSelect';
import { useProjectStore } from '../../components/hooks';
import { IProjectBackground } from '../../libs/client/types';
import {
  getMainColor,
  getMainImageUrl,
  getThumbImageUrl,
} from '../../libs/unsplash';
import styles from './index.module.scss';

export interface IBackgroundDropdownProps {
  onChange?: (bg: IProjectBackground) => void;
}

function BackgroundDropdown(props: IBackgroundDropdownProps) {
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
    const bg: IProjectBackground = {};
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
    <div className={classNames('dropdown dropdown-end', styles.dropdown)}>
      <label tabIndex={0} className="btn btn-square">
        <HiOutlinePhotograph className="text-xl" />
      </label>
      <div
        tabIndex={-1}
        className={classNames(
          'dropdown-content bg-base-200 rounded-btn',
          'w-60 p-4 shadow-xl mt-1'
        )}>
        <BackgroundSelect
          options={backgroundOptions}
          current={backgroundIndex}
          onChange={handleBackgroundChange}
        />
      </div>
    </div>
  );
}

export default observer(BackgroundDropdown);
