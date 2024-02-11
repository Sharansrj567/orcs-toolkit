import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../store/slices/authThunk";

export default () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top bg-primary d-flex flex-row"
      style={{ backgroundColor: "#e3f2fd", justifyContent: "space-between" }}
    >
      <Link to="/" className="navbar-brand">
        ORCS
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {authenticated && (
            <>
              <Link to="/userList">
                <li className="nav-item nav-link">User List</li>
              </Link>
              <Link to="/banList">
                <li className="nav-item nav-link">Policies List</li>
              </Link>
              <Link to="/logsList">
                <li className="nav-item nav-link">Logs List</li>
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="d-flex">
        <div>
          <li
            className="float-right nav-item nav-link text-white"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(signOut())}
          >
            Logout
          </li>
        </div>
        <button
          className="navbar-toggler float-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};
