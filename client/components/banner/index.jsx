import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bannerList, bannerDelete, bannerDeleteReceive, bannerUpdate } from './action';
import { message } from 'antd';
import List from './components/List';

import s from './mural';

class Banner extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(bannerList());
  }
  _delete(id) {
    const { dispatch } = this.props;
    dispatch(bannerDelete({id: id}));
  }

  render() {
    const { error, isFetching, response, dlt, dispatch } = this.props;
    if (error)  {
      message.error('加载失败');
    }
    if (dlt.response && dlt.response.affectedRows) {
      message.info('删除成功');
      dispatch(bannerDeleteReceive(null, {}));
      dispatch(bannerList());
    }
    return (
      <div className={s.box}>
        {
          response.length ?
            <List
              data={response}
              delete={(e) => this._delete(e)}
            /> :
            <p>无筛选结果</p>
        }
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.bannerList;

  return {
    error,
    isFetching,
    response,
    dlt: state.bannerDelete,
  };
};

export default connect(mapStateToProps)(Banner);
