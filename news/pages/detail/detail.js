// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: ''
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
        this.setNewsInfo(result);
      },
      complete: () => {
        callback && callback()
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
  }
})