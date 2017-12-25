<template>
  <div>
    <div class="basic">
      <div class="row"><p class="deepFontColor" style="margin-right: 10px">行政区</p>{{data.location}}</div>
      <div class="row"><p class="deepFontColor" style="margin-right: 10px">数据来源</p>{{data.dataSource}}</div>
    </div>
    <div class="echart">
      <chart class="chart" :options="options" auto-resize></chart>
    </div>
    <div class="basic deepFontColor">
      <div class="size-item">
        <div>
          <p>{{data.rainAll.size}}</p>
          <p>累积雨量</p>
        </div>
        <div>
          <div>开始时间 {{data.rainAll.startTime}}</div>
          <div>结束时间 {{data.rainAll.endTime}}</div>
        </div>
      </div>
      <div class="size-item">
        <div>
          <p>{{data.rainHigh.size}}</p>
          <p>最高雨量</p>
        </div>
        <div>
          <div>发生时间 {{data.rainHigh.time}}</div>
        </div>
      </div>
      <div class="size-item">
        <div>
          <p>{{data.rainLow.size}}</p>
          <p>最低雨量</p>
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
          xAxis: {
            name: "时间(m)",
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
              "2015-5",
              "2015-6",
              "2015-7",
              "2015-8",
              "2015-9",
              "2015-10",
              "2015-11",
              "2015-12"
            ]
          },
          yAxis: {
            type: "value",
            name: "含量(mg/L)",
            nameGap: 10,
            nameTextStyle: {
              color: "#999",
              padding: [0, -80, 0, 0]
            },
            min: 0,
            max: 10,
            interval: 2,
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
              type: "line",
              smooth: true,
              data: [
                3.72,
                5.12,
                5.72,
                6.73,
                7.72,
                5.52,
                3.72,
                5.12,
                5.72,
                6.73,
                7.72,
                5.52
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
  }

  .lightFontColor {
    color: #CECECE;
  }

  .row {
    display: flex;
    flex-direction: row;
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
  .size-item{
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
</style>
