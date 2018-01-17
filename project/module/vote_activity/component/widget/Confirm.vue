<template>
  <div>
    <!--<transition :name="">-->
    <div class="mask-container" v-show="show" @click="">
    </div>
    <div class="dialog-container" v-show="show">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div @click="_hide" class="buttonText">{{buttonText}}</div>
    </div>
    <!--</transition>-->
  </div>
</template>
<script>
  export default{
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      title: {
        type:String,
        default:'提示'
      },
      content: {
        type:String,
        default:'你确定要关闭吗？ '
      },
      buttonText: {
        type: [String, Number],
        default: 'confirm'
      },
      show: {
        type: Boolean,
        default: false
      },
    },
    methods:{
      _hide(){
        this.show= false
      }
    }
  }
</script>
<style lang="less" scoped>
  .mask-container {
    position: fixed;
    left: 0;
    top: 0;
    right:0;
    bottom:0;
    background-color: #000000;
    opacity: 0.8;
  }

  .dialog-container {
    position: absolute;
    width: 80%;
    left:50%;
    top: 50%;
    justify-content: center;
    align-items: center;
  }
  .title{
    font-size: 18px;
    color: #f0f9eb;
  }
  .content{
    font-size: 15px;
    color: #888888;
  }
  .buttonText{
    font-size: 18px;
    color: #398DEE;
  }
</style>
