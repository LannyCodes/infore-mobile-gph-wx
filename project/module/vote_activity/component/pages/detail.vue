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
      <span class="item-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{msg.content}}</span>
    </div>
    <div class="text-desc">1.您对环境信息公开了解多少？</div>
    <form class="form">
      <div class="vote-item">
        <input type="radio" id="f-option"  name="selector" value="z">
        <label for="f-option">
          非常了解
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio"  id="s-option" name="selector" value="c">
        <label for="s-option">
          比较了解
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="t-option"  name="selector" value="a">
        <label for="t-option">
          了解较少
        </label>
        <div class="check"></div>
      </div>
    </form>
    <div class="text-desc">2.您了解环境信息的原因？</div>
    <form class="form">
      <div class="vote-item">
        <input type="radio" id="govSupervise"  name="reason" value="z">
        <label for="govSupervise">
          监督政府
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line"style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio"  id="invirNeed" name="reason" value="c">
        <label for="invirNeed">
          环保需要
        </label>
        <div class="check"></div>
      </div>
      <div class="separate-line" style="display: block;overflow: auto;">
      </div>
      <div class="vote-item">
        <input type="radio" id="neverGiveup"  name="reason" value="a">
        <label for="neverGiveup">
          自己的一项权利，不能放弃
        </label>
        <div class="check"></div>
      </div>
    </form>
    <x-button class="btn-confirm" @click="this.submit">
      确定
    </x-button>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import{ getVoteActivityDetail } from '../../api/request';
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
      }
    },
    methods: {
      submit(e){
        e.preventDefault();
      }
    },
    mounted(){
      getVoteActivityDetail(this, null, (success) => {
        this.$vux.toast.text('succ', 'bottom');
        this.msg = success;
      }, (error) => {
        this.$vux.toast.text('err', 'bottom');
      }, () => {

      })
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
    line-height: 18.5px;
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
    /*display: flex;*/
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 17px;
    padding: 0 0 0 20px;
    margin: 10px 10px 10px 30px;
    height: 20px;
    z-index: 9;

    /*cursor: pointer;*/
    -webkit-transition: all 0.25s linear;
  }

  .label-content{
    flex:1;
  }
  .label-count{
    font-size:13px;
    color: #666666;
    line-height:18.5px;
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
  .btn-confirm {
    border-radius: 5px;
    background-color: #398DEE;
    display: flex;
    width: 90%;
    height: 45px;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
    color: white;
  }
</style>
