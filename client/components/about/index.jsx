import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mural extends Component {

  render() {
    return (
      <div>
        about
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps)(Mural);

