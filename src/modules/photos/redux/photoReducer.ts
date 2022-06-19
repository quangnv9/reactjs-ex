import { InfoPhoto } from 'models/photo';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface PhotoState {
  photoList: InfoPhoto[];
  photoChange: InfoPhoto;
}

export const getPhotoList = createCustomAction('photo/getPhotoList', (data: InfoPhoto[]) => ({
  data,
}));
export const getPhotoChange = createCustomAction('photo/getPhotoChange', (data: InfoPhoto) => ({
  data,
}));

const actions = { getPhotoList, getPhotoChange };

type Action = ActionType<typeof actions>;

export default function photoReducer(
  state: PhotoState = {
    photoList: [],
    photoChange: { id: 0, albumId: 0, thumbnailUrl: '', title: '', url: '' },
  },
  action: Action
) {
  console.log('State: ', state);
  console.log('Action: ', action);
  switch (action.type) {
    case getType(getPhotoList): {
      return {
        ...state,
        photoList: action.data,
      };
    }
    case getType(getPhotoChange): {
      return {
        ...state,
        photoChange: action.data,
      };
    }
    default:
      return state;
  }
}
