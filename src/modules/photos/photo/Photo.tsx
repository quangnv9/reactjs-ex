import { InfoPhoto } from 'models/photo';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import React from 'react';
import './styles.scss';

interface Props {
  photo: InfoPhoto;
  onChange: any;
}

const Photo = (props: Props) => {
  const dispatch = useDispatch();
  const { photo, onChange } = props;
  const { title, thumbnailUrl } = photo;

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleClickTitle = () => {
    setIsEdit(!isEdit);
  };

  const handleBlurTitle = () => {
    setIsEdit(!isEdit);
  };

  const handleTitleChange = (title: string) => {
    if (onChange) onChange({ ...photo, title: title });
    setNewTitle(title);
  };

  return (
    <div className="photo">
      <img className="photo-img" src={thumbnailUrl} alt={title} />
      <div className="photo-description">
        {!isEdit ? (
          <p onClick={handleClickTitle}>{newTitle}</p>
        ) : (
          <input
            value={newTitle}
            type="text"
            autoFocus
            onChange={(e: any) => handleTitleChange(e.target.value)}
            onBlur={handleBlurTitle}
          />
        )}
        <span>{Date.now()}</span>
      </div>
    </div>
  );
};

export default Photo;
