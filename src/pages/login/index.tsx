import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';

import { Dispatch } from 'redux';
import { connect } from '@tarojs/redux';

import './index.scss';

type PageStateProps = {
  token: string;
  dispatch: Dispatch;
};

type PageOwnProps = {};

type PageState = {
  account: string;
  password: string;
};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

interface Index {
  props: IProps;
  state: PageState;
}

@connect(({ login }) => ({
  ...login
}))
class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      account: '',
      password: ''
    };
  }
  handleAccountChange = value => {
    this.setState({
      account: value
    });
  };
  handlePasswdChange = value => {
    this.setState({
      password: value
    });
  };
  onSubmit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: { ...this.state }
    });
  };
  onReset = () => {
    this.setState({
      account: '',
      password: ''
    });
  };

  render() {
    const { account, password } = this.state;
    return (
      <View className='page'>
        <View>
          <AtInput name='acc' title='用户名' type='text' placeholder='请输入用户名' value={account} onChange={this.handleAccountChange} />
          <AtInput name='pwd' title='密码' type='password' placeholder='请输入密码' value={password} onChange={this.handlePasswdChange} />
          <AtButton onClick={this.onSubmit}>提交</AtButton>
          <AtButton onClick={this.onReset}>重置</AtButton>
        </View>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
