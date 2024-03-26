import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Error404NotFound } from "./pages/Error404NotFound";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './App.css';
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Home } from "./pages/home/Home";
import { UpdateCredentials } from "./pages/updatecreds/UpdateCredentials";
import GetAvailableRooms from "./pages/rooms/GetAvailableRooms";
import ViewAllRooms from "./pages/rooms/ViewAllRooms";
import CreateRoom from "./pages/rooms/CreateRoom";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={1500} style={{ fontSize: '0.7rem' }} />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home />}>
          <Route path="/" element={<GetAvailableRooms />} />
          
          <Route element={<ProtectedRoute />}>
           <Route path="rooms/create" element={<CreateRoom />} />
            <Route path="/rooms" element={<ViewAllRooms />} /> 
            <Route path="/me/updatecredentials" element={<UpdateCredentials />} />
        </Route>
        </Route>

        <Route path="*" element={<Error404NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
