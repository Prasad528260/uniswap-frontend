import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axios.post(
      BASE_URL + "/auth/logout",
      {},
      { withCredentials: true }
    );
    dispatch(removeUser());
    navigate("/");
  };
 

  return (
    <div className="navbar  bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/home"><p className="btn btn-ghost text-2xl">UniSwap</p></Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-7"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user?.profilePicture ||
                    "https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between text-xl">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/view-requests" className="justify-between text-xl">
                  View Requests
                </Link>
              </li>
              <li>
                <Link to="/view-orders" className="justify-between text-xl">
                  View Orders(reciever)
                </Link>
              </li>
              <li>
                <Link to="/get-orders/seller" className="justify-between text-xl">
                  View Orders(seller)
                </Link>
              </li>
              <li>
                <Link to="/history" className="justify-between text-xl">History</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="justify-between text-xl">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
