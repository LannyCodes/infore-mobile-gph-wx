<template>
  <div>
    <div class="wrapper">
      <span class="item-title">{{msg.title}}</span>
      <span class="item-issue">发布单位：{{msg.issue}}</span>
      <span class="item-issue">发布时间：{{msg.issueDate}}</span>
      <span style="flex-direction: row">
             <span class="item-issue">投票期限：{{msg.voteStart}}</span>
             <span class="item-issue" style="margin-left: 0">~ {{msg.voteEnd}}</span>
      </span>
      <div class="separate-line"></div>
      <span style="font-size: 15px;color: #222222;padding-left: 15px;margin-top: 5px;">尊敬的市民，您好！</span>
      <span class="item-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{msg.content}}</span>
    </div>
    <div class="text-desc">1.您对环境信息公开了解多少？</div>
    <form class="form">
      <div class="vote-item">
        <input type="radio" id="f-option" name="selector" value="z" :checked="hasParticipate === '0'">
        <label for="f-option">
          <span class="label-content">非常了解</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="s-option" name="selector" value="c" :checked="false">
        <label for="s-option">
          <span class="label-content">比较了解</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="t-option" name="selector" value="a">
        <label for="t-option">
          <span class="label-content">了解较少</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
    </form>
    <div class="text-desc">2.您了解环境信息的原因？</div>
    <form class="form">
      <div class="vote-item">
        <input type="radio" id="govSupervise" name="reason" value="z">
        <label for="govSupervise">
          <span class="label-content">监督政府</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="invirNeed" name="reason" value="c">
        <label for="invirNeed">
          <span class="label-content">环保需要</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="neverGiveup" name="reason" value="a" :checked="hasParticipate === '0'">
        <label for="neverGiveup">
          <span class="label-content">自己的一项权利，不能放弃</span>
          <span class="label-count">285票</span>
          <span class="label-count">100%</span>
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
    </form>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import{ getVoteHistoryDetail } from '../../api/request';
  import Checker from '../../../../../node_modules/vux/src/components/checker/checker'
  import CheckerItem from '../../../../../node_modules/vux/src/components/checker/checker-item.vue'
  export default{
    components: {
      Checker,
      CheckerItem,
    },
    data(){
      return {
        testValue: false,
        msg: [],
        radio2: 3,
        hasParticipate: 1,
      }
    },
    methods: {
     getParams(){
       this.hasParticipate = this.$route.params.hasParticipate;
     }

    },
    created(){
      this.getParams();
    },
    mounted(){
      getVoteHistoryDetail(this, null, (success) => {
        this.msg = success;
      }, (error) => {
      }, () => {
      });

    },
    watch: {
      '$route'(to, from){
        console.log(to);
        console.log(from);
        this.getParams()
      }
    },
  }

</script>
<style lang="less" scoped>
  .wrapper {
    border-radius: 3px;
    margin-top: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    background-color: white;
    flex-direction: column;
  }

  .item-title {
    line-height: 24px;
    margin-left: 15px;
    font-size: 17px;
    color: #222222;
    font-weight: 100;
  }

  .item-issue {
    line-height: 20px;
    margin-left: 15px;
    font-size: 13px;
    color: #666666;
  }

  .separate-line {
    position: relative;
    opacity: .5;
    width: 100%;
    height: 1px;
    margin-left: 15px;
    background-color: #E5E5E5;
  }

  .item-content {
    padding-right: 30px;
    line-height: 21px;
    /*margin-top: 10px;*/
    margin-left: 15px;
    font-size: 15px;
    color: #222222
  }

  .text-desc {
    line-height: 20px;
    /*margin-top: 7px;*/
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    margin-left: 15px;
    color: #888888
  }

  .default-item-class {
    height: 30px;
    background: url("../../../../assets/images/Fill.png") no-repeat;
    background-size: 20px 20px;
    border-radius: 2px;
    padding: 5px 15px;

  }

  .selected-item-class {
    height: 30px;
    background: url("../../../../assets/images/full.png") no-repeat;
    background-size: 20px 20px;
    background-position: center;
  }

  .checker-wrapper {
    display: flex;
    flex-direction: column;
    padding: 12px 20px;
    background-color: white;
  }

  .form {
    display: block;
    overflow: hidden;
    background-color: white;
  }

  .vote-item {
    color: #AAAAAA;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    /*border-bottom: 1px solid #E5E5E5;*/
  }

  ul {
    background-color: white;
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
  }

  ul li {
    color: #AAAAAA;
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    border-bottom: 1px solid #E5E5E5;
  }

  .vote-item input[type='radio'] {
    position: absolute;
    visibility: hidden;
  }

  .vote-item label {
    color: #000;
    display: flex;
    /*display: block;*/
    position: relative;
    font-weight: 300;
    font-size: 17px;
    padding: 0 0 0 20px;
    margin: 10px 20px 10px 30px;
    height: 20px;
    z-index: 9;

    /*cursor: pointer;*/
    -webkit-transition: all 0.25s linear;
  }

  .label-content {
    flex: 1;
  }

  .label-count {
    margin-right: 5px;
    font-size: 13px;
    color: #666666;
    line-height: 18.5px;
  }

  .vote-item .check {
    display: block;
    position: absolute;
    background: url("../../../../assets/images/Fill.png") no-repeat;
    /*border: 5px solid #AAAAAA;*/
    /*border-radius: 100%;*/
    background-size: contain !important;
    height: 25px;
    width: 25px;
    top: 10px;
    left: 15px;
    z-index: 5;
  }

  input[type=radio]:checked ~ .check {
    background: url("../../../../assets/images/full.png") no-repeat;
  }

  /*input[type=radio]:checked ~ label {*/
  /*color: #0DFF92;*/
  /*}*/
</style>
