import { useQuery } from 'react-query';
import { RoomServicesAPI } from '../../services/room-services'; // room-services.ts dosyasına göre değiştirilecek

export const useListRoomQuery = (authToken: string | null, onSuccess?: any, onError?: any ) => {
  return useQuery('list-rooms', () => RoomServicesAPI.listRooms(authToken), {
    onSuccess,
    onError,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60 * 5,
  });
};