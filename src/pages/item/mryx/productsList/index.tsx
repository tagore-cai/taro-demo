import Taro from '@tarojs/taro';
import { ComponentClass } from 'react';
import { View, ScrollView, Text, Button } from '@tarojs/components';
import { Dispatch } from 'redux';
import { connect } from '@tarojs/redux';

import { parseTime } from '../../../../utils';

import { AtList, AtListItem, AtFloatLayout } from 'taro-ui';
import Header from '../../../../components/header';

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
@connect(({ listMryxItem }) => ({
  list: listMryxItem.lists,
  pageNo: listMryxItem.pageNo
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
      type: 'listMryxItem/getLists',
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

  handleItemEdit(i) {
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
      type: 'listMryxItem/nextLists',
      payload: {
        pageNo,
        pageSize: 20
      }
    });
  };

  render() {
    const { list } = this.props;
    const { currItem, open } = this.state;
    console.log(list);

    return (
      <View className='page page-index'>
        <View className='panel'>
          <View className='panel__content no-padding'>
            <Header />
          </View>
        </View>
        <ScrollView scrollY onScrollToLower={this.onScrollToLower} className='page-scroll'>
          {list.map(i => (
            <View className='at-row line scroll-item'>
              <Text className='at-col at-col-11'>{i.itemName}</Text>
              <View className='at-col at-col-1 scroll-item-ext'>
                <View onClick={this.handleItemClick.bind(this, i)}>详情</View>
                <View onClick={this.handleItemEdit.bind(this, i)}>编辑</View>
              </View>
            </View>
          ))}
        </ScrollView>
        <AtFloatLayout isOpened={open} scrollY title='详细信息' onClose={this.handleClose}>
          <AtList>
            <AtListItem title='商品id ' extraText={currItem.id} />
            <AtListItem title='商品名称' extraText={currItem.itemName} />
            <AtListItem title='品类' extraText={currItem.categoryName} />
            <AtListItem title='商品状态' extraText={currItem.mryxItemInfoStatusDesc} />
            <AtListItem title='创建人' extraText={currItem.createUserName} />
            <AtListItem title='更新者' extraText={currItem.updateUserName} />
            <AtListItem title='创建时间' extraText={parseTime(currItem.createTime)} />
            <AtListItem title='更新时间' extraText={parseTime(currItem.updateTime)} />
            <View className='at-row line scroll-item'>
              <Text className='at-col at-col-11' />
              <View className='at-col at-col-1 scroll-item-ext'>
                <View>详情</View>
                <View>编辑</View>
              </View>
            </View>
          </AtList>
        </AtFloatLayout>
      </View>
    );
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>;
