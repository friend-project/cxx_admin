import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addExhibition, getExhibition, addReceive } from './action';
import cfg from '../../../config/domain';
import { Button, Upload, message, Row, Col } from 'antd';

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
      id: '',
      subhead: '',
      thumb_img: '',
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(addReceive(null, {}));
    const id = this.props.match.params.id;
    if (id) {
      getExhibition(id)
        .then((response) => {
          if (response.status > 200) {
            message.error('页面加载失败');
          }
          return response.json();
        })
        .then(stories => {
          const data = stories[0];
          const blocksFromHTML = convertFromHTML(data.content);
          const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          this.setState({
            id: data.id,
            title: data.title,
            subhead: data.subhead,
            thumb_img: data.thumb_img,
            editorState: EditorState.createWithContent(state),
          });
        })
        .catch(e => {
          message.error('页面加载失败');
        });
    }
  }
  _onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  _post() {
    const id = this.props.match.params.id;
    const { dispatch } = this.props;
    const { editorState, thumb_img } = this.state;
    const  msg = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const title = this.refs.title.value;
    const subhead = this.refs.subhead.value;
    const opt = {
      title: title,
      subhead: subhead,
      content: msg,
      'thumb_img': thumb_img,
      id: id,
    }
    dispatch(addExhibition(opt));
  }
  _title(e) {
    this.setState({
      title: e.target.value,
    });
  }
  _subhead(e) {
    this.setState({
      subhead: e.target.value,
    });
  }
  render() {
    const that = this;
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
            thumb_img: info.file.response.fileName,
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }
    const { title, subhead, thumb_img, editorState } = this.state;

    return (
      <div>
        <input type="txt" className={s.title} placeholder="标题" ref="title" value={title}
          onChange={(e) => this._title(e)}
        />
        <input type="txt" className={s.title} placeholder="副标题" ref="subhead" value={subhead}
          onChange={(e) => this._subhead(e)}
        />
        <div className={s.row}>
          <Upload className={s.upload} {...props} >
            <Button>上传原始图片</Button>
          </Upload>
          <img className={s.img} src={`${cfg.static}/map/${thumb_img}`} />
        </div>
        <Row gutter={16}>
          <Col span="12">
            <Editor
              editorState={editorState}
              onEditorStateChange={this._onEditorStateChange}
              editorClassName={s.editor}
            />
          </Col>
          <Col span="12">
            <div
              className={s.preview}
              dangerouslySetInnerHTML={{__html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}}
            />
          </Col>
        </Row>
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
