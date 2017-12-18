<template>
  <div>
    <div v-for="item in waterOpenList">
      <div>{{item.name}}</div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {getWaterOpenList} from '../../api/request'

  export default {
    mounted() {
      let me = this;
      getWaterOpenList(this, null, (succ) => {
        console.log(succ);
        me.waterOpenList = succ;
      }, (err) => {
        console.log(err);
      })
    },
    data() {
      return {
        waterOpenList: []
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    }
  }
</script>
