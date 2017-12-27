<template>
  <div style="background-color: #FFFFFF">
    <flexbox class="filter-wrap">
      <flexbox-item class="filter_content">
        <span class="filter_time">2017-11-21</span>
        <span>~</span>
        <span class="filter_time">2017-11-21</span>
      </flexbox-item>
      <span class="filter" @click='filterClick'><i class="fa fa-filter" aria-hidden="true"></i></span>
    </flexbox>
    <div style="margin-top: 50px">
      <div v-for="item in items" @click="itemJump">
        <span class="complaint_item_wrap">
          <x-img class="complaint_item_img"
                 webpSrc="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=73459982,1504765409&fm=27&gp=0.jpg"></x-img>
          <span class="complaint_item_right">
            <span class="complaint_item_right_top">
              <span class="complaint_item_right_top_title">{{item.title}}</span>
              <span class="complaint_item_right_top_time">投诉时间：{{item.timeStr}}</span>
            </span>
            <span class="complaint_item_right_top_content">{{item.content}}</span>
          </span>
        </span>
        <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5);margin-left: 25px"></div>
      </div>
    </div>
    <popup v-model="showPopup" @on-hide="" @on-show="" position="top">
      <div class="popup-wrapper">
        <span class="popup_wrapper_disc">答复情况</span>
        <checker default-item-class="default-item-class" selected-item-class="selected-item-class"
                 class="checker-wrapper">
          <checker-item value="1">全部</checker-item>
          <checker-item value="2">已答复</checker-item>
          <checker-item value="3">未答复</checker-item>
        </checker>
        <span class="popup_wrapper_disc">查询时间段</span>
        <div style="padding: 0 0 0 20px; background-color: #ffffff;align-items: center">
          <span style="display: flex;padding: 10px 20px 10px 0;">
            <span style="font-size: 12px;color:#000000;flex:1">开始时间</span>
            <span class="time-select">2017-11-21</span>
            <i class="fa fa-angle-right "></i>
          </span>
          <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
          <span style="display: flex;padding: 10px 20px 10px 0;">
            <span style="font-size: 12px;color:#000000;flex:1">开始时间</span>
            <span class="time-select">2017-11-21</span>
            <i class="fa fa-angle-right "></i>
          </span>
        </div>
        <span style="margin-top: 10px;width: 100%;height: 35px;display: inline-flex;margin-bottom: 10px">
          <button class="btn-cancel" @click="cancelClick">取消</button>
          <button class="btn-confirm" @click="confirmClick">确定</button>
        </span>
      </div>
    </popup>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { requestMainData } from '../../api/request'
  import Flexbox from '../../../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../../../node_modules/vux/src/components/flexbox/flexbox-item'
  import XImg from '../../../../../node_modules/vux/src/components/x-img/index'
  import Popup from '../../../../../node_modules/vux/src/components/popup/index'
  import Checker from '../../../../../node_modules/vux/src/components/checker/checker'
  import CheckerItem from '../../../../../node_modules/vux/src/components/checker/checker-item.vue'
  export default {
    data(){
      return {
        showPopup: false,
        options: ['China', 'Japan'],
        items: [
          {img: 'xxxxx', title: '巴基斯坦', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '切格瓦拉', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '莎哟哪啦', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '巴勒斯坦', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '窃格瓦拉', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '沈从文', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '湘江北去', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '橘子洲头', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '多情自古空余恨', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'},
          {img: 'xxxxx', title: '大话西游', timeStr: '2017-11-21', content: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'}
        ]
      }
    },
    components: {
      Checker,
      CheckerItem,
      XImg,
      FlexboxItem,
      Flexbox,
      Popup
    },
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
    },
    methods: {
      filterClick(){
        this.showPopup = true;
      },
      cancelClick(){
        alert('fjeooifjo')
      },
      confirmClick(){
        alert('fewfwefw')
      },
      //列表项跳转
      itemJump(){
        this.$router.push({path: '/detail'})
      }
    }
  }
</script>
<style lang="less" scoped>
  .filter-wrap {
    top: 0;
    position: absolute;
    background-color: #E5E5E5;
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  .filter_content {
    padding-left: 50px;
    display: inline-flex;
    justify-content: center;
    flex: 1;
    align-items: center;
    flex-direction: row;

  }

  .filter_time {
    color: #222222;
    font-size: 12px;
    text-align: center;
  }

  .filter {
    display: inline-flex;
    width: 50px;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .complaint_item_wrap {
    display: inline-flex;
    flex-direction: row;
    padding: 25px 25px 20px 25px;
    justify-content: center;
    align-items: center;
    /*&_right{*/
    /**/
    /*}*/
  }

  .complaint_item_right {
    margin-left: 10px;
    flex-direction: column;
    display: inline-flex;
  }

  .complaint_item_right_top {
    flex-direction: row;
    align-items: center;
  }

  .complaint_item_right_top_title {
    color: #222222;
    font-size: 16px;
  }

  .complaint_item_right_top_time {
    margin-left: 5px;
    color: #666666;
    font-size: 12px;
  }

  .complaint_item_right_top_content {
    color: #999999;
    font-size: 12px;
  }

  .complaint_item_img {
    width: 60px;
    height: 60px;
    border-radius: 40px;
  }

  .popup-wrapper {
    background-color: #F0EFF5;
    flex-direction: column;
    display: flex;
  }

  .popup_wrapper_disc {

    font-size: 14px;
    color: #888888;
    margin-left: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .default-item-class {
    border-radius: 2px;
    padding: 5px 15px;
    background-color: #FFFFFF;
    color: #888888;
    font-size: 14px;

  }

  .selected-item-class {
    background-color: #398DEE;
    color: #FFFFFF;
    font-size: 14px;
  }

  .checker-wrapper {
    padding: 12px 20px;
    background-color: white;
  }

  .time-select {
    /*flex: 1*/
    margin-right: 10px;
    color: #888888;
    font-size: 12px;
  }

  .btn-cancel {
    font-size: 14px;
    color: #353535;
    background-color: #ffffff;
    text-align: center;
    flex: 1;
  }

  .btn-confirm {
    flex: 1;
    font-size: 14px;
    color: #FFFFFF;
    background-color: #398DEE;
    text-align: center;
    /*width: 50%*/
  }
</style>
