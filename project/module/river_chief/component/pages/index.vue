<template>
  <div>
    <div v-transfer-dom>
      <popup class="pop-filter" v-model="showFilter" position="top">
        <div>
          <div style="margin: 10px 15px">河道类型</div>
          <checker
            class="type-checker"
            default-item-class="type-checker-item"
            selected-item-class="type-checker-item-selected"
            disabled-item-class="type-checker-item-disabled">
            <checker-item value="0" @on-item-click="onItemClick">全部</checker-item>
            <checker-item value="1" @on-item-click="onItemClick">主河道</checker-item>
            <checker-item value="2" @on-item-click="onItemClick">内河涌</checker-item>
            <checker-item value="3" @on-item-click="onItemClick">其他河涌</checker-item>
          </checker>
          <div style="margin: 10px 15px">行政区域</div>
          <checker class="location-checker"
                   default-item-class="location-checker-item"
                   selected-item-class="location-checker-item-selected"
                   disabled-item-class="location-checker-item-disabled">
            <checker-item value="0" @on-item-click="onItemClick">全部</checker-item>
            <checker-item value="1" @on-item-click="onItemClick">大良</checker-item>
            <checker-item value="2" @on-item-click="onItemClick">容桂</checker-item>
            <checker-item value="3" @on-item-click="onItemClick">伦教</checker-item>
            <checker-item value="4" @on-item-click="onItemClick">勒流</checker-item>
            <checker-item value="5" @on-item-click="onItemClick">陈村</checker-item>
            <checker-item value="6" @on-item-click="onItemClick">君安</checker-item>
          </checker>
        </div>
        <div style="margin-top: 10px;width: 100%;height: 35px;display: inline-flex;margin-bottom: 10px">
          <button class="btn-cancel" @click="showFilter=!showFilter">取消</button>
          <button class="btn-confirm" @click="showFilter=!showFilter">确定</button>
        </div>
      </popup>
    </div>

    <div class="time-filter">
      <i class="fa" aria-hidden="true"></i>
      <p>全部</p>
      <div class="filter" @click="showFilter= !showFilter"></div>
    </div>
    <div class="container" v-for="(item,index) in riverChiefList" :key="index">
      <div :id="item.letter" class="letterText">{{item.letter}}</div>
      <div class="river-item" v-for="(subItem, index) in item.rivers" :id="index"
           @click="enterDetail(subItem.river)">
        <div class="row">
          <div class="river">{{subItem.river}}</div>
          <div style="margin-left: 10px">
            <p>{{subItem.level}} {{subItem.warden}}</p>
            <p style="color: #999999;">起 {{subItem.start}}</p>
            <p style="color: #999999;">终 {{subItem.end}}</p>
          </div>
        </div>
        <div style="color: #398DEE; margin-right: 10px" class="row">
          <div class="river-length"></div>
          <div>{{subItem.length}}m</div>
        </div>
      </div>
    </div>
    <LetterSection :letters="letterList" @onCurrentLetter="currentLetter"></LetterSection>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { getRiverChiefList } from "../../api/request";
  import LetterSection from "~/components/letter-section";
  import TransferDom from "vux/src/directives/transfer-dom/index.js";
  import Popup from "vux/src/components/popup/index.vue";
  import Checker from "vux/src/components/checker/checker.vue";
  import CheckerItem from "vux/src/components/checker/checker-item.vue";
  import XButton from "vux/src/components/x-button/index";
  import Flexbox from "vux/src/components/flexbox/flexbox.vue";
  import FlexboxItem from "vux/src/components/flexbox/flexbox-item.vue";

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
      getRiverChiefList(
        this,
        null,
        succ => {
          let tempArr = [];
          me.riverChiefList = succ.sort((a, b) => this.sortList(a, b, 'letter'));
          me.riverChiefList.map(val => {
            tempArr.push(val.letter);
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
        riverChiefList: [],
        letterList: [],
        showFilter: false
      };
    },
    methods: {
      sortList(a, b,props) {
        // 根据字母排序
        return a[props].charCodeAt(0) - b[props].charCodeAt(0);
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
      enterDetail(river) {
        this.$router.push({
          name: "Detail",
          query: {
            name: river
          }
        });
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
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
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
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 15px;
      background-color: white;
    }

    .type-checker-item {
      text-align: center;
      color: #888888;
      font-size: 14px;
      padding: 5px 18.5px 5px 18.5px;
      line-height: 20px;
      border-radius: 1px;
    }

    .type-checker-item-selected {
      background-color: #398dee;
      color: #fff;
    }

    .type-checker-item-disabled {
      color: #999;
    }

    .location-checker {
      padding-left: 15px;
      background-color: white;
    }

    .location-checker-item {
      text-align: center;
      /*width: 16%;*/
      color: #888888;
      font-size: 14px;
      padding: 5px 18.5px 5px 18.5px;
      line-height: 20px;
      border-radius: 1px;
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

  .river-item {
    width: 96%;
    margin: 5px 0 5px 0;
    color: #222222;
    font-size: 13px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .river {
      width: 80px;
      height: 80px;
      justify-content: center;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 15px;
      color: white;
      background: linear-gradient(to bottom right, #04C6D7, #5D7BEB);
      border-radius: 4px;
    }
    p {
      margin-bottom: 3px;
    }
    .river-length {
      width: 14px;
      height: 14px;
      margin-right: 3px;
      background: url("../../../../assets/images/icon_water_length.png") no-repeat;
      background-size: cover;
    }
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
  .letterText {
    align-self: flex-start;
    font-size: 15px;
    margin-left: 15px;
    color: #888888
  }
</style>
