<template>
  <div style="background-color: #FFFFFF">
    <flexbox class="filter-wrap">
      <flexbox-item class="filter_content">
        <p>{{startFilterTime}} ~ {{endFilterTime}}</p>
      </flexbox-item>
      <div class="filter filter1" @click='showPopup = !showPopup'></div>
    </flexbox>
    <div class="container">
      <div class="item-wrapper" v-for="(itemMes, index) of messages"
           :key="index" @click="jumpDetail(itemMes.status)">
        <span class="item-title">{{itemMes.title}}</span>
        <span class="item-issue">发布单位：{{itemMes.issue}}</span>
        <span class="item-issue">发布时间：{{itemMes.issueDate}}</span>
        <span style="flex-direction: row">
             <span class="vote-time">投票期限：{{itemMes.voteStart}}</span>
             <span style="font-size: 12px;color: #666666;">~{{itemMes.voteEnd}}</span>
        </span>
        <div class="separate-line"></div>
        <div class="vote-container">
          <div class="voting">
            <span style="font-size: 12px; color: #586C94;">立即查看</span>
            <img src="../../../../assets/images/arrow_right.png" class="to-vote"/>
            <img v-if="itemMes.status === '0'" class="voting-img" src="../../../../assets/images/participated.png"/>
            <img v-else-if="itemMes.status === '1'" class="voted-img"
                 src="../../../../assets/images/unparticipate.png"/>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="showPopup" @on-hide="" @on-show="" position="top">
      <div class="popup-wrapper">
        <span class="popup_wrapper_disc">投票期限</span>
        <div style="padding: 0 0 0 20px; background-color: #ffffff;align-items: center">
          <span style="display: flex;padding: 10px 20px 10px 0;" @click="chooseTime(1)">
            <span style="font-size: 14px;color:#000000;flex:1">开始时间</span>
            <span class="time-select">{{startFilterTime}}</span>
            <img src="../../../../assets/images/arrow_right.png" style="width: 10px;height: 14px;"/>
          </span>
          <div style="height: 1px;width: auto; background:rgba(229,229,229,0.5)"></div>
          <span style="display: flex;padding: 10px 20px 10px 0;" @click="chooseTime(2)">
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
  import{ getVoteHistoryList } from '../../api/request';
  import Flexbox from '../../../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../../../node_modules/vux/src/components/flexbox/flexbox-item'
  import Popup from '../../../../../node_modules/vux/src/components/popup/index'
  import 'vux/src/components/datetime/style.less'
  export default{
    data(){
      return {
        showPopup: false,
        messages: [],
        startFilterTime: '2017-11-21',
        endFilterTime: '2017-11-22',
      }
    },
    components: {
      FlexboxItem,
      Flexbox,
      Popup,
    },
    computed: {
      ...mapState({
        dataList: state => state.list,
      })
    },
    mounted(){
      getVoteHistoryList(this, null, (success) => {
        this.$vux.toast.text('succ', 'bottom');
        this.messages = success;
      }, (error) => {
        this.$vux.toast.text('err', 'bottom');
        console.log(error.code);
      }, () => {

      })
    },
    methods: {
      jumpDetail(status){
        this.$router.push({
          name: 'Detail',
          path: '/detail',
          params: {'hasParticipate': status}
        })
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

  .time-select {
    margin-right: 10px;
    color: #888888;
    font-size: 12px;
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

  .container {
    background-color: #F0EFF5;
    margin-top: 50px;
  }

  .item-wrapper {
    position: relative;
    padding-top: 12px;
    display: flex;
    width: auto;
    height: auto;
    background-color: #FFFFFF;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .item-issue {
    line-height: 20px;
    margin-left: 15px;
    font-size: 12px;
    color: #666666;
    font-weight: 100;
  }

  .vote-time {
    /*line-height: 20px;*/
    margin-left: 15px;
    font-size: 12px;
    color: #666666;
  }

  .content {
    padding-right: 50px;
    margin-bottom: 10px;
    margin-top: 7px;
    margin-left: 15px;
    font-size: 12px;
    color: #999999;
  }

  .separate-line {
    opacity: .5;
    width: 100%;
    height: 1px;
    margin-left: 15px;
    background-color: #E5E5E5;

  }

  .vote-container {
    justify-content: center;
    align-items: center;
    position: relative
  }

  .voting {
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .to-vote {
    margin-left: 8px;
    width: 10px;
    height: 12px;
    resize: both;
  }

  .voting-img {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    height: 100%;
    resize: both;
  }

  .voted-img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: auto;
    height: 42px;
    resize: both;
  }

  .item-title {
    margin-left: 15px;
    font-size: 16px;
    color: #222222;
    font-weight: 100;
  }
</style>
