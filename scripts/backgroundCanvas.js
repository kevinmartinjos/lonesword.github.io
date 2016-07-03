var canvas;
var context;
var angleDeviation = Math.PI/4;
var maxLevel = 12;
var treeList = [];
var calculateGlobals = function(){
  canvas = document.getElementById("homeCanvas");
  context = canvas.getContext("2d");
  canvas.width = $(window).width();
  canvas.height = $(window).height();
};

var Tree = function(length, x, y, theta, level, isReverse){
  this.length = length;
  this.x = x;
  this.y = y;
  this.theta = theta;
  this.level = level;
  this.endX = this.x + this.length * Math.cos(theta);
  this.endY = this.y + this.length * Math.sin(theta);
  this.isReverse = isReverse;
};

Tree.prototype.render = function(){
  var l = this.length;
  var self = this;
  context.beginPath();
  context.moveTo(this.x, this.y);
  context.lineTo(this.endX, this.endY);
  context.stroke();
};

Tree.prototype.run = function(){
  var self = this;
  this.render();
  if(this.level < maxLevel){
    setTimeout(function(){
      this.leftChild = new Tree(self.length/1.7, self.endX, self.endY, self.theta + angleDeviation, self.level + 1).run();
      this.rightChild = new Tree(self.length/1.7, self.endX, self.endY, self.theta - angleDeviation, self.level + 1).run();
      treeList.push(leftChild);
      treeList.push(rightChild);
    }, 1000);
  }
};

var init = function(){
  calculateGlobals();
  var mainTree = new Tree(400, canvas.width/2, 0, Math.PI/2, 0);
  mainTree.run();
};

// $(window).off("resize").on("resize", function(){
//   setTimeout(function(){
//     $("#homeCanvas").remove();
//     $("body").append("<canvas id='homeCanvas'></canvas>");
//     for(var i=0; i<treeList.length; i++)
//       delete treeList[i];
//     delete context;
//     delete canvas;
//     init();
//   }, 500);
// });

init();