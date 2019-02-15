import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Login from '../login';
import Home from '../home';

import './index.scss';

type PageStateProps = {
  token: string;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(({ user }) => ({
  token: user.token
}))
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };
  render() {
    const { token } = this.props;
    return <View className='index'>{token ? <Home /> : <Login />}</View>;
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
