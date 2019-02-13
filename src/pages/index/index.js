import Taro from '@tarojs/taro';
import Home from '../home';
import Login from '../login';
import * as api from '../../api/login';

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '商品中台'
  };

  constructor() {
    super(...arguments);
    this.state = {
      token: ''
    };
  }

  login = body => {
    api
      .login(body)
      .then(r => {
        this.setState({
          token: r.data.token
        });
        Taro.setStorageSync('accessToken', r.data.token);
        console.log(r);
      })
      .catch(e => {
        this.setState({
          token: ''
        });
        console.error(e);
      });
  };

  componentDidMount() {
    const token = Taro.getStorageSync('accessToken');
    this.setState({
      token
    });
  }

  render() {
    const { token } = this.state;
    return token ? <Home /> : <Login commit={this.login} />;
  }
}
