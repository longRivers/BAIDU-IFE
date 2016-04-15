var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		} else {
			element["on"+type] = handler;
		}
	}
};

(function () {
	// body...
	var treeWalker = new TreeWalker();
		root = document.querySelector(".root"),
		btns = document.querySelectorAll("button"),
		btn1 = btns[0];
	EventUtil.addHandler(btn1, "click", function(){
		//
		treeWalker.preOrder(root);
		clearColor(treeWalker);
		treeWalker.animation();
	});
	EventUtil.addHandler(btn4, "click", function(){
		//
		treeWalker.preOrder(root);
		clearColor(treeWalker);
		treeWalker.find();
	})

})();

function TreeWalker(){
	this.stack = [];
	this.values = [];
	this.isWalking = false;
}

TreeWalker.prototype.preOrder = function(root){
	this.stack.push(root);
	this.values.push(root.firstChild.nodeValue.trim());
	root = root.firstElementChild;
	while(root){
		this.preOrder(root);
		root = getNextElement(root);
	}
}

//调用动画进行遍历
TreeWalker.prototype.animation = function() {
	// body...
	var stack = this.stack,
		item = 0;
	this.stack = [];
	this.values = [];
	if(!this.isWalking){
		this.isWalking = true;
		stack[item].style.backgroundColor = "blue";
		var timer = setInterval(function(){
			if(item == stack.length-1){
				stack[item].style.backgroundColor = "#ffffff";
				clearInterval(timer);
			} else{
				item = item+1;
				stack[item-1].style.backgroundColor = "#ffffff";
				stack[item].style.backgroundColor = "blue";
			}
		}, 200);
	};
	this.isWalking = false;
}


//查询输入的元素并特殊显示
TreeWalker.prototype.find = function(){
	var input = document.querySelector("input").value,
		stack = this.stack,
		item = 0,
		values = this.values;
	this.stack = [];
	this.values = [];
	if(!this.isWalking){
		this.isWalking = true;
		if(values[item] == input){
			stack[item].style.backgroundColor = "orange";
			this.isWalking = false;
			return ;
		} else{
			stack[item].style.backgroundColor = "blue";
		}
		var timer = setInterval(function(){
			if(item == stack.length-1){
				if(values[item] == input){
					stack[item].style.backgroundColor = "orange";
					clearInterval(timer);
				} else{
					stack[item].style.backgroundColor = "#ffffff";
					clearInterval(timer);
				}
				
			} else{
				item = item+1;
				stack[item-1].style.backgroundColor = "#ffffff";
				if(values[item] == input){
					stack[item].style.backgroundColor = "orange";
					this.isWalking = false;
					clearInterval(timer);
					return ;

				} else{
					stack[item].style.backgroundColor = "blue";
				}
			}
		}, 200);
	} else{
		alert("正在遍历");
	};
	this.isWalking = false;
}

function clearColor(tree){
	//需要修改 应该去的active 元素
	tree.stack.forEach(function(ele) {
        ele.style.backgroundColor = "#fff";
    });
}


function getNextElement(node){
	if(node.nextSibling){
		if(node.nextSibling.nodeType == 1){
			return node.nextSibling;
		} 
		if(node.nextSibling.nodeType == 3){      //判断下一个节点类型为3则是“文本”节点  ，回调自身函数  
	        return getNextElement(node.nextSibling);    
	    }  
	}  
    return null;
};


