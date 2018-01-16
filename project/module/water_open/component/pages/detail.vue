<template>
  <div>
    <div class="popup-tip-dom" v-transfer-dom>
      <popup v-model="showTip" class="popup-tip" height="100%">
        <div style="padding-left: 20px;padding-right: 20px">
          <div class="popup-tip-content">
            <p>水质类别说明</p>
            <div class="text">
              <div class="icon" style="background-color: #35BBE0">I</div>
              <label>主要适用于源头水、国家自然保护区</label>
            </div>
            <div class="text">
              <div class="icon" style="background-color: #3DE697">II</div>
              <label>主要适用于源头水、国家自然保护区</label>
            </div>
            <div class="text">
              <div class="icon" style="background-color: #FFD55E">III</div>
              <label>主要适用于集中式生活饮用水地表水源 地一级保护区、珍惜水生生物栖息地、 鱼虾类产卵场、仔稚幼鱼的梭饵场等；</label>
            </div>
            <div class="text">
              <div class="icon" style="background-color: #BB55D0">V</div>
              <label>主要适用于集中式生活饮用水地表水源 地一级保护区、珍惜水生生物栖息地、 鱼虾类产卵场、仔稚幼鱼的梭饵场等；</label>
            </div>
            <div class="text">
              <div class="icon" style="background-color: #F63D78">IV</div>
              <label>主要适用于源头水、国家自然保护区</label>
            </div>
            <div class="text">
              <div class="icon" style="background-color: #627498">劣V</div>
              <label>主要适用于源头水、国家自然保护区</label>
            </div>
          </div>
          <div class="popup-tip-btn" @click="showTip=false">确定</div>
        </div>
      </popup>
    </div>
    <p class="title">基本信息</p>
    <div class="basic">
      <div class="basic-item">测站名称 <span class="basic-catch"> {{basic.name}}</span></div>
      <div class="basic-item">行政区域 <span class="basic-catch">{{basic.location}}</span></div>
      <div class="basic-item">所在河涌 <span class="basic-catch">{{basic.atWater}}</span></div>
      <div class="basic-item" style="display: inline-flex;">水质类别 <span class="basic-catch">&nbsp;{{basic.waterType}}类</span>
        <img src="../../../../assets/images/water_type.png" class="water_type_img" aria-hidden="true" @click="showTip=true"/></div>
      <div class="basic-item">数据来源 <span class="basic-catch">{{basic.source}}</span></div>
    </div>
    <p class="title">{{place}}水质监测项</p>
    <div class="echart">
      <checker
        v-model="checker"
        class="type-checker"
        default-item-class="type-checker-item"
        selected-item-class="type-checker-item-selected"
        disabled-item-class="type-checker-item-disabled">
        <div class="flex-line">
          <checker-item class="item" value="0" @on-item-click="onItemClick">
            <div>
              <p>DO</p>
              <p>溶解氧</p>
            </div>
            <div>3.161(mg/L)</div>
          </checker-item>
          <checker-item class="item" value="1" @on-item-click="onItemClick">
            <div>
              <p>CDO</p>
              <p>化学氧气</p>
            </div>
            <div>3.161(mg/L)</div>
          </checker-item>
        </div>
        <div class="vux-1px"></div>
        <div class="flex-line">
          <checker-item class="item" value="2" @on-item-click="onItemClick">
            <div>
              <p>NH3-N</p>
              <p>氨氮</p>
            </div>
            <div>3.161(mg/L)</div>
          </checker-item>
          <checker-item class="item" value="3" @on-item-click="onItemClick">
            <div>
              <p>TP</p>
              <p>总磷</p>
            </div>
            <div>3.161(mg/L)</div>
          </checker-item>
        </div>
        <div class="vux-1px"></div>
      </checker>
      <chart class="chart" :options="options" auto-resize></chart>
    </div>
  </div>
</template>

<script>
  import {getWaterOpenDetail} from "../../api/request";
  import Checker from 'vux/src/components/checker/checker.vue'
  import CheckerItem from 'vux/src/components/checker/checker-item.vue'
  import ECharts from 'vue-echarts/components/ECharts.vue'
  import TransferDom from 'vux/src/directives/transfer-dom/index.js'
  import Popup from 'vux/src/components/popup/index.vue'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/title'
  import XButton from "vux/src/components/x-button/index";

  // import ECharts modules manually to reduce bundle size
  export default {
    name: "detail",
    directives: {
      TransferDom
    },
    components: {
      XButton,
      Checker,
      CheckerItem,
      Popup,
      chart: ECharts,
    },
    mounted() {
      $("title").html(`${this.$route.query.name}水质站详情`)
      this.place = this.$route.query.name;
      let me = this;
      getWaterOpenDetail(this, null, (succ) => {
        console.log(succ)
        me.basic = succ.basic;
        me.monitor = succ.echart;
      }, (err) => {
        console.log(err);
      })
    },
    data() {
      return {
        showTip: false,
        place: "",
        checker: "0",
        basic: {},
        monitor: {},
        options: {
          title: {
            text: 'DO溶解氧近12个月趋势图',
            textStyle: {
              color: '#666666',
              fontSize: 16,
            },
          },
          grid:{
            left:'0%',
            right:'0%',
            bottom: '20%',
            containLabel: true
          },
          xAxis: {
            name: '时间(m)',
            nameTextStyle: {
              color: '#999',
              padding: [30, 0, 0, -20]
            },
            interval: 2,
            nameGap: 5,
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisTick: {
              show: false,
            },
            type: 'category',
            boundaryGap:false,
            data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
          },
          yAxis: {
            type: 'value',
            name: '含量(mg/L)',
            nameGap: 10,
            nameTextStyle: {
              color: '#999',
//              padding: [0, 0, 0, 0]
            },
            min: 0,
            max: 10,
            interval: 2,
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisTick: {
              show: false
            },
          },
          series: [{
            type: 'line',
            smooth: true,
            data: [3.72, 5.12, 5.72, 6.73, 7.72, 5.52, 3.72, 5.12, 5.72, 6.73, 7.72, 5.52]
          }]
        }
      }
    },
    methods: {
      onItemClick(value, disabled) {
        console.log(value, disabled)
      }
    }
  }
</script>

<style lang="less" scoped>
  .title {
    font-size: 16px;
    margin: 10px;
    color: #222222;
    line-height:22.5px;
    font-weight: bold;
  }

  .basic {
    background-color: white;
    font-size: 15px;
    color: #666666;
    line-height:21px;
    .basic-item {
      padding: 5px 0 5px 10px;
    }
    .basic-catch {
      color: #999999;
      margin-left: 15px;
    }
    .water_type_img {
      margin-left: 5px;
      width: 22.5px;
      height: 22.5px;
    }
  }

  .echart {
    padding: 5px 10px;
    font-size: 15px;
    background-color: white;
    .type-checker-item {
      color: #666666;
      font-size: 15px;
      padding: 5px 10px;
      margin: 5px;
      line-height: 18px;
      border-radius: 5px;
    }

    .type-checker-item-selected {
      background: linear-gradient(to bottom,#6BC1F8,#398DEE);
      color: #fff;
    }

    .type-checker-item-disabled {
      color: #999;
    }

    .type-checker {
      .flex-line {
        display: flex;
      }
      .item {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin: 3px 0 3px 0;
          font-size: 13px;
          line-height: 18.5px;
        }
      }
    }
    .echart-part-title {
      margin: 10px 10px 0;
      color: #666;
    }
    .chart {
      width: 100%;
      height: 350px;
    }
  }

  .popup-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    .popup-tip-content {
      background-color: white;
      padding: 20px 30px 10px 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
      color: #888;
      font-size: 15px;
      .text {
        display: flex;
        margin-top: 10px;
        /*margin-bottom: 10px;*/
        border-bottom: 1px solid rgba(229,229,229,0.5);
        padding: 5px 0 8px 0;
        label{
          font-size: 14px;
          color: #888888;
          text-align: start;
          flex: 1;
        }
      }
      .icon {
        font-size: 10px;
        color: white;
        background-color: #10aeff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        border: 1px solid;
        border-radius: 20%;
        margin-right: 5px;
      }
      p {
        font-size: 18px;
        color: #222;
      }
      :last-child{
        border-bottom: none;
      }
    }
    .popup-tip-btn {
      font-size: 16px;
      color: white;
      background-color: #398DFE;
      border-radius: 0 0 8px 8px;
      text-align: center;
      padding: 10px;
    }
  }
</style>
