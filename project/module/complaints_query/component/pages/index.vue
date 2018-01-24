<template>
  <div style="background-color: #FFFFFF">
    <flexbox class="filter-wrap">
      <flexbox-item class="filter_content">
        <span class="filter_time">2017-11-21</span>
        <span>~</span>
        <span class="filter_time">2017-11-21</span>
      </flexbox-item>
      <div class="filter filter1" @click='showPopup = !showPopup'></div>
    </flexbox>
    <div style="margin-top: 50px">
      <div v-for="item in items" @click="itemJump">
        <span class="complaint_item_wrap">
          <img v-if="item.status === 1" class="complaint_item_img" src="../../../../assets/images/answer.png"/>
          <img v-else-if="item.status === 0" class="complaint_item_img" src="../../../../assets/images/unanswer.png"/>
          <span class="complaint_item_right">
              <span class="complaint_item_right_top_title">{{item.title}}</span>
              <span class="complaint_item_right_top_time">投诉时间：{{item.timeStr}}</span>
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
          <span class="time-filter" @click="chooseTime(1)">
            <span style="font-size: 14px;color:#000000;flex:1">开始时间</span>
            <span class="time-select">{{startFilterTime}}</span>
            <img src="../../../../assets/images/arrow_right.png" style="width: 10px;height: 14px;"/>
          </span>
          <span style="display: flex;padding: 10px 20px 10px 0;align-items: center;"
                @click="chooseTime(2)">
            <span style="font-size: 14px;color:#000000;flex:1">结束时间</span>
            <span class="time-select">{{endFilterTime}}</span>
            <img src="../../../../assets/images/arrow_right.png" style="width: 10px;height: 14px;"/>
          </span>
        </div>
        <div style="margin-top: 10px;width: 100%;height: 35px;display: inline-flex;margin-bottom: 10px">
          <button class="btn-cancel" @click="showPopup= !showPopup">取消</button>
          <button class="btn-confirm" @click="showPopup= !showPopup">确定</button>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  import { getComplaintsQueryList } from '../../api/request'
  import Flexbox from '../../../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../../../node_modules/vux/src/components/flexbox/flexbox-item'
  import XImg from '../../../../../node_modules/vux/src/components/x-img/index'
  import Popup from '../../../../../node_modules/vux/src/components/popup/index'
  import Checker from '../../../../../node_modules/vux/src/components/checker/checker'
  import CheckerItem from '../../../../../node_modules/vux/src/components/checker/checker-item.vue'
  import 'vux/src/components/datetime/style.less'
  export default {
    data(){
      return {
        showPopup: false,
        items: [],
        startFilterTime: '2017-11-21',
        endFilterTime: '2017-11-22',
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
      let me = this;
      getComplaintsQueryList(this, null, (succ) => {
        this.$vux.toast.text('succ', 'bottom')
        me.items = succ
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
      cancelClick(){
      },
      confirmClick(){
      },
      //列表项跳转
      itemJump(){
        this.$router.push({path: '/detail'})
      },
      chooseTime (which) {
        let that = this;
        let temp = (which === 1) ? that.startFilterTime : that.endFilterTime;
        that.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: temp,
          onConfirm (val) {
            if (which === 1) {
              that.startFilterTime = val;
            } else if (which === 2) {
              that.endFilterTime = val;
            }
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .filter-wrap {
    top: 0;
    position: absolute;
    background-color: #EFEFF4;
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

  .filter1 {
    margin-right: 12px;
  }

  .complaint_item_wrap {
    display: flex;
    flex-direction: row;
    padding: 18.5px 25px 15px 25px;
    justify-content: center;
    align-items: center;
  }

  .complaint_item_right {
    margin-left: 10px;
    flex-direction: column;
    flex: 1;
    display: flex;
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
    margin-top: 10px;
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

  .time-filter {
    display: flex;
    padding: 10px 20px 10px 0;
    align-items: center;
    border-bottom: 1px solid rgba(229, 229, 229, 0.5);
  }

  .checker-wrapper {
    padding: 12px 20px;
    background-color: white;
  }

  .time-select {
    /*flex: 1*/
    margin-right: 10px;
    color: #888888;
    font-size: 14px;
  }

  .btn-cancel {
    border: none;
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
    border: none;
  }
</style>
