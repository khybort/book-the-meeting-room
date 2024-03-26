import { useQuery } from 'react-query';
import { RoomServicesAPI } from '../../services/room-services'; // Replace with your actual API function

export const useGetAvailableRoomsQuery = (numberOfAttendees: number, startTime: string, endTime: string, onSuccess?: any, onError?: any) => {
  return useQuery(
    ['getavailablerooms', numberOfAttendees, startTime, endTime],
    () => RoomServicesAPI.getAvailableRooms(numberOfAttendees, startTime, endTime),
    {
      onSuccess: onSuccess,
      onError: onError,
      staleTime: 1000 * 30,
      cacheTime: 1000 * 60 * 5,
    }
  );
};