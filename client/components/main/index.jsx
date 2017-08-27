import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DatePicker, message, Layout } from 'antd';
const { Sider, Content } = Layout;

import Head from '../head';
import Side from '../side';
import Async from '../async';

import s from './main';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    }
  }
  render() {
    const { match } = this.props;
    return (
      <Layout className={s.box}>
        <Head />
        <Layout>
          <Sider>
            <Side {...this.props} />
          </Sider>
          <Content className={s.content}>
            <Route exact path={`${match.url}`} component={Async} />
            <Route path={`${match.url}/async`} component={Async} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps)(Main);

