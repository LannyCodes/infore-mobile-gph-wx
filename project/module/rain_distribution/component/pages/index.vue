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
            <checker-item value="4" @on-item-click="onItemClick">其他河涌</checker-item>
            <checker-item value="5" @on-item-click="onItemClick">其他河涌</checker-item>
            <checker-item value="6" @on-item-click="onItemClick">其他河涌</checker-item>
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
            <checker-item value="4" @on-item-click="onItemClick">伦教</checker-item>
            <checker-item value="5" @on-item-click="onItemClick">伦教</checker-item>
            <checker-item value="6" @on-item-click="onItemClick">伦教</checker-item>
          </checker>
        </div>
        <flexbox class="btn-tab">
          <flexbox-item>
            <x-button style="font-size: 15px" @click.native="showFilter=!showFilter">取消</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button style="font-size: 15px" class="sure" @click.native="showFilter=!showFilter">确定</x-button>
          </flexbox-item>
        </flexbox>
      </popup>
    </div>

    <div class="time-filter">
      <i class="fa" aria-hidden="true"></i>
      <p>2017-09</p>
      <div class="filter" @click="showFilter=!showFilter"></div>
    </div>
    <div class="container" v-for="(item,index) in waterOpenList" :key="index">
      <div class="rain-item" :id="item.index" @click="enterDetail">
        <div>
          <div class="row">
            <div class="item-name">{{item.name}}</div>
            <div class="icon_1"></div>
          </div>
          <p>行政区域 {{item.position}}</p>
        </div>
        <div>
          <div class="row">
            <div>
              <p class="item-rainsize">{{item.rainsize}}</p>
              <p>累计降雨量</p>
            </div>
            <div class="icon_2"></div>
          </div>
          <p>{{item.starttime}}至</p>
          <p>{{item.endtime}}</p>
        </div>
      </div>
    </div>
    <LetterSection :letters="letterList" @onCurrentLetter="currentLetter"></LetterSection>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import {getRainDistributionList} from "../../api/request";
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
        showFilter: false
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
    }

    .type-checker-item {
      text-align: center;
      width: 28%;
      color: #888888;
      font-size: 12px;
      padding: 5px 10px;
      margin: 5px;
      line-height: 18px;
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
    height: 120px;
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
      font-size: 25px;
      margin-bottom: 5px;
    }
    .item-rainsize {
      font-size: 15px;
    }
  }
  .icon_1 {
    height: 26px;
    width: 26px;
    background: url("../../../../assets/images/ic_rain_1.png") no-repeat;
    background-size: cover;
    margin-left: 10px;
  }
  .icon_2 {
    height: 24px;
    width: 24px;
    background: url("../../../../assets/images/ic_rain_2.png") no-repeat;
    background-size: cover;
    margin-left: 10px;
  }
</style>
