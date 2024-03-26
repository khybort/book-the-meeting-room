import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddRoomMutation } from "../../hooks/rooms/useAddRoomMutation";
import { Room } from "../../services/types";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: addRoom } = useAddRoomMutation(
    (_: any) => {
      toast.success("Room created successfully");
      navigate("/rooms");
    },
    (_: any) => {
      toast.error("Failed to create room");
      navigate("/rooms");
    }
  );

  const [roomName, setRoomName] = useState("");
  const [maxOccupancy, setMaxOccupancy] = useState(0);
  const authToken = localStorage.getItem("authToken");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom: Room = {
      name: roomName,
      max_occupancy: maxOccupancy,
      authToken: authToken,
    };
    addRoom(newRoom);
    setRoomName("");
    setMaxOccupancy(0);
  };

  return (
    <div className="mx-auto max-w-[1080px] mt-20">
      <h2 className="text-2xl font-bold mb-4">Add Meeting Room</h2>
      <form onSubmit={handleSubmit}>
        <label className="mr-2" htmlFor="roomName">
          Room Name:
          <input
            className="border border-black rounded-md px-2 py-1 ml-2 appearance-none"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <label className="mr-2" htmlFor="maxOccupancy">
          Max Occupancy:
          <input
            className="border border-black rounded-md px-2 py-1 ml-2 appearance-none"
            min="0"
            type="number"
            value={maxOccupancy}
            onChange={(e) => setMaxOccupancy(parseInt(e.target.value) || 0)}
          />
        </label>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
