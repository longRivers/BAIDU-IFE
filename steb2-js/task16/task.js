
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	/*获取城市名称和污=污染值*/
	var city = document.getElementById("aqi-city-input").value;
	var value = document.getElementById("aqi-value-input").value;

	/*使用正则表达式对输入值进行检测*/
	var city_reg1 = /[\u4e00-\u9fa5]{1,}/;
	var city_reg2 = /[a-zA-Z]{1,}/;
	var value_reg = /^[1-9]*[1-9][0-9]*$/;
	if(!(city_reg1.test(city)||city_reg2.test(city))){
		alert("城市名请为中英文！");
		return ;
	}
	if(!value_reg.test(value)){
		alert("污染值必须为整数！");
		return ;
	}

	/*将输入值添加进aqiData*/
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

	var tbe = document.getElementById("aqi-table");
	tbe.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var i in aqiData){
		tbe.innerHTML+= "<tr><td>"+i+"</td><td>"+aqiData[i]+
		"</td><td><button>删除</button></td></tr>";
	}
	var tbe = document.getElementById("aqi-table");
	var btns = tbe.getElementsByTagName("button");
	for(var i = 0; i<btns.length; i++){
	  btns[i].addEventListener("click", delBtnHandle);
	}

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  /*通过事件触发找到相应的城市*/
  var target = event.target;
  var tr = target.parentNode.parentNode;
  var city = tr.firstChild.innerHTML;

  /*删除相应的城市*/
  delete aqiData[city];

  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn = document.getElementById("add-btn");
  btn.addEventListener("click", addBtnHandle);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  //初始页面没有删除按钮，这段代码课去掉
  var tbe = document.getElementById("aqi-table");
  var btns = tbe.getElementsByTagName("button");
  for(var i = 0; i<btns.length; i++){
  	btns[i].addEventListener("click", delBtnHandle);
  }

}

init();