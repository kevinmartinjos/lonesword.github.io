var canvas = document.getElementById('canvas');
var totalGrass = 800;
//canvas.height = 200;
canvas.width = window.innerWidth;
var context = canvas.getContext('2d');
context.font = "30px Segoe UI";
var title = "Pieces Of Code";
var tag = "Little pieces of code that make (my) life beautiful";
var Meadow = [];
noise.seed(Math.random());

Meadow.animate = function(){
	var windFactor = noise.simplex2((new Date()).getTime(), 0);
	//var windFactor = Math.random();
	for(var i=0; i<this.length; i++){
		var grass  = this[i];
		var cpx = grass.cp.x;
		var cpy = grass.cp.y;
		var epx = grass.ep.x;
		var epy = grass.ep.y;

		grass.cp.x += windFactor * Math.random();
		grass.cp.y += windFactor * Math.random();
		grass.ep.x += windFactor * 2 * Math.random();
		grass.ep.y += windFactor * 2 * Math.random(); 

		grass.render();

		grass.cp.x = cpx;
		grass.cp.y = cpy;
		grass.ep.x = epx;
		grass.ep.y = epy;
	}
};

function Grass(x_, y_, l_, c_){

	this.x = x_;
	this.y = y_;
	this.len = l_;
	this.intensity = c_;

	this.cp = {x: x+Math.random()*10, y: y-Math.random()*this.len};
	this.ep = {x: x+Math.random()*10, y: y-Math.random()*this.len};

	this.render = function(){
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.strokeStyle = '#' + this.intensity.toString(16) + this.intensity.toString(16)+ this.intensity.toString(16) ;
		context.quadraticCurveTo(this.cp.x, this.cp.y, this.ep.x, this.ep.y);
		context.stroke();	
	};

}

function animate(){
	setTimeout(function(){
		requestAnimationFrame(animate);
		context.fillStyle = '#fff';
		context.fillRect(0, 0, canvas.width, canvas.height);
		Meadow.animate();	
		context.fillStyle = "#aaa";
		context.font = "30px Segoe UI";
		context.fillText(title, canvas.width/2- context.measureText(title).width/2, canvas.height/2);
		context.font = "15px Segoe UI";
		context.fillText(tag, canvas.width/2 - context.measureText(tag).width/2, canvas.height/2 + 30);
	}, 1000/10);
}

//initializing the Grasses
for(var i=0; i<totalGrass; i++){
	var x = Math.random() * canvas.width;
	var y = canvas.height;
	var g = new Grass(x, y, 70, Math.floor(Math.random() * 255) + 150);
	Meadow.push(g);
}
animate();
