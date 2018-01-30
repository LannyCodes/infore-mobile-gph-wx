<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div>
    <div class="complaint_content_wrapper">
      <div class="content_top" style="padding-top: 12px">
        <span class="text">投诉标题</span>
        <span class="complaints_time">河涌垃圾</span>
      </div>
      <div class="content_top">
        <span class="text">投诉位置</span>
        <span class="complaints_time">桂畔海下游</span>
      </div>
      <div class="content_top">
        <span class="text">投诉时间</span>
        <span class="complaints_time">2017-11-21 8:20</span>
      </div>
      <div class="content_top">
        <span class="text">投诉内容</span>
      </div>
      <div class="complaint_content">
        桂畔海水利枢纽存在大量垃圾，河水脏乱臭。
      </div>
    </div>
    <div class="complaint_audio_wrapper">
      <span class="_text">图片/视频</span>
      <div class="picture-list">
        <img v-for="(item, index) in pics" class="picture-item" :src="item.src"
             @click="showMask(index)" :key="index"/>
      </div>
    </div>
    <div class="complaint_content_wrapper">
      <div class="content_top" style="padding-top: 12px">
        <span class="text">回复单位</span>
        <span class="complaints_time">顺德区环境运输和城市管理局</span>
      </div>
      <div class="content_top">
        <span class="text">回复时间</span>
        <span class="complaints_time">2017-11-21</span>
      </div>
      <div class="content_top">
        <span class="text">回复内容</span>
      </div>
      <div class="complaint_content">
        经查由于昨天下雨导致上游垃圾冲到下游，已经派人解决。
      </div>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <span class="extend" @click="openMore">
        <span style="font-size: 13px; color: #398DEE;margin-right: 5px">更多</span>
        <img src="../../../../assets/images/arrow_expand.png" style="width: 12px;height: 12px;"/>
      </span>
      <!--<div v-if="extend" class="extendContent"></div>-->
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>

    </div>

    <x-button class="btn-confirm" @click="">
      关闭
    </x-button>
    <div v-transfer-dom>
      <previewer :list="pics" ref="previewer" :options="options"></previewer>
    </div>

    <!--<big-img v-if="show" @clickBigImg="dismiss" >-->
      <!--<swiper :options="swiperOption" ref="Swiper" @click="jumpTo()">-->
        <!--<swiper-slide v-for="(item, index) in pics" style="align-self: center" :key="index">-->
          <!--<img  :src="item" class="big_img"/>-->
          <!--<video v-else-if="!isImg(item)" autoplay="none" class="__cov-video"-->
          <!--controls="controls" :poster="postUrl">-->
          <!--<source :src="imgUrl" :type="videoType"/>-->
          <!--Your browser does not support the video tag.-->
          <!--</video>-->
        <!--</swiper-slide>-->
      <!--</swiper>-->
      <!--&lt;!&ndash;<vue-video v-else-if="isImg()===true" :sources="video.sources" :options="video.options"></vue-video>&ndash;&gt;-->
    <!--</big-img>-->
  </div>
</template>
<script>
  //  import VueVideo from './VueVideo.vue'
  import'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import BigImg from './BigImg.vue'
  import XButton from '../../../../../node_modules/vux/src/components/x-button/index.vue'
  import XImg from '../../../../../node_modules/vux/src/components/x-img/index'
  import Previewer from '../../../../../node_modules/vux/src/components/Previewer/index'
  import {TransferDom } from 'vux'
  let initialIndex = 0;
  let count = 0;
  export default{
//    el:'',
    directives: {
      TransferDom
    },
    components: {
      XImg,
      XButton,
      BigImg,
//      VueVideo
      swiper,
      swiperSlide,
      Previewer,
    },
    data(){
      return {
//        list: [{
//          src: 'https://ooo.0o0.ooo/2017/05/17/591c271ab71b1.jpg',
//          w: 800,
//          h: 400
//        },
//          {
//            src: 'https://ooo.0o0.ooo/2017/05/17/591c271acea7c.jpg'
//          }, {
//            src: 'https://ooo.0o0.ooo/2017/06/15/59425a592b949.jpeg'
//          }],
        pics: [
          {
            src: 'https://o5omsejde.qnssl.com/demo/test1.jpg'
          },
          {
            src: 'https://o5omsejde.qnssl.com/demo/test2.jpg'
          },
          {
            src: 'https://o5omsejde.qnssl.com/demo/test4.jpg'
          }
//          {
//            src: 'http://vjs.zencdn.net/v/oceans.mp4',
//            type: 'video/mp4',
//            poster: 'http://covteam.u.qiniudn.com/poster.png'
//          }
        ],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.picture-item')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
//        swiperOption: {
//          initialSlide: 0,
//        },
        show: false,
        imgUrl: '',
        postUrl: '',//如果是视频，为缩略图的地址
        videoType: '',//视频类型---.rmvb .mp4 .avi .ts等
        extend: false,
      }
    },
    methods: {
      dismiss(e){
//        e.preventDefault();
        this.show = false;
      },
      openMore(){
        this.extend = !this.extend;
      },
      isImg(item){
        if (typeof item === 'string') {
//          debugger;
          this.imgUrl = item;
        } else if (typeof item === "object") {
//          debugger;
          let {src, type, poster} = item;
          this.imgUrl = src;
          this.postUrl = poster;
          this.videoType = type;
        }
        count++;
        console.log(count);
//        return this.imgUrl;
        let index = this.imgUrl.lastIndexOf('.');
        let str = this.imgUrl.substring(index);
        if (str === '.mp4' || str === '.rmvb' || str === '.avi' || str === '.ts') {//视频格式
          return false;
        } else if (str === '.bmp' || str === '.png' || str === '.gif' || str === '.jpg' || str === '.jpeg') {
          return true
        }
        return true;//默认是图片
      },
      showMask(index){
        this.$refs.previewer.show(index)
      }
    },
    mounted: {
      swiper() {
        return this.$refs.Swiper.swiper
      }
    },
    watch: {
      initialIndex(value) {
        console.log(value);
        const $swiper = this.$el.getElementsByTagName('swiper');
//        this.$refs.mySwiper.initialSlide = value;
        console.log($swiper);
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

      padding-left: 14px;
      padding-right: 14px;
      flex-direction: row;
      .text {
        font-size: 15px;
        color: #000000;
      }
      .complaints_time {
        margin-left: 7px;
        font-size: 13px;
        color: #666666;
      }
    }
    .complaint_content {
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-bottom: 12px;
      padding-left: 14px;
      padding-right: 14px;
      font-size: 13px;
      color: #888888;
      line-height: 18.5px;
    }
  }

  .complaint_audio_wrapper {
    margin-top: 10px;
    background-color: #ffffff;
    flex-direction: column;
    padding: 12px 14px 0;
    ._text {
      font-size: 15px;
      color: #000000;
    }
  }

  .picture-list {
    margin-top: 10px;
    list-style: none;
    display: inline-block;
  }

  .picture-item {
    float: left;
    margin-bottom: 7px;
    margin-right: 7px;
    width: 107px;
    height: 107px;
  }

  .extend {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .extendContent {
    width: auto;
    height: 50px;
    background-color: #9998ee;
  }

  .confirm-unit {
    padding-top: 12px;
    /*padding-bottom: 12px;*/
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
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .big_img {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100%;
  }
  .__cov-video {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

</style>
