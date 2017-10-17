import React, { Component } from 'react';
import { connect } from 'react-redux';
import { muralList, muralDelete } from './action';
import { message } from 'antd';
import List from './components/List';

import s from './mural';

class Mural extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(muralList());
  }
  _delete(id) {
    const { dispatch } = this.props;
    dispatch(muralDelete({id: id}));
    dispatch(muralList());
  }
  render() {
    const { error, isFetching, response, dlt } = this.props;
    if (error)  {
      message.error('加载失败');
    }
    if (dlt.response && dlt.response.affectedRows) {
      message.info('删除成功');
    }
    return (
      <div className={s.box}>
        {
          response.length ? <List data={response} delete={(e) => this._delete(e)} /> : <p>无筛选结果</p>
        }
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.muralList;

  return {
    error,
    isFetching,
    response,
    dlt: state.muralDelete,
  };
};

export default connect(mapStateToProps)(Mural);

