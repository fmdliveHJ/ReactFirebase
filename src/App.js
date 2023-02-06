import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const App = () => {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home />
                ) : (
                  <Navigate replace={true} to="/login"></Navigate>
                )
              }
            ></Route>

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace={true} />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" replace={true} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default App;
