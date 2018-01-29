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
           :key="index" @click="itemMes.status === '1' ?(show = true) :jumpDetail()">
        <span class="item-title">{{itemMes.title}}</span>
        <span class="vote-time">投票时间：{{itemMes.voteTime}}</span>
        <span style="font-size: 13px;color: #999999;padding-left: 15px;margin-top: 5px;">尊敬的市民，您好！</span>
        <span class="content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{itemMes.content}}</span>
        <div v-if="itemMes.status === '0'" class="separate-line"></div>
        <div v-if="itemMes.status === '0'" class="vote-container">
          <div class="voting">
            <span style="font-size: 14px; color: #586C94; line-height:20px;">立即参与</span>
            <img src="../../../../assets/images/arrow_right.png" class="to-vote"/>
          </div>
          <img class="voting-img" src="../../../../assets/images/voting.png"/>
        </div>
        <img v-else-if="itemMes.status === '1'" class="voted-img" src="../../../../assets/images/voted.png"/>
      </div>
    </div>
    <div v-transfer-dom>
      <alert v-model="show" :title="'提示'" @on-show="onShow" @on-hide="onHide" buttonText="确定">当前活动已结束</alert>
    </div>
    <!--<confirm v-model="show"></confirm>-->
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
          <span style="display: flex;padding: 10px 20px 10px 0;"  @click="chooseTime(2)">
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
  import{ getVoteActivityList } from '../../api/request';
  import Flexbox from '../../../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../../../node_modules/vux/src/components/flexbox/flexbox-item'
  import Popup from '../../../../../node_modules/vux/src/components/popup/index'
  import Alert from '../../../../../node_modules/vux/src/components/Alert/index'
  import Confirm from '../widget/Confirm.vue'
  import 'vux/src/components/datetime/style.less'
  export default{
    data(){
      return {
        showPopup: false,
        messages: [],
        show: false,
        startFilterTime: '2017-11-21',
        endFilterTime: '2017-11-22',
      }
    },
    components: {
      FlexboxItem,
      Flexbox,
      Popup,
      Alert,
      Confirm,
    },
    computed: {
      ...mapState({
        dataList: state => state.list,
      })
    },
    mounted(){
      getVoteActivityList(this, null, (success) => {
        this.messages = success;
      }, (error) => {
        console.log(error.code);
      }, () => {

      })
    },
    methods: {
      jumpDetail(item){
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

  .item-title {
    line-height: 24px;
    margin-left: 15px;
    font-size: 17px;
    color: #222222;
  }

  .vote-time {
    line-height: 18.5px;
    margin-left: 15px;
    font-size: 13px;
    color: #666666;
  }

  .content {
    line-height: 18.5px;
    padding-right: 70px;
    margin-bottom: 5px;
    /*margin-top: 5px;*/
    margin-left: 15px;
    font-size: 13px;
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
    margin-left: 10px;
    width: 10px;
    height: 12.5px;
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
</style>
