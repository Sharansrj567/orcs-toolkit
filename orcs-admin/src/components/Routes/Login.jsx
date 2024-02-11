import React, { useState, useEffect, Fragment } from "react";
import { getToken } from "../../utils/helper";
import { login } from "../../store/slices/authThunk";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/history";
import img from "../../assets/images/blogging.svg";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { token, loading, error, authenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token || getToken()) {
      history.push("/");
    }
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Fragment>
      <div
        className="container-fluid"
        style={{
          height: "680px",
        }}
      >
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-5">
            <div
              style={{
                borderRadius: "25px",
                opacity: 0.9,
                background: "#4040a1",
              }}
            >
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <h3 className="text-center pb-3 text-white">
                      Sign in your account
                    </h3>
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control fs-20 text-primary"
                          name="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="mb-1 text-white">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control fs-20 text-primary"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {error && (
                        <h5 className="my-2 text-danger">
                          <strong>Invalid Details</strong>
                        </h5>
                      )}
                      <div className="text-center">
                        {loading ? (
                          <Spinner
                            className="p-3 text-white"
                            animation="border"
                          />
                        ) : (
                          <button
                            type="submit"
                            className="btn bg-white text-primary btn-block"
                          >
                            Login
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <img src={img} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
