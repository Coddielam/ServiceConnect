import React from "react";
import { connect } from "react-redux";

const Dashboard = ({ user }) => {
  return (
    <div className="user-dashboard">
      <h1>Dashboard</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
