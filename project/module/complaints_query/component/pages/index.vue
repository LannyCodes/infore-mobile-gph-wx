<template>
  <div>
    桂畔海投诉查询
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import {requestMainData} from '../../api/request'

  export default {
    mounted() {
      console.log(this.router);
      requestMainData(this, null, (succ) => {
        this.$vux.toast.text('succ', 'bottom')
      }, (err) => {
        this.$vux.toast.text('err', 'bottom')
      })
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    }
  }
</script>
