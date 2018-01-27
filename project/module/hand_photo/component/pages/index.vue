<template>
  <div>
    <div style="padding: 0 0 0 0; background-color: #ffffff;align-items: center;display: block;">
     <span style="display: flex;padding: 10px 20px 10px 20px;align-items: center">
            <span style="font-size: 15px;color:#000000;margin-right: 20px;font-family:PingFangSC-Regular;">投诉标题</span>
       <input type="text" class="dirty-style"
              placeholder="请输入投诉标题" v-model="inputValue" maxlength="20" oninput="if(value.length>20)value=value.slice(0,20)"/>
     </span>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <span style="display: flex;padding: 10px 20px 10px 20px;align-items: center">
            <span style="font-size: 15px;color:#000000;margin-right: 20px;font-family:PingFangSC-Regular;">现场位置</span>
            <input class="dirty-style" placeholder="请输入现场位置" v-model="location"/>
     </span>
      <x-textarea :max="200" placeholder="请描述现场污染情况" @on-focus="onEvent('focus')"
                  @on-blur="onEvent('blur')"></x-textarea>
      <!--<div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>-->
      <!--<div class="uploader">图片/视频</div>-->
      <div class="page">
        <div class="page__bd">
          <div class="weui-gallery" id="gallery">
            <span class="weui-gallery__img" id="galleryImg"></span>
            <div class="weui-gallery__opr">
              <a href="javascript:" class="weui-gallery__del">
                <i class="weui-icon-delete weui-icon_gallery-delete"></i>
              </a>
            </div>
          </div>

          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <p class="weui-uploader__title" style="font-size: 15px;color:#000000;margin-right: 20px;font-family:PingFangSC-Regular;">图片上传</p>
                    <!--<div class="weui-uploader__info">0/2</div>-->
                  </div>
                  <div class="weui-uploader__bd">
                    <ul class="weui-uploader__files" id="uploaderFiles">
                    </ul>
                    <div class="weui-uploader__input-box">
                      <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*;audio/*"
                             capture="camera" multiple/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <span style="display: flex;padding: 10px 20px 10px 20px;align-items: center">
            <span style="font-size: 15px;color:#000000;margin-right: 20px;font-family:PingFangSC-Regular;">联系电话</span>
            <input class="dirty-style" placeholder="请输入联系方式" />
     </span>
      <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
      <span style="display: flex;padding: 10px 20px 10px 20px;align-items: center">
            <span style="font-size: 15px;color:#000000;margin-right: 35px; font-family:PingFangSC-Regular;">联系人</span>
            <input class="dirty-style" placeholder="请输入联系人"/>
     </span>

    </div>
    <x-button class="btn-confirm" @click="this.submit">
      上报
    </x-button>
  </div>
</template>
<script>
  //  import weui from '../../static/js/weui.min';
  //  import $ from 'jquery';
  import { mapState, mapActions } from 'vuex'
  import { getWaterOpenList } from '../../api/request'
  import XTextarea from '../../../../../node_modules/vux/src/components/x-textarea/index.vue'
  import XButton from '../../../../../node_modules/vux/src/components/x-button/index'
  import handleEvent from './handleEvent.js';
  import XInput from '../../../../../node_modules/vux/src/components/x-input/index'
  export default {

    components: {
      XInput,
      XTextarea,
      XButton,
    },
    mounted() {
      let me = this;
      getWaterOpenList(this, null, (succ) => {
        me.waterOpenList = succ;
      }, (err) => {
      })
    },
    data() {
      return {
        waterOpenList: [],
        inputValue: '',
        location: '',
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    },
    methods: {
      submit(e){
        console.log(this.inputValue);
        console.log(this.location);
      }
    }
  }
</script>
<style lang="less" scoped>
  .dirty-style {
    flex: 1;
    margin-right: 10px;
    color: #888888;
    font-size: 15px;
    font-family:PingFangSC-Regular;
    border: none;
  }
  input::-webkit-input-placeholder{
    font-family:PingFangSC-Regular;
    color: #B2B2B2;
    font-size: 15px;
  }
  input:-moz-placeholder{
    font-family:PingFangSC-Regular;
    color: #B2B2B2;
    font-size: 15px;
  }
  input:-ms-input-placeholder{
    font-family:PingFangSC-Regular;
    color: #B2B2B2;
    font-size: 15px;
  }
  x-textarea::-webkit-input-placeholder{
    font-family:PingFangSC-Regular;
    color: #B2B2B2;
    font-size: 15px;
  }

  .dirty-location {
    margin-left: 80px;
    flex: 1;
    margin-right: 10px;
    color: #888888;
    font-size: 15px;
    border:none;
  }

  .dirty-disc {
    margin-left: 20px;
    color: #000000;
    font-size: 15px;
  }

  .uploader {
    font-size: 14px;
    color: #000000;
    margin-left: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
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
  .mark-img{
    width:11px;
    height:15px;
  }
</style>
