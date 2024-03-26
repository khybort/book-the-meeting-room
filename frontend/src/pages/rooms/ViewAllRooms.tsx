import ReactPaginate from 'react-paginate';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useListRoomQuery } from '../../hooks/rooms/useListRoomsQuery';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { MeetingRoom } from '../../services/types';
import { RoomServicesAPI } from '../../services/room-services';



const ViewAllRooms = () => {
  const authToken = localStorage.getItem('authToken');
  const [page, setPage] = useState<number>(1);
  const { data: rooms,
    refetch,
    isError: isErrorFetchRoom,
    isLoading: isLoadingFetchRoom
} = useListRoomQuery(
    authToken,
    () => {},
    () => {
        toast.error('Error occurred while fetching meeting rooms.');
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch])

  if (isErrorFetchRoom) {
    return <ErrorMessage />;
  }

  if (isLoadingFetchRoom) {
    return <div>Loading...</div>;
  }
  const deleteRoom = async (room: MeetingRoom) => {
    await RoomServicesAPI.deleteRoom(room.id, authToken).then((data) => {
      toast.success("Room deleted successfully");
      refetch();
    }).catch((error) => {
      toast.error(error.message);
      refetch();
    });
  }
  const pageChangeOnChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };
  return (
    <div className="mx-auto max-w-[1080px] mt-20">
      <ul className='border-[1.5px] shadow-md shadow-slate-300 p-4'>
        {rooms.results?.result?.map((room: MeetingRoom) => (
          <li className='mr-2 border-[1.5px] shadow-md shadow-slate-300 p-4'>
            <label className="mr-2 font-bold">Room Name:</label> {room.name}
          <label className="ml-2 mr-2 font-bold">Max Occupancy:</label>
           {room.maxOccupancy}
           <button className="ml-2 mr-2 font-bold bg-red-500 text-white rounded-md p-2" onClick={() => deleteRoom(room)}>Delete</button>
           </li>
      ))}
      </ul>
      <div className="mt-8 p-2">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={rooms?.results["total_pages"]}
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

    
  );
}

export default ViewAllRooms;