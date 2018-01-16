<template>
  <div class="container">
    <div class="icon_bg"></div>
    <div class="content">
      <div class="item" v-for="(item,index) in data" :key="index" @click="enterDetail()">
        <p class="title">{{item.title}}</p>
        <p class="content1">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { getKnowledgeList } from "../../api/request";

  export default {
    mounted() {
      let me = this;
      getKnowledgeList(
        this,
        null,
        succ => {
          console.log(succ)
          me.data = succ
        },
        err => {
          console.log(err);
        }
      );
    },
    data() {
      return {
        data: []
      };
    },
    methods: {
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
  .container {
    width: 100%;
    height: 100%;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon(@url: "../../../../assets/images/icon_river_title_0.png") {
    background: url(@url) no-repeat;
    background-size: cover;
  }

  .icon_bg {
    .icon("../../../../assets/images/ic_water_bg.png");
    width: 100%;
    height: 144px;
  }

  .content {
    padding: 10px;
    .item {
      margin: 10px 0;
      background-color: white;
      border-radius: 5px;
      padding: 16px 12px;
      color: #999999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
      .icon_1 {
        flex: 1;
        background-color: #222222;
        width: 49px;
        height: 59px;
      }
      .title {
        font-size: 16px;
        color: #222222;
        margin-bottom: 8px;
        line-height: 22.5px;
      }
      .content1 {
        font-size: 13px;
        color: #999999;
        line-height: 18.5px;
      }
    }
  }
</style>
