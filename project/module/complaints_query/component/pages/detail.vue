<template>
  <div>
    <div class="complaint_content_wrapper">
      <div class="content_top">
        <span class="text">投诉内容</span>
        <span class="complaints_time">投诉时间 2017-11-21 8:20</span>
      </div>
      <div class="complaint_content">
        看了历史留言沙河涌问题由来已久，主要责任在同和片雨污 未分流，请有了原因难道就不解决了吗？有没有具体的方案 和时间表，雨天臭，不下雨也臭，可能不一定完全是这原因 吧？亚运会花那么大代价整治就这结果如何让民众满意？
      </div>
    </div>
    <div class="complaint_audio_wrapper">
      <span class="_text">图片/视频</span>
      <div class="picture-list">
        <div v-for="item in pics">
          <img class="picture-item" :src="item" @click="toggle($event)"/>
        </div>
      </div>
    </div>
    <div class="complaint_content_wrapper">
      <div class="content_top">
        <span class="text">答复内容</span>
        <span class="complaints_time">投诉时间 2017-11-21 8:20</span>
      </div>
      <div class="complaint_content">
        看了历史留言沙河涌问题由来已久，主要责任在同和片雨污 未分流，请有了原因难道就不解决了吗？有没有具体的方案 和时间表，雨天臭，不下雨也臭，可能不一定完全是这原因 吧？亚运会花那么大代价整治就这结果如何让民众满意？
      </div>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <span class="extend" @click="funExtend">
        <span style="font-size: 12px; color: #398DEE;margin-right: 5px">展开</span>
        <i class="fa fa-angle-double-down "></i>
      </span>
      <div v-if="extend" class="extendContent"></div>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <div class="confirm-unit">
        <span class="text">答复单位</span>
        <span style="color: #B2B2B2;font-size: 14px;margin-left: 7px;">2017-11-21 8:20</span>
      </div>
    </div>
    <x-button class="btn-confirm" @click="this.submit">
      关闭
    </x-button>
    <big-img v-if="show" :imgSrc="imgSrc" @clickBigImg="dismiss" ></big-img>
  </div>
</template>
<script>
  import BigImg from './bigImg.vue'
  import XButton from '../../../../../node_modules/vux/src/components/x-button/index.vue'
  import XImg from '../../../../../node_modules/vux/src/components/x-img/index'
  export default{
//    el:'',
    components: {
      XImg,
      XButton,
      BigImg
    },
    data(){
      return {
        pics: ['https://o5omsejde.qnssl.com/demo/test1.jpg',
          'https://o5omsejde.qnssl.com/demo/test2.jpg',
          'https://o5omsejde.qnssl.com/demo/test4.jpg',
          'https://o5omsejde.qnssl.com/demo/test5.jpg',
          'https://o5omsejde.qnssl.com/demo/test6.jpg',
          'https://o5omsejde.qnssl.com/demo/test7.jpg',
          'https://o5omsejde.qnssl.com/demo/test8.jpg'],
        show: false,
        imgSrc: '',
        extend:false,
      }
    },
    methods: {
      toggle(e){
        e.preventDefault();
        this.imgSrc = e.target.src;
        this.show = true;
      },
      dismiss(e){
//        e.preventDefault();
        this.show = false;
      },
      funExtend(){
        this.extend= !this.extend;
      }
    }
  }
</script>
<style lang="less" scoped>
  .complaint_content_wrapper {
    margin-top: 10px;
    background-color: #ffffff;
    flex-direction: column;
    /*padding: 12px 14px;*/
    .content_top {
      padding-top: 12px;
      padding-left: 14px;
      padding-right: 14px;
      flex-direction: row;
      .text {
        font-size: 16px;
        color: #000000;
      }
      .complaints_time {
        margin-left: 7px;
        font-size: 12px;
        color: #666666;
      }
    }
    .complaint_content {
      padding-bottom: 12px;
      padding-left: 14px;
      padding-right: 14px;
      font-size: 12px;
      color: #888888;
      line-height: 20px;
    }
  }

  .complaint_audio_wrapper {
    margin-top: 10px;
    background-color: #ffffff;
    flex-direction: column;
    padding: 12px 14px;
    ._text {
      font-size: 16px;
      color: #000000;
    }
  }

  .picture-list {
    flex-wrap: wrap;
    margin-top: 10px;
    list-style: none;
    display: flex;
  }

  .picture-item {
    margin-right: 12px;
    margin-bottom: 5px;
    width: 103px;
    height: 103px;
  }
.extend{
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
  .extendContent{
    width:auto;
    height: 50px;
    background-color: #9998ee;
  }
  .confirm-unit{
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 14px;
    padding-right: 14px;
    flex-direction: row;
  }
  .btn-confirm {
    border-radius: 5px;
    background-color: #398DEE;
    display: flex;
    width: 90%;
    height: 45px;
    font-size: 16px;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
    color: white;
  }
</style>
