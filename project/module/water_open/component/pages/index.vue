<template>
  <div>
    <div class="time-filter">
      <i class="fa" aria-hidden="true"></i>
      <p>2017-09</p>
      <i class="fa fa-filter" aria-hidden="true"></i>
    </div>
    <div class="container" v-for="item in waterOpenList">
      <div class="water-item" :id="item.index">
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
  import {mapState} from 'vuex'
  import {getWaterOpenList} from '../../api/request'
  import LetterSection from "~/components/letter-section"

  export default {
    components: {
      XHeader,
      LetterSection
    },
    mounted() {
      let me = this;
      getWaterOpenList(this, null, (succ) => {
        let tempArr = [];
        me.waterOpenList = succ.sort(this.sortList);
        me.waterOpenList.map((val) => {
          tempArr.push(val.index)
        });
        me.letterList = [...new Set(tempArr)]; // 数组去重
      }, (err) => {
        console.log(err);
      })
    },
    data() {
      return {
        waterOpenList: [],
        letterList: []
      }
    },
    methods: {
      sortList(a, b) {
        // 根据字母排序
        return a.index.charCodeAt(0) - b.index.charCodeAt(0);
      },
      currentLetter(letter) {
        let target = document.getElementById(letter);
        if (target) {
          target.scrollIntoView();
        }
      }
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    }
  }
</script>

<style lang="less" scoped>
  @sectionBack: #F7F8FA;
  @sectionChoose: #4379CE;
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
      background-color: #35BBE0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: white;
    }
    .water-item-icon + div {
      margin-left: 15px;
      font-size: 16px;
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
      font-size: 19px;
    }
  }

  .time-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 19px;
    padding: 10px 10px 0;
    i {
      color: #999999;
    }
  }
</style>
