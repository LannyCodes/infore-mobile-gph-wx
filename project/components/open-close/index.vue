<template>
  <div @click="viewClick">
    <div class="vux-1px" style="margin:0 10px;"></div>
    <div class="openorclose">
      {{content}}
      <div :class="open? 'imgOpen': 'imgClose' "></div>
    </div>
  </div>
</template>

<script>
  export default {
    watch: {
      open(newData, oldData) {
        this.content = newData ? "收起" : "展开";
      }
    },
    data() {
      return {
        content: '展开',
        open: false
      };
    },
    methods: {
      viewClick() {
        this.open = !this.open;
        this.$emit('onToggle', this.open)
      }
    }
  }
</script>

<style lang="less" scoped>
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon(@url: "") {
    background: url(@url);
    background-size: cover;
  }

  .openorclose {
    .row;
    background-color: white;
    justify-content: center;
    padding: 10px;
    font-size: 15px;
    color: #398DEE;
    .imgOpen {
      .icon("../../assets/images/icon_river_open.png");
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
    .imgClose {
      .icon("../../assets/images/icon_river_close.png");
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
  }
</style>
