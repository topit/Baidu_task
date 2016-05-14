/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//ceil向上取整，返回0-seed之间的随机数
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

//获取颜色
function getColor() {
  var color = ["#F3CDDE", "#E8BBAE", "#F0B22A", "#BFB6C6", "#CC7F7D", "#958AC2", "#AE81AC", "#7B83B5", "#9B805C", "#837FA5", "#8E7483", "#5B6DAC", "#7F663E", "#4E639D", "#6D5B90", "#9B3F4D", "#7A4E6D", "#47588D", "#575A27", "#144EC0", "#5E4D41", "#3E4F7A", "#2D477D", "#32426A", "#632E26", "#022CA2", "#3E3517", "#041F8C", "#4C1F3E", "#2C2A1A", "#1F0E08", "#120E08"];
  // console.log(color[Math.floor(Math.random() * 32)]);
  return color[Math.floor(Math.random() * 32)];
}

/**
 * 渲染图表
 */
function renderChart() {
  var wrapper = document.getElementsByClassName("aqi-chart-wrap")[0];
  console.log(wrapper);
  var table = "",
      dateClass = "",
      height;
  switch(pageState.nowGraTime){
    case "day": dateClass = "'a aqi-day'";break;
    case "month": dateClass = "'a aqi-month'";break;
    case "week": dateClass = "'a aqi-week'";break;
  }
  console.log(dateClass);
  for(var date in chartData[pageState.nowSelectCity][pageState.nowGraTime]){
    height = parseInt(chartData[pageState.nowSelectCity][pageState.nowGraTime][date]);
    table += "<div class=" + dateClass + " style='height:" + height + "px;background:" + getColor() + " '><span class='details'>日期：" + date + "<br/>" + "空气质量指数：" + height + "</span></div>";
  }
  wrapper.innerHTML = table;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var value = event.target.value;
  if(value != pageState.nowGraTime){
    pageState.nowGraTime = value;
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
  var city = this.value;
  if(city != pageState.nowSelectCity){
    pageState.nowSelectCity = city;
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  document.getElementById("form-gra-time").addEventListener("click",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var select = document.getElementById("city-select");
  var citys = Object.getOwnPropertyNames(aqiSourceData);
  var citys_html = citys.map(function(i) {
    return "<option>" + i + "</option>";
  });
  pageState.nowSelectCity = citys[0];
  select.innerHTML = citys_html.join("");
  select.addEventListener("change", citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var city in aqiSourceData){
    // console.log(aqiSourceData[city]);
    //复制日aqi
    chartData[city] = {};
    chartData[city].day = aqiSourceData[city];
    //计算周平均aqi
    (function(data) {      
      var week = {};
      var sum = 0;
      var offset = 1;
      var week_offset = 1;
      var str;
      for(var date in data){
        offset++;
        sum += data[date];
        if(offset == 7){
          str = "2016年第" + week_offset + "周";
          week[str] = Math.round(sum / 7);
          offset = 0;
          week_offset++;
          sum = 0;
        }
      }
      if(offset != 0){
        str = "2016年第" + week_offset + "周";
        week[str] = sum / offset;
      }
      chartData[city]["week"] = week;
    })(aqiSourceData[city]);

    //处理月平均aqi
    (function(data) {
      var month = {};
      var sum1 = 0;
      var sum2 = 0;
      var sum3 = 0;
      for(var date in data){
        if(date.substr(6, 1) == 1){
          sum1 += data[date];
        }else if(date.substr(6, 1) == 2){
          sum2 += data[date];
        }else if(date.substr(6, 1) == 3){
          sum3 += data[date];
        }
        var str1 = "2016-01";
        var str2 = "2016-02";
        var str3 = "2016-03";
        month[str1] = Math.round(sum1 / 31);
        month[str2] = Math.round(sum2 / 29);
        month[str3] = Math.round(sum3 / 31);
        chartData[city]["month"] = month;
      }
    })(aqiSourceData[city]);
  }
  renderChart();
}

function initDetailDisplay(){
  var detail = document.getElementsByClassName("aqi-chart-wrap")[0];
  detail.addEventListener("mouseover",function(e){
    if (e.target.classList.contains("a")) {
      e.target.firstChild.style.visibility='visible';
      // console.log(e.target.className);
    }
    // console.log(e.target.className);
  },false);
  detail.addEventListener("mouseout",function(e){
    if (e.target.classList.contains("a")) {
      e.target.firstChild.style.visibility='hidden';
      // console.log(e.target.className);
    }
    // console.log(e.target.className);
  },false);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  initDetailDisplay();
}

init();