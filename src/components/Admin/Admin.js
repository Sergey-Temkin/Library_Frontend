import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";

const AdminDashboard = () => {
  const [data, setData] = useState({ users: 0, books: 0, loans: 0 });
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  // Get the token from localStorage
  const token = localStorage.getItem("accessToken");

  // Ensure isAdmin is correctly retrieved from context
  const isAdmin = login?.is_admin || false;

  // Redirect non-admin users to home
  useEffect(() => {
    if (!isAdmin) {
      console.log("🚫 Access Denied! Redirecting to home...");
      navigate("/");
    } else {
      axios
        .get("http://127.0.0.1:8000/api/library/admin-dashboard/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setData(res.data))
        .catch((err) => console.error("❌ Error loading admin data", err));
    }
  }, [isAdmin, navigate, token]);

  if (!isAdmin) {
    return <h3 className="text-center mt-5">Access Denied</h3>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Users</h5>
              <p>{data.users}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Books</h5>
              <p>{data.books}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Total Loans</h5>
              <p>{data.loans}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
