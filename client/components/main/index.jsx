import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DatePicker, message, Layout } from 'antd';
const { Sider, Content } = Layout;

import Head from '../head';
import Side from '../side';
import Mural from '../mural';
import MuralAdd from '../muralAdd';
import Exhibition from '../exhibition';
import ExhibitionAdd from '../exhibitionAdd';
import About from '../about';
import Copy from '../copy';
import ImgAdd from '../imgAdd';

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
            <Route exact path={`${match.url}`} component={Mural} />
            <Route exact path={`${match.url}/mural`} component={Mural} />
            <Route exact path={`${match.url}/mural/add`} component={MuralAdd} />
            <Route exact path={`${match.url}/exhibition`} component={Exhibition} />
            <Route exact path={`${match.url}/exhibition/add`} component={ExhibitionAdd} />
            <Route exact path={`${match.url}/exhibition/edit/:id`} component={ExhibitionAdd} />
            <Route exact path={`${match.url}/about`} component={About} />
            <Route exact path={`${match.url}/copy`} component={Copy} />
            <Route exact path={`${match.url}/imgAdd`} component={ImgAdd} />
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

