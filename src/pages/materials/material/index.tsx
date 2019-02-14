import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { Dispatch } from 'redux';
import { connect } from '@tarojs/redux';

import { AtNavBar, AtList, AtListItem } from 'taro-ui';

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

  onClickLeftIcon = () => {
    Taro.navigateBack();
  };

  render() {
    return (
      <View className='page page-index'>
        <View className='panel'>
          <View className='panel__content no-padding'>
            <AtNavBar fixed title='商品中台首页' onClickLeftIcon={this.onClickLeftIcon} leftIconType='chevron-left' rightFirstIconType='user' />
          </View>
        </View>
        <View className='material-content'>
          <AtList>
            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />
            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />            <AtListItem title='标题文字' arrow='right' />
            <AtListItem title='标题文字' extraText='详细信息' />
            <AtListItem title='禁用状态' disabled extraText='详细信息' />
          </AtList>
        </View>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
