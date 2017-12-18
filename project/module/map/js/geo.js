import AMap from 'AMap';

class Geo {

  static initMap(context) {
    let me = this;
    let map, geolocation, marker;
    let lineArr = [];
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('map-container', {
      resizeEnable: true
    });


    marker = new AMap.Marker({
      map: map,
      position: [116.397428, 39.90923],
      icon: "https://webapi.amap.com/images/car.png",
      offset: new AMap.Pixel(-26, -13),
      autoRotation: true
    });

    marker.on('moving',function(e){
      passedPolyline.setPath(e.passedPath);
    })
    map.setFitView();

    var passedPolyline = new AMap.Polyline({
      map: map,
      // path: lineArr,
      strokeColor: "#F00",  //线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 3,      //线宽
      // strokeStyle: "solid"  //线样式
    });

    map.plugin(["AMap.Geolocation"], function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      });
      map.addControl(geolocation);
      geolocation.watchPosition();
      AMap.event.addListener(geolocation, 'complete', function (data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        if (data.accuracy) {
          str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        console.log(str);
        lineArr.push([data.position.getLng(), data.position.getLat()]);
      });//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    //解析定位错误信息
    function onError(data) {
      console.log(data)
    }
  }
}

export default Geo;
