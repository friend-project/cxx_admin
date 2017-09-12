import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addExhibition } from './action';
import cfg from '../../../config/domain';
import { Button, Upload, message } from 'antd';

import s from './exhibitionAdd';
if (typeof window !== 'undefined') {
  require('../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
}

class ExhibitionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      img: '',
    };
  }
  _onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  _post() {
    const { dispatch } = this.props;
    const { editorState, img } = this.state;
    const  msg = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const title = this.refs.title.value;
    const subhead = this.refs.subhead.value;
    const opt = {
      title: title,
      subhead: subhead,
      content: msg,
      'thumb_img': img,
    }
    console.log(opt);
    dispatch(addExhibition(opt));
  }
  render() {
    const that = this;
    const { editorState } = this.state;
    const { response, history } = this.props;
    if (response && response.insertId) {
      history.push('/main/exhibition');
    }
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

    return (
      <div>
        <input type="txt" className={s.title} placeholder="标题" ref="title" />
        <input type="txt" className={s.title} placeholder="副标题" ref="subhead" />
        <div className={s.row}>
          <Upload className={s.upload} {...props} >
            <Button>上传原始图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${img}`} />
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this._onEditorStateChange}
          wrapperClassName={s.box}
        />
        <div className={s.btn} onClick={() => this._post()}>提交</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { response } = state.exhibitionAdd;
  return { response };
};

export default connect(mapStateToProps)(ExhibitionAdd);

