import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import s from './style';

class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }
  _linkTo(key) {
    this.props.history.push(key.key);
  }
  render() {
    return (
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        onClick={(key) => this._linkTo(key)}
      >
        <Menu.Item key="/main">
          <Icon type="pie-chart" />
          <span>首页</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><Icon type="book" /><span>壁画</span></span>}
        >
          <Menu.Item key="/main/mural">壁画列表</Menu.Item>
          <Menu.Item key="/main/mural/add">添加壁画</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><Icon type="calendar" /><span>展览</span></span>}
        >
          <Menu.Item key="/main/exhibition">展览列表</Menu.Item>
          <Menu.Item key="/main/exhibition/add">添加展览</Menu.Item>
        </SubMenu>
        <Menu.Item key="/main/about">
          <Icon type="team" />
          <span>关于我们</span>
        </Menu.Item>
        <Menu.Item key="/main/copy">
          <Icon type="copyright" />
          <span>版权</span>
        </Menu.Item>
      </Menu>
    );
  }
}
Side.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps)(Side);
