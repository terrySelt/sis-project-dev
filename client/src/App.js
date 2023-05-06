import './App.css';
//import { io } from "socket.io-client";
import {MigosInitial, UserForm, UserList} from "./pages"
import {Routes, Route} from "react-router-dom"
import { RestaurantProvider } from "./context/restaurantContext"
import {Toaster} from 'react-hot-toast'

/* const socket = io('http://localhost:5000')
socket.on('event1', data => {
  console.log(data)
}) */

function App() {
  return (
    <RestaurantProvider>
      <Routes>
        <Route path = '/' element = {<MigosInitial />} />
        <Route path = 'UserList' element = {<UserList />} />
        <Route path = '/UserForm' element = {<UserForm />} />
        <Route path = '/Users/:id' element = {<UserForm />} />
      </Routes>
      <Toaster />
    </RestaurantProvider>
  );
}

export default App;
