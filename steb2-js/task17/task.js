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
    returnData[datStr] = Math.ceil(Math.random() * seed);
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

// 
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

var colors = ["#ff3300", "#33ff33", "#433d0e", "#0f0e43", "#0e4341", "ff00cc"];


/**
 * 渲染图表
 for(var obj in chartData.day["北京"]){
    alert(obj);
    alert(chartData.day["北京"][obj])
  }
 */
function renderChart() {
  var chart = document.getElementById("aqi-chart-wrap");
  chart.innerHTML = "";
  var select = document.getElementById("city-select");
  var city = select.options[pageState.nowSelectCity].value;

  var selectData = chartData[pageState.nowGraTime][city];

  var len = Object.keys(selectData).length;
  var width = Math.floor(1200/len);


  var i = 0;
  for( var key in selectData){
    chart.innerHTML += "<div class = 'gram_line' style = 'width:"+width+"px;'>" +
    "<div title = '"+ key +" AQI:"+ selectData[key]+"' style = 'margin-top:"+(540-selectData[key])+ "px;background-color:"+colors[i%6]+";width:100%;height:"+
    selectData[key]+"px;'>"+"</div></div>";
    i++;
  }
  

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var gra_time = document.getElementsByName("gra-time");
  for(var i = 0; i<gra_time.length; i++){
    if(gra_time[i].checked){
      if(pageState.nowGraTime == gra_time[i].value)
        return ;

      // 设置对应数据
      pageState.nowGraTime = gra_time[i].value;
    }
  }

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // alert("yes");
  // 确定是否选项发生了变化 
  var slt = document.getElementById("city-select");
  if(slt.selectedIndex == pageState.nowSelectCity){
    return ;
  }

  // 设置对应数据
  pageState.nowSelectCity = slt.selectedIndex;

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var gra_time = document.getElementsByName("gra-time");
  for(var i = 0; i<gra_time.length; i++){
    gra_time[i].addEventListener("change", graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var slt = document.getElementById("city-select");
  for(var i in aqiSourceData){
    var option = document.createElement("option");
    option.innerHTML = i;
    slt.appendChild(option);
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  slt.addEventListener("change", citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var week = {}, count = 0, singleWeek = {},
      month = {}, mcount = 0, singleMonth = {};

  for(var key in aqiSourceData){
    var tempCity = aqiSourceData[key];
    var keyArr = Object.getOwnPropertyNames(tempCity);
    var tempMonth = keyArr[0].slice(5,7);
    var weekInit = 4, weekCount = 0;

    //weekCount记录实际的周数
    for(var i = 0; i < keyArr.length; i++, weekInit++){
      count += tempCity[keyArr[i]];
      mcount += tempCity[keyArr[i]];
      weekCount++;

      if((weekInit+1) % 7 == 0 || i == keyArr.length-1 || keyArr[i+1].slice(5,7) !== tempMonth){
        var tempKey = keyArr[i].slice(0,7)+"月第"+Math.floor(weekInit/7+1)+"周";
        singleWeek[tempKey] = Math.floor(count / weekCount);

        if(i!== keyArr.length-1 && keyArr[i+1].slice(5,7) !== tempMonth){
          weekInit = weekCount%7;
        }
        count = 0;
        weekCount = 0;

        if(i == keyArr.length-1 || keyArr[i+1].slice(5,7) !== tempMonth){
          tempMonth = (i == keyArr.length - 1) ? keyArr[i].slice(5, 7) : keyArr[i+1].slice(5, 7);;
          var mouthDays = keyArr[i].slice(-2);
          var tempMKey = keyArr[i].slice(0, 7);
          singleMonth[tempMKey] = Math.floor(mcount / mouthDays);
          mcount = 0;
        }
      }
    }

    week[key] = singleWeek;
    month[key] = singleMonth;
    singleWeek = {};
    singleMonth = {};

  }

  // 处理好的数据存到 chartData 中
  chartData.day = aqiSourceData;
  chartData.week = week;
  chartData.month = month;
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();