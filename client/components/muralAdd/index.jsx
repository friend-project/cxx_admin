import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Upload, message } from 'antd';
import cfg from './../../../config/domain';
import { addMural, muralAddReceive } from './action';

import s from './muralAdd';

class Mural extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sImg: '',
      bImg: '',
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(muralAddReceive(null, {}));
  }
  _add() {
    const { dispatch } = this.props;
    const { sImg, bImg } = this.state;
    const name = this.refs.text.value;
    if (!name) {
      message.error('请填写标题');
    } else if (!sImg) {
      message.error('请上传缩略图');
    } else if (!bImg) {
      message.error('请上传原始图片');
    } else {
      const opt = {
        sImg, bImg, name
      }
      dispatch(addMural(opt));
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
            sImg: info.file.response.fileName,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const bProps = {
      name: 'file',
      action: `${cfg.web}/api/file`,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status === 'done') {
          that.setState({
            bImg: info.file.response.fileName,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const { sImg, bImg } = this.state;
    const { response, history } = this.props;
    if (response.insertId) {
      history.push('/main/mural');
    }
    return (
      <div className={s.box}>
        <div className={s.row}>
          <input type="text" placeholder="标题" ref="text" />
        </div>
        <div className={s.row}>
          <Upload className={s.upload} {...sProps} >
            <Button>上传缩略图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${sImg}`} />
        </div>
        <div className={s.row}>
          <Upload className={s.upload} {...bProps} >
            <Button>上传原始图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${bImg}`} />
        </div>
        <div className={s.row}>
          <Button onClick={() => this._add()}>添加壁画</Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { error, isFetching, response } = state.muralAdd;

  return { error, isFetching, response };
};

export default connect(mapStateToProps)(Mural);

