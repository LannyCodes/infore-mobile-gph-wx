<template>
  <div id="app">
    <group-title>信息公开</group-title>
    <grid :cols="3">
      <grid-item class="grid-item" v-for="(item,index) in info_open" :key="index">
        <span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>
      </grid-item>
    </grid>
    <group-title>随手拍</group-title>
    <grid :cols="2">
      <grid-item class="grid-item" v-for="(item,index) in hand_photo" :key="index">
        <span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>
      </grid-item>
    </grid>
    <group-title>公众参与</group-title>
    <grid :cols="2">
      <grid-item class="grid-item" v-for="(item,index) in people_in" :key="index">
        <span class="grid-center" @click="_enterModule(item.module)">{{item.label}}</span>
      </grid-item>
    </grid>
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
          {label: "降雨分布", module: "rain_distribution"},
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
        ]
      }
    },
    methods: {
      _enterModule(module) {
        const _lr = window.location.href.replace(/\*/g, module);
        window.location.href = _lr
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
</style>
