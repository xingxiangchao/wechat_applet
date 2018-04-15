// pages/list/list.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
};
const dayMap = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
Page({
  data: {
    weekWeather:[1,2,3,4,5,6,7],
    city:'广州市'
  },
  onLoad(option) {
    this.setData({
      city: option.city
    })
    this.getWeekWeather();
  },
  onPullDownRefresh() {
    this.getWeekWeather(() => {
      wx.stopPullDownRefresh()
    })
  },
  getWeekWeather: function (callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: this.data.city,
        time:new Date().getTime()
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        let result = res.data.result;
        this.setWeekWeather(result);
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setWeekWeather(result) {
    let weekWeather = [];
    for (let i = 0; i < 7; i ++) {
      let date = new Date();
      date.setDate(date.getDate() + i)
      weekWeather.push({
        day : dayMap[date.getDay()],
        date:`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`,
        iconPath: '/images/' + result[i].weather + '-icon.png'
      })
    }
    weekWeather[0].day = '今天'
    this.setData({
      weekWeather
    });
  },
})