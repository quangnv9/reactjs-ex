import { API_PATHS } from 'configs/api';
import { InfoPhoto } from 'models/photo';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import Photo from './photo/Photo';
import { getPhotoChange, getPhotoList } from './redux/photoReducer';
import './styles.scss';

interface Props {}

const PhotoModule = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getPhoto = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.getPhoto, 'get'));
    dispatch(getPhotoList(json));
  }, []);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  const photoChange = useSelector((state: AppState) => {
    return state.photo.photoChange;
  });

  const photoList = useSelector((state: AppState) => {
    return state.photo.photoList;
  });

  console.log(photoList);
  console.log(photoChange);

  const handleTitleChange = (photoItem: InfoPhoto) => {
    dispatch(getPhotoChange(photoItem));
  };

  return (
    <div className="photo-list">
      <Button>Confirm</Button>
      <Button>Reset</Button>
      {photoList.map((photo: InfoPhoto) => (
        <div key={photo.id} className="photo-item">
          <Photo photo={photo} onChange={handleTitleChange} />
        </div>
      ))}
    </div>
  );
};

export default PhotoModule;
