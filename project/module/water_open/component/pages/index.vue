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
      <div class="water-item" :id="item.index" @click="enterDetail">
        <div>
          <div class="water-item-icon">I</div>
          <div>
            <div class="item-time">监测时间 {{item.time}}</div>
            <div class="item-position"><i class="fa fa-map-marker" aria-hidden="true"></i> 行政区域 {{item.position}}</div>
          </div>
        </div>
        <div class="water-name">{{item.name}}</div>
      </div>
    </div>
    <LetterSection :letters="letterList" @onCurrentLetter="currentLetter"></LetterSection>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getWaterOpenList } from "../../api/request";
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
    getWaterOpenList(
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
      letter === this.letterList[0]&& $('body,html').animate({scrollTop:0},100);
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
          name: "增江"
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

.water-item > div {
  display: flex;
}

.water-item {
  background-color: white;
  padding: 15px 22px 15px 10px;
  width: 95%;
  border-radius: 10px;
  margin: 5px 0 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .water-item-icon {
    width: 50px;
    height: 50px;
    background-color: #35bbe0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
  }
  .water-item-icon + div {
    margin-left: 15px;
    font-size: 14px;
    color: #222222;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item-position {
      color: #999999;
    }
  }
  .water-name {
    color: #222222;
    font-size: 16px;
  }
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
</style>
