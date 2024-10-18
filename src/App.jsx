// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Teachers from "./components/organisms/Teachers.jsx";
import  LoginPage  from "./pages/loginPage.jsx";
function App() {
  return (
    <>
    <Teachers/>
    {/* <LoginPage/> */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
        </Routes>
        <Routes>
          <Route path="/teachers" element={<Teachers/>} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
