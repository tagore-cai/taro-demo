import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { Dispatch } from 'redux';
import { connect } from '@tarojs/redux';
import Header from '../../../components/header';

import { parseTime } from '../../../utils';

import { AtNavBar, AtList, AtListItem, AtFloatLayout } from 'taro-ui';

import './index.scss';

type PageStateProps = {
  list: Array<any>;
  pageNo: number;
  dispatch: Dispatch;
};

type PageOwnProps = {};

type PageState = {
  leftDrawerShow: boolean;
  open: boolean;
  currItem: any;
};

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

interface Index {
  props: IProps;
  state: PageState;
}
@connect(({ material }) => ({
  list: material.addressList,
  pageNo: material.pageNo
}))
class Index extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      open: false,
      leftDrawerShow: false,
      currItem: {}
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'material/getAddressList',
      payload: {
        pageSize: 20
      }
    });
  }

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

  handleItemClick(i) {
    this.setState({
      open: true,
      currItem: i
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  onScrollToLower = () => {
    const { dispatch, pageNo } = this.props;
    dispatch({
      type: 'material/nextAddressList',
      payload: {
        pageNo,
        pageSize: 20
      }
    });
  };

  render() {
    const { list } = this.props;
    const { currItem, open } = this.state;
    return (
      <View className='page page-index'>
        <View className='panel'>
          <View className='panel__content no-padding'>
            <Header />
          </View>
        </View>
        <ScrollView scrollY onScrollToLower={this.onScrollToLower} className='page-scroll'>
          <AtList>
            {list.map(i => (
              <AtListItem
                key={i.id}
                onClick={this.handleItemClick.bind(this, i)}
                arrow='right'
                title={i.areaName}
                note={i.countryName}
                extraText='详细信息'
              />
            ))}
          </AtList>
        </ScrollView>
        <AtFloatLayout isOpened={open} scrollY title='这是个标题' onClose={this.handleClose}>
          <AtList>
            <AtListItem title='产地名称 ' extraText={currItem.areaName} />
            <AtListItem title='国家' extraText={currItem.countryName} />
            <AtListItem title='更新时间' extraText={parseTime(currItem.createTime)} />
            <AtListItem title='创建者' extraText={currItem.createUserStr} />
            <AtListItem title='更新者' extraText={currItem.updateUserStr} />
          </AtList>
        </AtFloatLayout>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
