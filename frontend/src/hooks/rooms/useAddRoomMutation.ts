import { useMutation } from 'react-query';
import { RoomServicesAPI } from '../../services/room-services';

export const useAddRoomMutation = (onSuccess?: any, onError?: any) => {

  return useMutation("addroom",
    RoomServicesAPI.addRoom,
    {
        onSuccess: onSuccess,
        onError: onError,
    }
  );
};