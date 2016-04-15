var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent){
			element.attachEvent("on"+type, handler);
		} else {
			element["on" + type] = handler;
		}
	}
};

(function(){
	var treeWalker = new TreeWalker();
	    btns = document.getElementsByTagName("button"),
	    preBtn = btns[0],
	    inBtn = btns[1],
	    postBtn = btns[2],
		root = document.querySelector(".root");

	EventUtil.addHandler(preBtn, "click", function(){
		treeWalker.preOrder(root);
		treeWalker.animation();
	});
	EventUtil.addHandler(inBtn, "click", function(){
		treeWalker.inOrder(root);
		treeWalker.animation();
	});
	EventUtil.addHandler(postBtn, "click", function(){
		treeWalker.postOrder(root);
		treeWalker.animation();
	});
})();


/*function show(){
	return this.data;
}*/


function TreeWalker(){
	this.stack = [];
	this.isWalking = false;
}

TreeWalker.prototype.preOrder = function(root) {
	// body...
	this.stack.push(root);
	if(root.firstElementChild){
		this.preOrder(root.firstElementChild);
	}
	if(root.lastElementChild){
		this.preOrder(root.lastElementChild);
	}
};

TreeWalker.prototype.inOrder = function(root) {
	// body...
	
	if(root.firstElementChild){
		this.inOrder(root.firstElementChild);
	}
	this.stack.push(root);
	if(root.lastElementChild){
		this.inOrder(root.lastElementChild);
	}
};

TreeWalker.prototype.postOrder = function(root) {
	// body...
	
	if(root.firstElementChild){
		this.postOrder(root.firstElementChild);
	}
	if(root.lastElementChild){
		this.postOrder(root.lastElementChild);
	}
	this.stack.push(root);
};

TreeWalker.prototype.animation = function() {
	// body...
	var stack = this.stack,
		item = 0;
	this.stack = [];
	if(!this.isWalking){
		this.isWalking = true;
		stack[item].style.backgroundColor = "blue";
		var timer = setInterval(function(){
			if(item == stack.length-1){
				stack[item].style.backgroundColor = "#ffffff";
				this.isWalking = false;
				clearInterval(timer);
			} else{
				item = item+1;
				stack[item-1].style.backgroundColor = "#ffffff";
				stack[item].style.backgroundColor = "blue";
			}
		}, 200);
	};

};




