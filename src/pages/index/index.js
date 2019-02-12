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
    console.log(body);

    api.login(body)
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.error(e);
      });
  };

  componentDidMount() {
    const token = Taro.getStorageSync('token');
    this.setState({
      token
    });
  }

  render() {
    const { token } = this.state;
    return token ? <Home /> : <Login commit={this.login} />;
  }
}
