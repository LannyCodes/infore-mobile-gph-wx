<template>
  <div>
    <div>
      <div class="row title">
        <div class="title1"></div>
        河长信息
      </div>
      <div class="content">
        <div v-for="(item,index) in riverChiefDetail" :key="index">
          <div v-if="index>3?isShowHZDetail:true" class="hz-item row">
            <div class="row">
              <div :class="getHZIconClass(item.level)"></div>
              <p style="">{{item.level}}</p>
            </div>
            <div>{{item.name}}</div>
            <div>{{item.tab}}</div>
          </div>
        </div>
      </div>
      <open-close @onToggle="(e)=>{isShowHZDetail=e}"></open-close>
    </div>
    <div>
      <div class="row title">
        <div class="title2"></div>
        基本信息
      </div>
      <div class="content">
        <div class="basic-item row">
          <p>河涌名称</p>
          <div>{{basicDetail.name}}</div>
        </div>
        <div class="basic-item row">
          <p>地址</p>
          <div>{{basicDetail.location}}</div>
        </div>
        <div class="basic-item row">
          <p>所属片区</p>
          <div>{{basicDetail.pq}}</div>
        </div>
        <div v-if="isShowBasicDetail">
          <div class="basic-item row">
            <p>所属流域</p>
            <div>{{basicDetail.ly}}</div>
          </div>
          <div class="basic-item row">
            <p>所属水系</p>
            <div>{{basicDetail.sx}}</div>
          </div>
          <div class="basic-item row">
            <p>起点</p>
            <div>{{basicDetail.start}}</div>
          </div>
          <div class="basic-item row">
            <p>终点</p>
            <div>{{basicDetail.end}}</div>
          </div>
          <div class="basic-item row">
            <p>河涌长度(km)</p>
            <div>{{basicDetail.length}}</div>
          </div>
          <div class="basic-item row">
            <p>平均最小宽度(mm)</p>
            <div>{{basicDetail.width}}</div>
          </div>
          <div class="basic-item row">
            <p>平均最小深度(mm)</p>
            <div>{{basicDetail.deep}}</div>
          </div>
          <div class="basic-item row">
            <p>平均水深(m)</p>
            <div>{{basicDetail.pdeep}}</div>
          </div>
        </div>
      </div>
      <open-close @onToggle="(e)=>{isShowBasicDetail=e}"></open-close>
    </div>
    <div>
      <div class="row title">
        <div class="title3"></div>
        水质信息
      </div>
      <div class="content">
        <div v-for="(item,index) in waterDetail" :key="index">
          <div v-if="index>0?isShowWaterDetail:true">
            <div class="basic-item row">
              <h1 style="color: #222222;margin: 5px 0 5px 0 ">测站名称</h1>
              <h1 style="color: #222222;margin: 5px 0 5px 0 ">{{item.name}}</h1>
            </div>
            <div class="basic-item row">
              <p>行政区域</p>
              <div>{{item.xzq}}</div>
            </div>
            <div class="water-item row">
              <p>所属河涌</p>
              <div>{{item.szhy}}</div>
            </div>
            <div class="water-item row">
              <p>监测时间</p>
              <div>{{item.jcsj}}</div>
            </div>
            <div class="water-item row">
              <p>水质类别</p>
              <div>{{item.szlb}}</div>
            </div>
            <div v-if="index!==(waterDetail.length-1)&&isShowWaterDetail" class="vux-1px" style="margin-bottom: 10px;opacity: 0.2;"></div>
          </div>
        </div>
      </div>
      <open-close @onToggle="(e)=>{isShowWaterDetail=e}"></open-close>
    </div>
  </div>
</template>

<style lang="less" scoped>

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon(@url: "../../../../assets/images/icon_river_title_0.png") {
    background: url(@url) no-repeat;
    background-size: contain;
  }

  .title1 {
    .icon("../../../../assets/images/icon_river_title_0.png");
    width: 13px;
    height: 16px;
    margin-right: 7px;
  }

  .title2 {
    .icon("../../../../assets/images/icon_river_title_1.png");
    width: 17.5px;
    height: 14.5px;
    margin-right: 7px;
  }

  .title3 {
    .icon("../../../../assets/images/icon_river_title_2.png");
    width: 12.5px;
    height: 17px;
    margin-right:7px;
  }

  .title {
    font-size: 16px;
    color: #222;
    margin: 10px;
  }

  .hz-icon-0 {
    .icon("../../../../assets/images/icon_river_level0.png");
    width: 20px;
    height: 18px;
    margin-right: 10px;
  }

  .hz-icon-1 {
    .icon("../../../../assets/images/icon_river_level1.png");
    width: 20px;
    height: 18px;
    margin-right: 10px;
  }

  .hz-icon-2 {
    .icon("../../../../assets/images/icon_river_level2.png");
    width: 20px;
    height: 18px;
    margin-right: 10px;
  }

  .content {
    background-color: white;
    padding: 10px;
    font-size: 15px;
    color: #999999;
    .hz-item {
      line-height: 25px;
      justify-content: space-between;
      margin: 0 8px 8px 0;
      p {
        color: #666666;
      }
    }
    .basic-item {
      line-height: 30px;
      justify-content: space-between;
      margin: 0 5px 5px 0;
      p {
        color: #666666;
      }
    }
    .water-item {
      line-height: 28px;
      justify-content: space-between;
      margin: 0 5px 5px 0;
      p {
        color: #666666;
      }
    }
  }
</style>


<script>
  import {getRiverChiefDetail} from "../../api/request";
  import OpenClose from '../../../../components/open-close'

  export default {
    name: "detail",
    components: {
      OpenClose
    },
    mounted() {
      $("title").html(`${this.$route.query.name}详情`)
      let me = this;
      getRiverChiefDetail(this, null, (succ) => {
        console.log(succ)
        me.riverChiefDetail = succ.riverChiefDetail;
        me.basicDetail = succ.basicDetail;
        me.waterDetail = succ.waterDetail;
      }, (err) => {
        console.log(err);
      })
    },
    data() {
      return {
        riverChiefDetail: null,
        basicDetail: null,
        waterDetail: null,
        isShowHZDetail: false,
        isShowBasicDetail: false,
        isShowWaterDetail: false
      }
    },
    methods: {
      getHZIconClass(level) {
        if (level === '区级河长') return 'hz-icon-0'
        else if (level === '镇级河长') return 'hz-icon-1'
        else if (level === '村级河长') return 'hz-icon-2'
      }
    }
  };
</script>

