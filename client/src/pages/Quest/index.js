import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import QuestNav from "../../components/QuestNav";
import Chart from "../../components/Chart";

class Quest extends Component {
  onSignoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <QuestNav
          username={user.name}
          signout={this.onSignoutClick}
        />
        <Chart />
      </div>
    );
  }
}

Quest.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Quest);
