import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { getAbout, addGeneral } from './action';
import cfg from '../../../config/domain';
import { Button, Upload, message, Row, Col } from 'antd';

import s from './about';
if (typeof window !== 'undefined') {
  require('../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
}

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    getAbout(1)
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
          editorState: EditorState.createWithContent(state),
        });
      })
      .catch(e => {
        message.error('页面加载失败');
      });
  }
  _onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  _post() {
    const { dispatch } = this.props;
    const { editorState } = this.state;
    const  msg = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const opt = {
      content: msg,
      id: 1,
    }
    dispatch(addGeneral(opt));
  }
  render() {
    const that = this;
    const { response, history } = this.props;
    const { editorState } = this.state;

    return (
      <div>
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

export default connect(mapStateToProps)(About);

