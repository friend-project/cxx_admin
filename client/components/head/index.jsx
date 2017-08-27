import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
const { Header } = Layout;

import s from './style';

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }
  render() {
    return (
      <Header>
        <div className={s.logo} />
      </Header>
    );
  }
}
Head.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps)(Head);

