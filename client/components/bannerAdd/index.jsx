import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Upload, message } from 'antd';
import cfg from './../../../config/domain';
import { addBanner, bannerAddReceive } from './action';

import s from './bannerAdd';

class Mural extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(bannerAddReceive(null, {}));
  }
  _add() {
    const { dispatch } = this.props;
    const { img } = this.state;
    const turn = this.refs.order.value;
    if (!img) {
      message.error('请上传 Banner 图');
    } else {
      const opt = {
        img, turn,
      }
      dispatch(addBanner(opt));
    }
  }
  render() {
    const that = this;
    const props = {
      name: 'file',
      action: `${cfg.web}/api/file`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status === 'done') {
          that.setState({
            img: info.file.response.fileName,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const { img } = this.state;
    const { response, history } = this.props;
    if (response.insertId) {
      history.push('/main/banner');
    }
    return (
      <div className={s.box}>
        <div className={s.row}>
          <input type="text" placeholder="Banner 排序，可不填，默认0，越大越靠前" ref="order" />
        </div>
        <div className={s.row}>
          <Upload className={s.upload} {...props} >
            <Button>上传 Banner 图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${img}`} />
        </div>
        <div className={s.row}>
          <Button onClick={() => this._add()}>添加 Banner</Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.bannerAdd;

  return { error, isFetching, response };
};

export default connect(mapStateToProps)(Mural);
