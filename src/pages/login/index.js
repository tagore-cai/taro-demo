import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';

import './index.scss';

export default class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      account: '',
      password: ''
    };
  }
  handleAccountChange(value) {
    this.setState({
      account: value
    });
  }
  handlePasswdChange(value) {
    this.setState({
      password: value
    });
  }
  onSubmit = () => {
    console.log(111);
    const { commit } = this.props;
    commit({
      ...this.state
    });
  };
  onReset = () => {
    console.log(111);

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
          <AtInput name='acc' title='用户名' type='text' placeholder='请输入用户名' value={account} onChange={this.handleAccountChange.bind(this)} />
          <AtInput name='pwd' title='密码' type='password' placeholder='请输入密码' value={password} onChange={this.handlePasswdChange.bind(this)} />
          <AtButton onClick={this.onSubmit}>提交</AtButton>
          <AtButton onClick={this.onReset}>重置</AtButton>
        </View>
      </View>
    );
  }
}
