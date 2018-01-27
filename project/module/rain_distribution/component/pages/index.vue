<template>
  <div>
    <div v-transfer-dom>
      <popup class="pop-filter" v-model="showFilter" position="top">
        <div>
          <div style="margin: 10px 15px">行政区域</div>
          <checker
            class="type-checker"
            default-item-class="type-checker-item"
            selected-item-class="type-checker-item-selected"
            disabled-item-class="type-checker-item-disabled">
            <checker-item value="0" @on-item-click="onItemClick">全部</checker-item>
            <checker-item value="1" @on-item-click="onItemClick">大良</checker-item>
            <checker-item value="2" @on-item-click="onItemClick">容桂</checker-item>
            <checker-item value="3" @on-item-click="onItemClick">伦教</checker-item>
            <checker-item value="4" @on-item-click="onItemClick">勒河</checker-item>
            <checker-item value="5" @on-item-click="onItemClick">陈村</checker-item>
            <checker-item value="7" @on-item-click="onItemClick">君安</checker-item>
            <checker-item value="8" @on-item-click="onItemClick">杏坛</checker-item>
            <checker-item value="9" @on-item-click="onItemClick">龙江</checker-item>
            <checker-item value="10" @on-item-click="onItemClick">乐从</checker-item>
            <checker-item value="11" @on-item-click="onItemClick">北滘</checker-item>
          </checker>
          <div class="popup_wrapper_disc">查询时间段</div>
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
        </div>
        <div style="margin-top: 10px;width: 100%;height: 35px;display: inline-flex;margin-bottom: 10px">
          <button class="btn-cancel" @click="showFilter=!showFilter">取消</button>
          <button class="btn-confirm" @click="showFilter=!showFilter">确定</button>
        </div>
      </popup>
    </div>

    <div class="time-filter">
      <i class="fa" aria-hidden="false"></i>
      <p>{{startFilterTime}} ~ {{endFilterTime}}</p>
      <div class="filter" @click="showFilter=!showFilter"></div>
    </div>
    <div class="container" v-for="(item,index) in waterOpenList" :key="index">
      <div class="rain-item" :id="item.index" @click="enterDetail">
        <div>
          <div class="row">
            <div class="item-name">{{item.name}}</div>
            <div :class="selectIcon(item.variety)"></div>
          </div>
          <p style="font-size: 13px;line-height:18.5px;margin-top: 10px;">行政区域 {{item.position}}</p>
        </div>
        <div>
          <div class="row">
            <div>
              <p class="item-rainsize">{{item.rainsize}}</p>
              <p style="font-size: 13px;line-height: 18.5px;margin-top: 5px">累计降雨量</p>
            </div>
          </div>
          <p style="line-height: 16.5px;font-size: 12px;margin-top: 5px">{{item.starttime}}至</p>
          <p style="line-height: 16.5px;font-size: 12px;margin-top: 5px">{{item.endtime}}</p>
        </div>
      </div>
    </div>
    <LetterSection :letters="letterList" @onCurrentLetter="currentLetter"></LetterSection>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { getRainDistributionList } from "../../api/request";
  import LetterSection from "~/components/letter-section";
  import TransferDom from "vux/src/directives/transfer-dom/index.js";
  import Popup from "vux/src/components/popup/index.vue";
  import Checker from "vux/src/components/checker/checker.vue";
  import CheckerItem from "vux/src/components/checker/checker-item.vue";
  import XButton from "vux/src/components/x-button/index";
  import Flexbox from "vux/src/components/flexbox/flexbox.vue";
  import FlexboxItem from "vux/src/components/flexbox/flexbox-item.vue";
  import 'vux/src/components/datetime/style.less'
  export default {
    directives: {
      TransferDom
    },
    components: {
      LetterSection,
      Popup,
      Checker,
      CheckerItem,
      XButton,
      Flexbox,
      FlexboxItem
    },
    mounted() {
      let me = this;
      getRainDistributionList(
        this,
        null,
        succ => {
          let tempArr = [];
          me.waterOpenList = succ.sort(this.sortList);
          me.waterOpenList.map(val => {
            tempArr.push(val.index);
          });
          me.letterList = [...new Set(tempArr)]; // 数组去重
        },
        err => {
          console.log(err);
        }
      );
    },
    data() {
      return {
        waterOpenList: [],
        letterList: [],
        showFilter: false,
        startFilterTime: '2017-11-21',
        endFilterTime: '2017-11-22',
      };
    },
    methods: {
      sortList(a, b) {
        // 根据字母排序
        return a.index.charCodeAt(0) - b.index.charCodeAt(0);
      },
      currentLetter(letter) {
        letter === this.letterList[0] && $('body,html').animate({scrollTop: 0}, 100);
        let target = document.getElementById(letter);
        if (target) {
          target.scrollIntoView();
        }
      },
      onItemClick(value, disabled) {
        console.log(value, disabled);
      },
      enterDetail() {
        this.$router.push({
          name: "Detail",
          query: {
            name: "伦教"
          }
        });
      },
      chooseTime (which) {
        let that = this;
        let temp = (which === 1) ? that.startFilterTime : that.endFilterTime;
        that.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH:00',
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
      selectIcon(variety){
        let vary;
        switch (variety){
          case 1:
            vary = 'icon_1';
            break;
          case 2:
            vary = 'icon_2';
            break;
          case 3:
            vary = 'icon_3';
            break;
          case 4:
            vary = 'icon_4';
            break;
        }
        return vary;
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path
      })
    }
  };
</script>

<style lang="less" scoped>
  @sectionBack: #f7f8fa;
  @sectionChoose: #4379ce;
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 10px 10px 0;
    i {
      color: #999999;
    }
  }

  .pop-filter {
    color: #888888;
    background-color: #f0eff5;
    .type-checker {
      background-color: white;
      padding-left: 15px;
      padding-right: 15px;
    }

    .type-checker-item {
      text-align: center;
      width: 16%;
      color: #888888;
      font-size: 14px;
      padding: 5px 10px;
      margin: 2px 0;
      line-height: 20px;
      border-radius: 2px;
    }

    .type-checker-item-selected {
      background-color: #398dee;
      color: #fff;
    }

    .type-checker-item-disabled {
      color: #999;
    }

    .location-checker {
      background-color: white;
    }

    .location-checker-item {
      width: 20%;
      margin: 5px;
      text-align: center;
      color: #888888;
      font-size: 12px;
      padding: 5px 10px;
      line-height: 18px;
      border-radius: 2px;
    }

    .location-checker-item-selected {
      background-color: #398dee;
      color: #fff;
    }

    .location-checker-item-disabled {
      color: #999;
    }
  }

  .btn-tab {
    padding: 10px 6px 10px 6px;
    .sure {
      background-color: #398dee;
      color: white;
    }
  }

  .rain-item {
    width: 96%;
    margin: 5px 0 5px 0;
    height: 140px;
    color: white;
    font-size: 13px;
    background: url("../../../../assets/images/ic_rain_bg.png") no-repeat;
    background-size: cover;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .item-name {
      font-size: 20px;
      margin-bottom: 5px;
      line-height: 33.5px;
    }
    .item-rainsize {
      font-size: 17px;
      line-height: 24px;
    }
  }

  .icon (@c){
    height: 30px;
    width: 30px;
    background: url(@c) no-repeat;
    background-size: contain;
    margin-left: 10px;
  }

  .icon_1{
    .icon("../../../../assets/images/ic_rain_2.png")
  }

  .icon_2 {
    .icon("../../../../assets/images/ic_rain_vary_1.png")
  }
  .icon_3{
    .icon("../../../../assets/images/ic_rain_vary_2.png")
  }
  .icon_4{
    .icon("../../../../assets/images/ic_rain_vary_3.png")
  }

  .time-select {
    /*flex: 1*/
    margin-right: 15px;
    color: #888888;
    font-size: 12px;
  }

  .popup_wrapper_disc {
    font-size: 14px;
    color: #888888;
    margin-left: 20px;
    margin-top: 12px;
    margin-bottom: 12px;
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
