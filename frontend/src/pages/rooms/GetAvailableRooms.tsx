import React, { useState  } from "react";
import { MeetingRoom, MeetingRoomResponse } from "../../services/types";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { RoomServicesAPI } from "../../services/room-services";

const GetAvailableRooms: React.FC = () => {
  const [numberOfAttendees, setNumberOfAttendees] = useState<number>(0);
  const [desiredStartTimeframe, setDesiredStartTimeframe] = useState<string>("");
  const [desiredStopTimeframe, setDesiredStopTimeframe] = useState<string>("");
  const [availableRooms, setAvailableRooms] = useState<MeetingRoomResponse>({
    count: 0,
    next: null,
    previous: null,
    results: {
      result: [],
      total_pages: 0
    }
  });
  const [page, setPage] = useState<number>(1);

  const bookRoom = async (room: MeetingRoom) => {
    await RoomServicesAPI.bookMeetingRoom(room.id, room.name, numberOfAttendees, desiredStartTimeframe, desiredStopTimeframe).then((data) => {
      toast.success(data.message);
      getAvailableRooms();
    }).catch((error) => {
      toast.error(error.message);
    });
  }

  const getAvailableRooms = async () => {
      await RoomServicesAPI.getAvailableRooms(numberOfAttendees, desiredStartTimeframe, desiredStopTimeframe).then((data) => {
        setAvailableRooms(data);
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    getAvailableRooms();
  };
  
  const pageChangeOnChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div className="mx-auto max-w-[1080px] mt-20">
      <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
      <form onSubmit={handleSubmit}>
        <label className="mr-2" htmlFor="attendees">
          Number of attendees:
        </label>
        <input
          className="border border-black rounded-md px-2 py-1 mr-2 text-right appearance-none "
          type="number"
          min="0"
          value={numberOfAttendees}
          onChange={(e) => setNumberOfAttendees(Number(e.target.value))}
        />
        <label className="mr-2" htmlFor="timeframe">
          Start time:
        </label>
        <input
          className="border border-black rounded-md px-2 py-1 mr-2"
          type="datetime-local"
          value={desiredStartTimeframe}
          onChange={(e) => setDesiredStartTimeframe(e.target.value)}
        />
        <label className="mr-2" htmlFor="timeframe">
          Stop time:
        </label>
        <input
          className="border border-black rounded-md px-2 py-1 mr-2"
          type="datetime-local"
          value={desiredStopTimeframe}
          onChange={(e) => setDesiredStopTimeframe(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
      
    <div className="mx-auto max-w-[1080px] mt-20">
      <ul className='border-[1.5px] shadow-md shadow-slate-300 p-4'>
        {availableRooms.results?.result?.map((room: MeetingRoom) => (
          <li className='mr-2 border-[1.5px] shadow-md shadow-slate-300 p-4'>
            <label className="mr-2 font-bold">Room Name:</label> {room.name}
          <label className="ml-2 mr-2 font-bold">Max Occupancy:</label>
           {room.maxOccupancy}
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
           onClick={ () => bookRoom(room)}>
             Book
           </button>
           </li>
      ))}
      </ul>
      <div className="mt-8 p-2">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={availableRooms?.results["total_pages"] ? availableRooms?.results["total_pages"] : 1}
          marginPagesDisplayed={4}
          pageRangeDisplayed={6}
          onPageChange={pageChangeOnChange}
          containerClassName={"rounded-md flex justify-center gap-2"}
          pageClassName={"border-[0.8px] border-slate-300 text-purple-400 font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md hover:bg-purple-200"}
          previousClassName={"text-purple-500 font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md border-[0.8px] border-slate-300 hover:bg-purple-200"}
          nextClassName={"text-purple-500 font-bold w-[1.5rem] h-[1.5rem] text-center rounded-md border-[0.8px] border-slate-300 hover:bg-purple-200"}
          breakClassName={"text-purple-500"}
          activeClassName={"bg-purple-200"}
        />
      </div>
    </div>
    </div>
  );


};


export default GetAvailableRooms;
