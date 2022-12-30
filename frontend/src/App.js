import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import { getCurrentUser } from "./lib/api/gotoreAPI";
import Header from "./components/pages/Header";
import Event from "./components/pages/events/Show";
import CreateEvent from "./components/pages/events/Create";
import EditEvent from "./components/pages/events/Edit";
import User from "./components/pages/users/Show";
import EditUser from "./components/pages/users/Edit";
import ChatRooms from "./components/pages/chat_rooms/ChatRooms";
import ChatRoom from "./components/pages/chat_rooms/ChatRoom";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const AuthContext = React.createContext();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.currentUser);
        console.log(res?.data);
      } else {
        console.log(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  return (
    <Router>
      <Header isSignedIn={isSignedIn} currentUser={currentUser} />
      <AuthContext.Provider>
        <Routes>
          <Route path='/' element={<Home currentUser={currentUser} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route
            exact
            path='/chatrooms'
            element={<ChatRooms currentUser={currentUser} />}
          />
          <Route
            path='/chatroom/:id'
            element={<ChatRoom currentUser={currentUser} />}
          />
          <Route
            path='/events/:id'
            element={<Event currentUser={currentUser} />}
          />
          <Route
            path='/Event-create'
            element={<CreateEvent currentUser={currentUser} />}
          />
          <Route
            path='/Event-edit/:id'
            element={<EditEvent currentUser={currentUser} />}
          />
          <Route
            path='/users/:id'
            element={<User currentUser={currentUser} />}
          />
          <Route
            path='/user-edit/:id'
            element={<EditUser currentUser={currentUser} />}
          />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
