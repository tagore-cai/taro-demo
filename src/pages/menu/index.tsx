import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View } from '@tarojs/components';
import { AtNavBar } from 'taro-ui';

import './index.scss';

import { connect } from '@tarojs/redux';
import { Dispatch } from 'redux';

type PageStateProps = {
  mapMenus: Array<any>;
  dispatch: Dispatch;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(({ menus }) => ({
  mapMenus: menus.mapMenus
}))
class Index extends Taro.Component {
  config = {
    navigationBarTitleText: 'Taro UI'
  };

  constructor() {
    super(...arguments);
  }
  onShareAppMessage() {
    return {
      title: 'Taro UI',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    };
  }

  gotoPanel(i) {
    if (i.children.length > 0) {
      Taro.navigateTo({
        // url: `/pages/panel/index?id=${id.toLowerCase()}`
        url: `/pages/menu/index?uid=${i.uid}`
      });
    } else {
      Taro.navigateTo({
        // url: `/pages/panel/index?id=${id.toLowerCase()}`
        url: `/pages${i.uid}/index?uid=${i.uid}`
      });
    }
  }

  onClickLeftIcon = () => {
    Taro.navigateBack();
  };

  render() {
    const { uid } = this.$router.params;
    const currMenu = this.props.mapMenus && this.props.mapMenus[uid];
    const menus = this.props.mapMenus ? this.props.mapMenus[uid].children : [];
    return (
      <View className='page page-index'>
        <AtNavBar title={currMenu.name} onClickLeftIcon={this.onClickLeftIcon} leftIconType='chevron-left' rightFirstIconType='user' />
        <View className='page-container'>
          <View className='module-list'>
            {menus.map(item => (
              <View
                className='module-list__item'
                key={item.key}
                data-id={item.path}
                data-name={item.name}
                // data-list={item.childrenMenu}
                onClick={this.gotoPanel.bind(this, item)}
              >
                <View className='module-list__item-title'>{item.name}</View>
                <View className='module-list__item-content'>{item.path}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
