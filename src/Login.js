import React, { useEffect, useState } from "react";
import "./scss/_login.scss";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { signIn } from "./features/User";
import CircularProgress from "@material-ui/core/CircularProgress";

const Login = () => {
  const dispatch = useDispatch();
  const [registerOrLogin, setState] = useState(false);
  const [stringRegister, setStringRegister] = useState("");
  const [stringLogin, setStringLogin] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    lg_email: "",
    lg_password: "",
  });
  const [registerDetails, setRegisterDetails] = useState({
    rg_name: "",
    rg_email: "",
    rg_password: "",
  });

  const { lg_email, lg_password } = loginDetails;
  const handleChangeLogin = (name) => (e) => {
    setStringLogin("");
    setLoginDetails({ ...loginDetails, [name]: e.target.value });
  };

  const { rg_name, rg_email, rg_password } = registerDetails;
  const handleChangeRegister = (name) => (e) => {
    setStringRegister("");
    setRegisterDetails({ ...registerDetails, [name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = () => {
      const id = sessionStorage.getItem("id");
      if (id) {
        axios.get(`/login/${id}`, { method: "GET" }).then((response) => {
          if (response.data.command === "SELECT") {
            dispatch(signIn(response.data.rows[0]));
          }
        });
      }
    };
    fetchData();
  }, [dispatch]);

  const register = (e) => {
    setRegisterLoading(true);
    e.preventDefault();
    axios
      .post("/register", registerDetails)
      .then((response) => {
        if (typeof response.data === "string") {
          setStringRegister(response.data);
          setLoginLoading(false);
        } else {
          setRegisterLoading(false);
          dispatch(signIn(response.data[0]));
          sessionStorage.setItem("id", response.data[0].id);
        }
      })
      .catch((err) => console.error(err));
  };

  const login = (e) => {
    setLoginLoading(true);
    e.preventDefault();
    axios
      .post("/login", loginDetails)
      .then((response) => {
        if (typeof response.data === "string") {
          setStringLogin(response.data);
          setLoginLoading(false);
        } else {
          dispatch(signIn(response.data[0]));
          setLoginLoading(false);
          sessionStorage.setItem("id", response.data[0].id);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="header">
          {registerOrLogin ? <h1>Register</h1> : <h1>Login</h1>}
        </div>
        <div className="body">
          {registerOrLogin ? (
            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Name"
                onChange={handleChangeRegister("rg_name")}
                value={rg_name}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={handleChangeRegister("rg_email")}
                value={rg_email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChangeRegister("rg_password")}
                value={rg_password}
                required
                min="10"
              />

              <button>
                {registerLoading ? <CircularProgress /> : <p>Sign Up</p>}
              </button>
            </form>
          ) : (
            <form onSubmit={login}>
              <input
                type="email"
                placeholder="Email"
                onChange={handleChangeLogin("lg_email")}
                value={lg_email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleChangeLogin("lg_password")}
                value={lg_password}
                required
              />

              <button disabled={loginLoading}>
                {loginLoading ? <CircularProgress /> : <p>Login In</p>}
              </button>
            </form>
          )}
          {registerOrLogin ? <h4>{stringRegister}</h4> : <h4>{stringLogin}</h4>}

          {registerOrLogin ? (
            <p>
              Already have an account?
              <em onClick={() => setState(false)}>Sign In here</em>
            </p>
          ) : (
            <p>
              Don't Have an account?
              <em onClick={() => setState(true)}>Sign Up here</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
