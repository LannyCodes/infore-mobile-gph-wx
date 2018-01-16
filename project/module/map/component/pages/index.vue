<template>
  <div class="container">
    <div id="map-container" class="map"></div>
  </div>
</template>
<script>
  import Geo from "../../js/geo"
  //在页面中引入高德地图
  export default {
    mounted() {
      Geo.initMap(this);

    },
  }
</script>
<style lang="less">

  .map {
    width: 100%;
    height: 400px;
  }
</style>
