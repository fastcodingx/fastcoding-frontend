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
import Footer from "./components/Footer.js";

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
  return (
    <CategoryProvider>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content" style={{ marginLeft: flag ? "0" : "290px" }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/mybookmark" element={<Bookmark />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myaccount" element={<MyAccount />} />
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
  );
}

export default App;
