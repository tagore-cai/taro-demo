import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, Image, Text } from '@tarojs/components';
import logoImg from '../../assets/images/favicon.png';
import { Dispatch } from 'redux';
import { connect } from '@tarojs/redux';

import { AtNavBar, AtAvatar, AtDrawer } from 'taro-ui';

import './index.scss';

type PageStateProps = {
  tree: Array<any>;
  menus: Array<any>;
  dispatch: Dispatch;
};

type PageOwnProps = {};

type PageState = {
  leftDrawerShow: boolean;
};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

interface Index {
  props: IProps;
  state: PageState;
}
@connect(({ menus }) => ({ ...menus }))
class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      leftDrawerShow: false
    };
  }

  config = {
    navigationBarTitleText: 'Taro UI'
  };

  onShareAppMessage() {
    return {
      title: 'Taro UI',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    };
  }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'menus/getMenuTree'
  //   });
  // }

  leftDrawerClick = () => {
    this.setState({
      leftDrawerShow: !this.state.leftDrawerShow
    });
  };

  onDrawerClose = () => {
    this.setState({
      leftDrawerShow: !this.state.leftDrawerShow
    });
  };

  onClickItem(i) {
    Taro.navigateTo({
      // url: `/pages/panel/index?id=${id.toLowerCase()}`
      url: `/pages/menu/index?uid=${i.uid}`
    });
    this.setState({
      leftDrawerShow: false
    });
  }

  render() {
    const { menus } = this.props;
    return (
      <View className='page page-index'>
        <AtNavBar onClickLeftIcon={this.leftDrawerClick} title='商品中台首页' leftIconType='bullet-list' rightFirstIconType='user' />
        <View className='page-container page-content'>
          <View className='logo'>
            <Image src={logoImg} className='img' mode='widthFix' />
          </View>
          <View className='page-title'>欢迎使用商品中台</View>
        </View>
        <AtDrawer show={this.state.leftDrawerShow} mask onClose={this.onDrawerClose}>
          <View className='menus menus-header'>
            <AtAvatar className='menus-icon' circle image={logoImg} />
            <View className='menus-title'>商品中台</View>
          </View>
          {menus.map(i => {
            return i.useable === 1 ? (
              <View className='menus-item' key={i.path} data-index={i} onClick={this.onClickItem.bind(this, i)}>
                <Text>{i.name}</Text>
                <Text className='at-icon item-extra__icon-arrow at-icon-chevron-right' />
              </View>
            ) : null;
          })}
        </AtDrawer>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
