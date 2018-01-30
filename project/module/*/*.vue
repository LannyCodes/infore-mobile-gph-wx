<template>
  <!--<div id="app">-->
  <!--<group-title>信息公开</group-title>-->
  <!--<grid :cols="3">-->
  <!--<grid-item class="grid-item" v-for="(item,index) in info_open" :key="index">-->
  <!--<span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>-->
  <!--</grid-item>-->
  <!--</grid>-->
  <!--<group-title>随手拍</group-title>-->
  <!--<grid :cols="2">-->
  <!--<grid-item class="grid-item" v-for="(item,index) in hand_photo" :key="index">-->
  <!--<span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>-->
  <!--</grid-item>-->
  <!--</grid>-->
  <!--<group-title>公众参与</group-title>-->
  <!--<grid :cols="2">-->
  <!--<grid-item class="grid-item" v-for="(item,ixndex) in people_in" :key="index">-->
  <!--<span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>-->
  <!--</grid-item>-->
  <!--</grid>-->
  <!--</div>-->
  <div id="outContainer">
    <img src="../../assets/images/1071517035610_.pic.jpg" class="coverImg"/>
    <div class="container">
      <div class="divWrp">
        <button @click="btnClick(0)" class="btn">信息公开</button>
        <div v-show="currentBtn === 0" class="itemWrp">
        <span v-for="(item,index) in info_open" :key="index" class="itemText" @click="_enterModule(item.module)">
          {{item.label}}
        </span>
        </div>
      </div>
      <div class="divWrp">
        <button @click="btnClick(1)" class="btn">随手拍</button>
        <div v-show="currentBtn === 1" class="itemWrp">
        <span v-for="(item,index) in hand_photo" :key="index" class="itemText" @click="_enterModule(item.module)">
          {{item.label}}
        </span>
        </div>
      </div>
      <div class="divWrp">
        <button @click="btnClick(2)" class="btn">公众参与</button>
        <div v-show="currentBtn === 2" class="itemWrp">
        <span v-for="(item,index) in people_in" :key="index" class="itemText" @click="_enterModule(item.module)">
          {{item.label}}
        </span>
        </div>
      </div>
      <div v-show="currentBtn >-1" class="mask" @click="dismissMask"></div>

    </div>
  </div>
</template>

<script>
  import Grid from 'vux/src/components/grid/grid.vue'
  import GridItem from 'vux/src/components/grid/grid-item.vue'
  import Group from "vux/src/components/group/index";
  import GroupTitle from "vux/src/components/group-title/index";

  export default {
    components: {
      GroupTitle,
      Group,
      Grid, GridItem
    },
    data() {
      return {
        info_open: [
          {label: "水质公示", module: "water_open"},
          {label: "气象监测", module: "rain_distribution"},
          {label: "环保常识", module: "envir_knowledge"},
          {label: "水务常识", module: "water_knowledge"},
          {label: "河长信息", module: "river_chief"}
        ],
        hand_photo: [
          {label: "随手拍", module: "hand_photo"},
          {label: "投诉查询", module: "complaints_query"}
        ],
        people_in: [
          {label: "投票活动", module: "vote_activity"},
          {label: "历史投票", module: "vote_history"}
        ],
        currentBtn: -1
      }
    },
    methods: {
      _enterModule(module) {
        const _lr = window.location.href.replace(/\*/g, module);
        window.location.href = _lr
      },
      btnClick(btnIndex){
        if (this.currentBtn === btnIndex) {
          this.currentBtn = -1;//点击同一个时消失，
          return;
        }
        this.currentBtn = btnIndex
      },
      dismissMask(){
        this.currentBtn = -1;

      }
    }
  }
</script>

<style lang="less">
  #app {
    color: #2c3e50;
  }

  .grid-item {
    background-color: white;
    color: #333;
    text-align: center;
    span {
      font-size: 15px;
    }
  }

  #outContainer{
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .container {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    color: #2c3e50;
  }

  .divWrp {
    display: flex;
    position: relative;
    flex: 1;
  }

  .btn {
    flex: 1;
    padding: 10px;
  }

  .itemWrp {
    z-index: 2;
    display: flex;
    flex-direction: column;
    bottom: 45px;
    position: absolute;
    width: 100%;
    height: auto;
    background: rgba(250, 250, 250, 1);
    border-radius: 10px 10px 10px 10px;
    box-shadow: 0 2px 4px 0 #BFBFBF;
  }

  .itemText {
    text-align: center;
    font-size: 14px;
    color: #000;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #BFBFBF;

  }

  .itemText:last-child {
    border-bottom: none;
  }

  .mask {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 45px;
    left: 0;
    right: 0;
    background-color: transparent;
    opacity: .5;
  }
  .coverImg{
    width: 90%;
    height: auto;
    background-size: contain;
  }
</style>
