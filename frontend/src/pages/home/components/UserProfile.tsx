import { useEffect, useRef, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { IoIosCreate  } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "../../../hooks/users/useDeleteUserMutation";
import { useGetUserDataQuery } from "../../../hooks/users/useGetUserDataQuery";
import { cleanUserInfoFromLocalStorage } from "../../../utils/jwtToken";
import { BASEURL } from "../../../utils/constants";

export const UserProfile = (): JSX.Element => {
  const authToken = localStorage.getItem("authToken");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<any>();

  const navigate = useNavigate();

  const { data: userData } = useGetUserDataQuery(authToken, (_: any) => {
    toast.error("Error in fetching user data. Please try again later.");
  });

  const { mutate: deleteUser } = useDeleteUserMutation(
    (_: any) => {
      toast.success("Account deleted successfully");
      cleanUserInfoFromLocalStorage();
      window.location.reload();
    },
    (_: any) => {
      toast.error("Error in deleting user account. Please try again later.");
    }
  );

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleOptionsOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const updateCredentialsOnClick = () => {
    navigate("/me/updatecredentials");
  };

  const logoutOnClick = () => {
    cleanUserInfoFromLocalStorage();
    window.location.reload();
  };

  const deleteAccountOnClick = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(authToken);
      navigate("/signup", { replace: true });
    }
  };

  const createRoomOnClick = () => {
    navigate("/rooms/create");
  };

  const viewGetAvailableRoomsOnClick = () => {
    navigate("/");
  };

  const viewRoomsOnClick = () => {
    navigate("/rooms");
  };

  return (
    <>
      <div onClick={createRoomOnClick} className="flex justify-between items-center gap-x-2 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
        <IoIosCreate size={14} />
        <p className="text-sm">Create Room</p>
      </div>

      <div onClick={viewGetAvailableRoomsOnClick} className="flex justify-between items-center gap-x-2 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
        <MdEventAvailable size={14} />
        <p className="text-sm">Available Rooms</p>
      </div>

      <div onClick={viewRoomsOnClick} className="flex justify-between items-center gap-x-2 p-2 rounded-full cursor-pointer hover:scale-110 transition-all">
        <SiGoogleclassroom  size={14} />
        <p className="text-sm">Rooms</p>
      </div>

      <div ref={dropdownRef} onClick={handleOptionsOnClick} className="flex justify-between gap-x-2 items-center p-2 cursor-pointer relative">
        <img src={BASEURL + userData?.profile_image} alt="profileimage" className="w-10 h-10 rounded-full" />
        <p className="font-secondary text-sm over overflow-hidden">{userData?.username}</p>
        {isOpen ? <RiArrowDropUpFill size={30} /> : <RiArrowDropDownFill size={30} />}
        {isOpen && (
          <div className="w-full absolute left-6 top-16 p-1 bg-white shadow-md z-10 rounded-md text-[0.8rem]">
            <ul className="space-y-1">
              <li onClick={updateCredentialsOnClick} className="hover:bg-blue-300 rounded-md p-2 ">
                Update Credentials
              </li>
              <li onClick={logoutOnClick} className="hover:bg-darkyellow rounded-md p-2">
                Logout
              </li>
              <li onClick={deleteAccountOnClick} className="hover:bg-red-400 rounded-md p-2">
                Delete account
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
