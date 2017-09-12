import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addAbout } from './action';
import cfg from '../../../config/domain';
import { Button, Upload, message } from 'antd';

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
    }
    dispatch(addAbout(opt));
  }
  render() {
    const that = this;
    const { editorState } = this.state;
    const { response, history } = this.props;
    if (response && response.insertId) {
      history.push('/main');
    }

    return (
      <div>
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

export default connect(mapStateToProps)(About);

