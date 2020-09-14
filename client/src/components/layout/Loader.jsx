import React from "react";
import spinner from "../../img/loading.gif";
import { connect } from "react-redux";

const Loader = ({ loading: { isLoading, className } }) => {
  return (
    isLoading && (
      <div className={`loader-${className}`}>
        <img src={spinner} alt="Loading..." />
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(Loader);
