import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exhibitionList, exhibitionDelete } from './action';
import { message } from 'antd';
import List from './components/List';

import s from './exhibition';

class ExhibitionList extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(exhibitionList());
  }
  _delete(id) {
    const { dispatch } = this.props;
    dispatch(exhibitionDelete({id: id}));
  }
  _detail(id) {
    const { history } = this.props;
    history.push(`/main/exhibition/edit/${id}`);
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
          response.length ? <List data={response} delete={(e) => this._delete(e)} detail={(e) => this._detail(e)}/> : <p>无筛选结果</p>
        }
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.exhibitionList;

  return {
    error,
    isFetching,
    response,
    dlt: state.exhibitionDelete,
  };
};

export default connect(mapStateToProps)(ExhibitionList);

