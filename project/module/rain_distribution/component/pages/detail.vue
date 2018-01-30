<template>
  <div>
    <div class="basic">
      <div class="row" style="margin-top: 10px"><p class="deepFontColor" style="margin-right: 10px">行政区域</p>
        {{data.location}}
      </div>
      <div class="row" style="margin-top: 10px"><p class="deepFontColor" style="margin-right: 10px;">数据来源</p>
        {{data.dataSource}}
      </div>
    </div>
    <div class="echart">
      <div class="time_date_container">
        <span class="time_date" @click="chooseTime">{{selectTime}}<img src="../../../../assets/images/arrow_right.png"
                                                                       class="img"/></span>
        <div style="align-items: center;display: inline-flex;">
          <label style="width: 12px;height: 12px;border-radius: 2px ;background-color: #BAABFC "></label>
          <label style="margin-left: 3px;color: #666666;font-size: 12px">雨量</label>
        </div>
      </div>
      <chart class="chart" :options="options"></chart>
    </div>
    <div class="basic deepFontColor">
      <div class="size-item">
        <div class="row marginRightDisc">
          <div class="icon_2"></div>
          <div>
            <p class="rain-disc">降雨量:{{data.rainAll.size}}</p>
            <p class="rain-disc">温度:{{data.rainAll.temperature}}°C</p>
          </div>
        </div>
        <div>
          <div class="rain-disc rain-disc-color">时间 {{data.rainAll.startTime}}</div>
          <!--<div class="rain-disc rain-disc-color">结束时间 {{data.rainAll.endTime}}</div>-->
        </div>
      </div>
      <div class="size-item">
        <div class="row marginRightDisc">
          <div class="icon_3"></div>
          <div>
            <p class="rain-num">{{data.rainHigh.size}}</p>
            <p class="rain-disc">最高雨量</p>
          </div>
        </div>
        <div>
          <div class="rain-disc rain-disc-color">时间 {{data.rainHigh.time}}</div>
        </div>
      </div>
      <div class="size-item">
        <div class="row marginRightDisc">
          <div class="icon_1"></div>
          <div>
            <p class="rain-num">{{data.rainLow.size}}</p>
            <p class="rain-disc">最低雨量</p>
          </div>
        </div>
        <div>
          <div class="rain-disc rain-disc-color">时间 {{data.rainLow.time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRainDistributionDetail } from "../../api/request";
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
        selectTime: '选择日期和时间',
        data: {},
//        yMin:100,
//        yMax:500,
//        dataSet:[200,300,400,500],

        options: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 10,
//              barBorderWidth:10,
              color: ['#BAABFC'],
//              barBorderColor:''
            },
          },
          grid: {
            top: '10%',
            left: '0%',
            right: '0%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              name: "时间(h)",
              nameTextStyle: {
                color: "#999",
                padding: [30, 0, 0, -24]
              },
              interval: 2,
              nameGap: 2,
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
                "01-15",
                "01-16",
                "01-17",
                "01-18",
              ]
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "雨量(mm)",
              nameGap: 10,
              nameTextStyle: {
                color: "#999",
                fontSize: "10px",
                padding: [0, -80, 0, 0]
              },
//            min: this.yMin,
//            max: this.yMax,
//            interval: 0.2,
              axisLine: {
                lineStyle: {
                  color: "#666"
                }
              },
              axisTick: {
                show: false
              }
            }, {
              type: "value",
              name: "温度°C",
//            nameGap: 10,
              position: 'right',
              min: 0,
              max: 25,
//            interval: 5,
              axisLine: {
                lineStyle: {
                  color: "#675bba"
                }
              },
            }
          ],
          series: [
            {
              type: "bar",
              smooth: true,
              data: [200, 300, 400, 500]
            },
            {
              type: 'line',
              data: [6.3, 20.3, 16.5, 6.2]
            }
          ]
        }
      };
    },
    methods: {
      onItemClick(value, disabled) {
        console.log(value, disabled);
      },
      chooseTime () {
        let that = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH:00',
          value: that.selectTime,
          onConfirm (val) {
            that.selectTime = val;
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
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
      height: 300px;
      width: 100%;
    }
  }

  .img {
    width: 12px;
    height: 12px;
    margin-left: 5px;
  }

  .time_date_container {
    margin-top: 10px;
    position: relative;
    justify-content: flex-end;
    display: flex;
    align-items: center;
  }

  .time_date {
    display: flex;
    align-items: center;
    left: 50%;
    margin-left: -61px;
    font-size: 13px;
    padding: 1px 5px;
    color: #CECECE;
    border-radius: 5px;
    border: 1px solid rgba(57, 141, 238, 0.3);
    position: absolute;
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
    /*justify-content: space-between;*/
  }

  .icon(@url: "../../../../assets/images/ic_rain_size_1.png") {
    background: url(@url) no-repeat;
    background-size: cover;
    margin-right: 10px;
    height: 40px;
    width: 40px;
  }

  .rain-disc {
    font-size: 12px;
  }

  .rain-disc-color {
    color: #CECECE;
  }

  .rain-num {
    font-size: 14px;
  }

  .marginRightDisc {
    margin-right: 20px;
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
