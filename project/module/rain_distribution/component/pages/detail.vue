<template>
  <div>
    <div class="basic">
      <div class="row"><p class="deepFontColor" style="margin-right: 5px">行政区</p>{{data.location}}</div>
      <div class="row"><p class="deepFontColor" style="margin-right: 10px">数据来源</p>{{data.dataSource}}</div>
    </div>
    <div class="echart">
      <chart class="chart" :options="options" auto-resize></chart>
    </div>
    <div class="basic deepFontColor">
      <div class="size-item">
        <div class="row">
          <div class="icon_2"></div>
          <div>
            <p>{{data.rainAll.size}}</p>
            <p>累积雨量</p>
          </div>
        </div>
        <div>
          <div>开始时间 {{data.rainAll.startTime}}</div>
          <div>结束时间 {{data.rainAll.endTime}}</div>
        </div>
      </div>
      <div class="size-item">
        <div class="row">
          <div class="icon_3"></div>
          <div>
            <p>{{data.rainHigh.size}}</p>
            <p>最高雨量</p>
          </div>
        </div>
        <div>
          <div>发生时间 {{data.rainHigh.time}}</div>
        </div>
      </div>
      <div class="size-item">
        <div class="row">
          <div class="icon_1"></div>
          <div>
            <p>{{data.rainLow.size}}</p>
            <p>最低雨量</p>
          </div>
        </div>
        <div>
          <div>发生时间 {{data.rainLow.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRainDistributionDetail} from "../../api/request";
  import ECharts from "vue-echarts/components/ECharts.vue";
  import "echarts/lib/chart/line";
  import "echarts/lib/chart/bar";
  import "echarts/lib/component/title";

  // import ECharts modules manually to reduce bundle size
  export default {
    name: "detail",
    components: {
      chart: ECharts
    },
    mounted() {
      $("title").html(`${this.$route.query.name}雨量站详情`);
      this.place = this.$route.query.name;
      let me = this;
      getRainDistributionDetail(
        this,
        null,
        succ => {
          console.log(succ);
          me.data = succ;
        },
        err => {
          console.log(err);
        }
      );
    },
    data() {
      return {
        data: {},

        options: {
          title: {
            textStyle: {
              color: "#666666",
              fontSize: 16
            }
          },
          barWidth: 10,
          itemStyle:{
            normal: {
              barBorderRadius:10,
//              barBorderWidth:10,
              color: ['#BAABFC'],
//              barBorderColor:''
            },
          },

          xAxis: {
            name: "时间(h)",
            nameTextStyle: {
              color: "#999",
              padding: [30, 0, 0, -20]
            },
            interval: 2,
            nameGap: 5,
            axisLine: {
              lineStyle: {
                color: "#666"
              }
            },
            axisTick: {
              show: false
            },
            type: "category",
            data: [
              "2015-1",
              "2015-2",
              "2015-3",
              "2015-4",
            ]
          },
          yAxis: {
            type: "value",
            name: "雨量(mm)",
            nameGap: 10,
            nameTextStyle: {
              color: "#999",
              padding: [0, -80, 0, 0]
            },
            min: 0,
            max: 1.0,
            interval: 0.2,
            axisLine: {
              lineStyle: {
                color: "#666"
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [
            {
              type: "bar",
//              smooth: true,
              data: [
                0.72,
                0.12,
                0.72,
                0.73,
              ]
            }
          ]
        }
      };
    },
    methods: {
      onItemClick(value, disabled) {
        console.log(value, disabled);
      }
    }
  };
</script>

<style lang="less" scoped>
  .deepFontColor {
    color: #666666;
    line-height: 21px;
    font-size: 15px;
  }

  .lightFontColor {
    color: #CECECE;
  }

  .row {
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    align-items: center;
  }

  .basic {
    color: #999;
    padding: 10px
  }

  .echart {
    padding: 5px 10px;
    font-size: 15px;
    background-color: white;
    .chart {
      width: 100%;
    }
  }

  .size-item {
    background-color: white;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .icon(@url: "../../../../assets/images/ic_rain_size_1.png") {
    background: url(@url) no-repeat;
    background-size: cover;
    margin-right: 10px;
    height: 26px;
    width: 26px;
  }

  .icon_1 {
    .icon("../../../../assets/images/ic_rain_size_1.png");
  }

  .icon_2 {
    .icon("../../../../assets/images/ic_rain_size_2.png");
  }

  .icon_3 {
    .icon("../../../../assets/images/ic_rain_size_3.png");
  }
</style>
