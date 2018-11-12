// pages/detail/detail.js
// 引入公共文件
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    defaultImage: util.def.defaultImage,
    message: '暂无相关数据',
    noData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fff'
    });
    this.setData({
      id: option.id,
      title: '',
      source: '',
      date: '',
      readCount: '',
      content: ''
    })
    this.getNewsInfo();
  },
  getNewsInfo(callback) {
    wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let result = res.data.result;
        if (Object.keys(result).length === 0) {
          this.setNodata();
        } else {
          this.setNewsInfo(result);
        }
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
  setNewsInfo(result) {
    let text = [];
    this.setData({
      title: result.title,
      source: result.source,
      date: result.date.substring(11, 16),
      readCount: result.readCount,
      content: result.content
    })
  },
  setNodata() {
    this.setData({
      noData: false
    });
  }
})