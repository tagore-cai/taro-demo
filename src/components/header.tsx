import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { AtNavBar } from 'taro-ui';

import { connect } from '@tarojs/redux';

type PageStateProps = {
  mapMenus: Array<any>;
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
  onClickLeftIcon = () => {
    Taro.navigateBack();
  };

  render() {
    const { uid } = this.$router.params;
    const currMenu = this.props.mapMenus && this.props.mapMenus[uid];
    return <AtNavBar title={currMenu.name} onClickLeftIcon={this.onClickLeftIcon} leftIconType='chevron-left' rightFirstIconType='user' />;
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
