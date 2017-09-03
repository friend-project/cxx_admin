import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { addExhibition } from './action';

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
    const title = this.refs.title.value;
    const opt = {
      title: title,
      content: msg,
    }
    dispatch(addExhibition(opt));
  }
  render() {
    const { editorState } = this.state;
    const { response, history } = this.props;
    if (response && response.insertId) {
      history.push('/main/exhibition');
    }

    return (
      <div>
        <input type="txt" className={s.title} placeholder="标题" ref="title" />
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

