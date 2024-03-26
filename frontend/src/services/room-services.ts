import { api } from "./api-config";
import { Room } from "../services/types";

class RoomServicesAPI {
  static getAvailableRooms = async (
    numberOfAttendees: number,
    startTime: string,
    endTime: string
  ) => {
    return await api.get(
      `availablerooms?numAttendees=${numberOfAttendees}&startTime=${startTime}&endTime=${endTime}`
    ).then(response => response.data).catch(error => {
      throw new Error(error.response.data);
    })
  };

  static bookMeetingRoom = async (
    room_id: string,
    name: string,
    number_of_people: number,
    start_time: string,
    end_time: string,
  ) => {
      return await api.post(`bookroom`, {
        room_id,
        name,
        number_of_people,
        start_time,
        end_time,
      }).then(response => response.data).catch(error => {
        throw new Error(error.response.data);
      });
  };

  static addRoom = async ({ name, max_occupancy, authToken }: Room) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }
      return await api.post("addroom", {
        name,
        max_occupancy,
      }, config).then(response => response.data).catch(error => {
        throw new Error(error.response.data);
      });
  };

  static listRooms = async (authToken: string | null) => {
      return await api.get("listrooms", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(response => response.data).catch(error => {
        throw new Error(error.response.data);
      });
  };

  static deleteRoom = async (room_id: string, authToken: string | null) => {
      return await api.delete(`deleteroom/${room_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(response => response.data).catch(error => {
        throw new Error(error.response.data);
      });
  }
}

export { RoomServicesAPI };
