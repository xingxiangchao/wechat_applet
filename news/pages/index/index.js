//index.js
// 引入公共文件
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

const tabTitle = [{
  id: 0,
  text: '国内',
  flag: 'gn'
}, {
  id: 1,
  text: '国际',
  flag: 'gj'
}, {
  id: 2,
  text: '财经',
  flag: 'cj'
}, {
  id: 3,
  text: '娱乐',
  flag: 'yl'
}, {
  id: 4,
  text: '军事',
  flag: 'js'
}, {
  id: 5,
  text: '体育',
  flag: 'ty'
}, {
  id: 6,
  text: '其他',
  flag: 'other'
}];
Page({
  data: {
    barTitle: tabTitle,
    currentTab: 'gn',
    firsthotImg: '',
    firstTitle: '',
    firstSource: '',
    firstDate: '',
    firstId:'',
    newsList: '',
    newsListShow: true,
    defaultImage: util.def.defaultImage,
    message: '暂无相关数据'
  },
  onLoad() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3798d6'
    });
    this.getNewsList();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom () {
  //   this.getNewsList();
  // },
  swichNav(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      });
      this.getNewsList();
    }
  },
  getNewsList(callback) {
    wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.currentTab
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let result = res.data.result;
        if (!result.length) {
          this.setNodata();
          return;
        }
        this.setFirstNews(result[0]);
        this.setNewsList(result);
      },
      fail: (res) => {
        this.setNodata();
      },
      complete: () => {
        wx.hideLoading();
        typeof callback === 'function' && callback();
      }
    })
  },
  setFirstNews(result) {
    this.setData({
      firstId: result.id,
      firsthotImg: result.firstImage || this.data.defaultImage,
      firstTitle: result.title,
      firstSource: result.source,
      firstDate: result.date.substring(11, 16)
    });
  },
  setNewsList(result) {
    let list = [];
    for (let i = 1; i < result.length; i++) {
      list.push({
        id: result[i].id,
        title: result[i].title,
        source: result[i].source,
        date: result[i].date.substring(11, 16),
        firstImage: result[i].firstImage || this.data.defaultImage
      });
      this.setData({
        newsList: list
      });
    }
  },
  setNodata(){
    this.setData({
      newsListShow: false
    });
  }
})
