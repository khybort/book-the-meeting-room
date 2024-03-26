export interface UpdateCreds {
  data: FormData;
  authToken: string | null;
}

export interface Room {
  name: string;
  max_occupancy: number;
  authToken?: string | null;
}

export interface MeetingRoomResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    result: [];
    total_pages: number;
  };
}

export interface MeetingRoom {
  id: string;
  name: string;
  maxOccupancy: number;
}
