import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Upload, message } from 'antd';
import cfg from './../../../config/domain';
import { addMural } from './action';

import s from './muralAdd';

class Mural extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
    }
  }
  render() {
    const that = this;
    const sProps = {
      name: 'file',
      action: `${cfg.web}/api/file`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status === 'done') {
          console.log(info.file.response.fileName);
          that.setState({
            img: info.file.response.fileName,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const { img } = this.state;
    return (
      <div className={s.box}>
        <div className={s.row}>
          <Upload className={s.upload} {...sProps} >
            <Button>上传图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${img}`} />
        </div>
        <div className={s.row}>{`${cfg.static}/map/${img}`}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.muralAdd;

  return { error, isFetching, response };
};

export default connect(mapStateToProps)(Mural);

