import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import { getCurrentUser } from "./lib/api/gotoreAPI";
import Header from "./components/pages/Header";
import Post from "./components/pages/posts/show";
import EditPost from "./components/pages/posts/edit";

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
      <Header isSignedIn={isSignedIn} />
      <AuthContext.Provider
        value={{
          isSignedIn: isSignedIn,
          currentUser: currentUser,
        }}
      >
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/post' element={<Post />} />
          <Route
            path='/post-edit'
            element={<EditPost currentUser={currentUser} />}
          />
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
};

export default App;
