<template>
  <div class="container">
    <label class="title">{{data.title}}</label>
    <div style="margin-top: 8px;">
      <label class="date">{{data.issueDate}}</label>
      <span class="author">{{data.issuePerson}}</span>
    </div>
    <img :src="data.themeImg" class="themeImg"/>
    <div v-html="data.html" :class="$style.content"></div>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  import { getKnowledgeDetail } from "../../api/request";
  export default {
    mounted() {
      let me = this;
      getKnowledgeDetail(
        this,
        null,
        succ => {
          me.data = succ
        },
        err => {
        }
      );
    },
    data() {
      return {
        data: []
      };
    },
    methods: {
//      enterDetail() {
//        this.$router.push({
//          name: "Detail",
//          query: {
//            name: "增江"
//          }
//        });
//      }
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
  .container{
    /*width:100%;*/
    /*height:100%;*/
    background-color: #ffffff;
    padding: 20px 15px 0 15px;
  }
  .title {
    font-size: 24px;
    color: #000;
    line-height: 33px;
  }
  .date{
    font-size: 15px;
    color:#888888;
    line-height: 18px;
  }
  .author{

    font-size: 15px;
    color: #576B95;
    line-height: 18px;
    margin-left: 10px;
  }
  .themeImg{
    margin-top: 30px;
    width:100%;
    height:auto;
    background-size: contain;
    border-radius: 2px;
    margin-bottom: 15px;
  }
  .content{
    /*margin-top: 15px;*/
    font-size: 17px;
    color: #111111;
    line-height: 25px;
  }
</style>
<style module>
  .content{
    margin-top: 15px;
    font-size: 17px;
    color: #111111;
    line-height: 25px;
  }
</style>
