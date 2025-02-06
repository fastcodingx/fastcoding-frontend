import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Bookmark from "./components/Bookmark";
import Register from "./components/Register";
import Login from "./components/Login";
import GetInTouch from "./components/GetInTouch.js";
import TermsAndConditions from "./components/TermsAndConditions.js";
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import AboutUs from "./components/AboutUs.js";
import MyAccount from "./components/MyAccount.js";
import { CategoryProvider } from "./components/CategoryContext";
import { UserProvider } from "./components/UserContext.js";
import Footer from "./components/Footer.js";
import Profile from "./components/Profile.js";
import MyCodes from "./components/MyCodes.js";
import ChatSupport from "./components/ChatSupport.js";
import Logout from "./components/Logout.js";
import React, { useState, useEffect } from "react";

function App() {
  const location = useLocation();

  const hiddenRoutes = [
    "/termsandcondition",
    "/privacypolicy",
    "/aboutus",
    "/getintouch",
    "/myaccount",
    "/mybookmark",
  ];
  let flag = hiddenRoutes.includes(location.pathname);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <UserProvider>
      <CategoryProvider>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar />
            <div
              style={{
                marginLeft: isMobile ? "0" : flag ? "0" : "290px",
                paddingTop: isMobile ? "60px" : "90px",
              }}
              className="content"
            >
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/mybookmark" element={<Bookmark />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/myaccount" element={<MyAccount />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="mycodes" element={<MyCodes />} />
                  <Route path="chatsupport" element={<ChatSupport />} />
                  <Route path="logout" element={<Logout />} />
                </Route>
                <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                <Route
                  path="/termsandcondition"
                  element={<TermsAndConditions />}
                />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/getintouch" element={<GetInTouch />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </CategoryProvider>
    </UserProvider>
  );
}

export default App;
