<template>
  <div class="container">
    <flexbox class="btn-box">
      <flexbox-item>
        <x-button type="primary">开始记录</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn">停止记录</x-button>
      </flexbox-item>
    </flexbox>
    <div id="map-container" class="map"></div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {Flexbox, FlexboxItem} from "vux/src/components/flexbox";
  import XButton from "vux/src/components/x-button/index.vue";
  import Geo from "../../js/geo"
  //在页面中引入高德地图

  export default {
    components: {
      XButton,
      Flexbox,
      FlexboxItem
    },
    mounted() {
      Geo.initMap(this);

    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    },
    methods: {}
  }
</script>
<style lang="less">
  .container {
    height: 100%;
    width: 100%;
  }

  .btn-box {
    padding: 10px;
  }

  .map {
    width: 100%;
    height: 600px;
  }
</style>
