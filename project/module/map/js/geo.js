import AMap from 'AMap';

class Geo {
  static initMap(context) {
    let map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('map-container', {
      resizeEnable: true,
      zoomEnable:false,
      dragEnable: false,
    });
    map.plugin(["AMap.Geolocation"], function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000,  //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,  //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB',
      });
      map.addControl(geolocation);
      geolocation.watchPosition();
    });
  }
}

export default Geo;
