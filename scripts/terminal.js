function updateCursorPosition(parent){
	var old = document.getElementById("cursor");
	clearCursor(old);
	var newCursor = getNewCursor();
	parent.appendChild(newCursor);
}

function getNewCursor(){
	var cursor = document.createElement("span");
	cursor.id = "cursor";
	cursor.innerText = "|";
	return cursor;
}


function clearCursor(element){
	element.id = "";
	element.innerText = "";
}

function updateCommandPosition(parent){
	var old = document.getElementById("command");
	clearCommand(old);
	var newCommand = getNewCommand();
	parent.appendChild(newCommand);
}

function getNewCommand(){
	var command = document.createElement("span");
	command.id = "command";
	command.innerText = "";
	command.className = "command";
	return command;
}

function clearCommand(element){
	element.id = "";
}

function typeCommand(commandHolder, command, startDelay, typingSpeed){
	var len = command.length;
	var index = 0;

	var promise = new Promise(function(resolve, reject){
		setTimeout(function(){
			var timerHandle = setInterval(function(){
				if(index >= len){
					clearInterval(timerHandle);
					resolve("completed");
				}
				else{
					commandHolder.innerText += command[index];
					index++;
				}
			}, typingSpeed);
		}, startDelay);
		
	});
	
	return promise;
}

function updateCommand(parent, command, executionDelay){
	var commandHolder = document.getElementById("command");
	
	return new Promise(function(resolve, reject){
		var typer = typeCommand(commandHolder, command, 2000, 50);

		typer.then(function(){
			setTimeout(function(){
				resolve("completed");
			}, executionDelay)
		});
	});
	
}

function addPrompt(parent){
	var prompt = getNewPrompt();
	var promptEnd = getNewPromptEnd();
	parent.appendChild(prompt);
	parent.appendChild(promptEnd);
}

function getNewPrompt(){
	var prompt = document.createElement("span");
	prompt.className += " prompt";
	prompt.innerText = "user@lonesword.in";
	return prompt;
}

function getNewPromptEnd(){
	var promptEnd = document.createElement("span");
	promptEnd.className += " promptEnd";
	promptEnd.innerText = " ~ $ ";
	return promptEnd;
}

function getNewResultHolder(){
	var holder = document.createElement("div");
	holder.className = "result";

	return holder;
}

function addResult(parent, result){
	addNewLine(parent);
	var resultHolder = getNewResultHolder();
	
	if(typeof result === "string")
		resultHolder.innerText = result;
	else if(typeof result === "function")
		resultHolder.appendChild(result());

	parent.appendChild(resultHolder);
}

function addNewLine(parent){
	var br = document.createElement("br");
	parent.appendChild(br);
}

function start(commandList){
	if(commandList == undefined || commandList.length === 0)
		return;

	var terminal = document.getElementById("terminal");

	var executionDelay = 1000;
	var commandListLength = commandList.length;
	// var promiseList = commandList.map(function(commandItem){
	// 	return updateCommand(terminal, commandItem.command, commandItem.result, executionDelay);
	// })
	var promise = updateCommand(terminal, commandList[0].command, executionDelay);
	for(var i=1; i<commandListLength; i++){
		(function(j){
				if(j == commandList.length - 1){
					promise = promise.then(function(){
						pressReturn(terminal, commandList[j-1].result);
						return updateCommand(terminal, commandList[j].command, executionDelay);
					}).then(function(){
						pressReturn(terminal, commandList[j].result);
					});
				}
				else{
					promise = promise.then(function(){
						pressReturn(terminal, commandList[j-1].result);
						return updateCommand(terminal, commandList[j].command, executionDelay);
					});
				}
		})(i);
	}

}

function pressReturn(terminal, result){
	if(result !== undefined){
		addResult(terminal, result);
	}
	// addNewLine(terminal);
	addPrompt(terminal);
	updateCommandPosition(terminal);
	updateCursorPosition(terminal);
}

var commandList = [{
	command: "whoami",
	result: "Kevin Martin Jose. Developer"
},{
	command: "ls -a",
	result: function(){
		var container = document.createElement("div");
		
		var item1 = document.createElement("span");
		item1.innerText = ".";
		item1.className = "ls";
		container.appendChild(item1);

		var item2 = document.createElement("span");
		item2.innerText = "..";
		item2.className = "ls";
		container.appendChild(item2);

		var blog = document.createElement("a");
		blog.innerText = "blog";
		blog.className = "lsLink";
		blog.href = "/blog";
		container.appendChild(blog);

		var resume = document.createElement("a");
		resume.innerText = "resume";
		resume.className = "lsLink";
		resume.href = "http://stackoverflow.com/users/story/1841522";
		container.appendChild(resume);

		
		return container;
	}
}, {
	command: "ps",
	result: function(){
		var container = document.createElement("div");

		var row1 = document.createElement("div");
		row1.className = "row";

		var header1 = document.createElement("span");
		header1.innerText = "PID";
		header1.className = "ps col-xs-3"
		row1.appendChild(header1);

		var header2 = document.createElement("span");
		header2.innerText = "CMD";
		header2.className = "ps col-xs-3"
		row1.appendChild(header2);

		var header3 = document.createElement("span");
		header3.innerText = "INFO";
		header3.className = "ps col-xs-3"
		row1.appendChild(header3);;

		var row2 = document.createElement("div");
		row2.className = "row";

		var pid1 = document.createElement("span");
		pid1.innerText = "1";
		pid1.className = "ps col-xs-3"
		row2.appendChild(pid1);

		var cmd1 = document.createElement("span");
		cmd1.innerText = "javascript";
		cmd1.className = "ps col-xs-3"
		row2.appendChild(cmd1);

		var info1 = document.createElement("span");
		info1.innerText = "Jquery by day, reactjs and other cool things by night";
		info1.className = "ps col-xs-3"
		row2.appendChild(info1);

		var row3 = document.createElement("div");
		row3.className = "row";

		var pid2 = document.createElement("span");
		pid2.innerText = "2";
		pid2.className = "ps col-xs-3"
		row3.appendChild(pid2);

		var cmd2 = document.createElement("span");
		cmd2.innerText = "java";
		cmd2.className = "ps col-xs-3"
		row3.appendChild(cmd2);

		var info2 = document.createElement("span");
		info2.innerText = "Tomcat, Jetty, REST APIs";
		info2.className = "ps col-xs-3"
		row3.appendChild(info2);

		container.appendChild(row1);
		container.appendChild(row2);
		container.appendChild(row3);

		return container;
	}
},
{
	command: "ps -e",
	result: function(){
		var container = document.createElement("div");

		var row1 = document.createElement("div");
		row1.className = "row";

		var header1 = document.createElement("span");
		header1.innerText = "PID";
		header1.className = "ps col-xs-3"
		row1.appendChild(header1);

		var header2 = document.createElement("span");
		header2.innerText = "CMD";
		header2.className = "ps col-xs-3"
		row1.appendChild(header2);

		var header3 = document.createElement("span");
		header3.innerText = "INFO";
		header3.className = "ps col-xs-3"
		row1.appendChild(header3);;

		var row2 = document.createElement("div");
		row2.className = "row";

		var pid1 = document.createElement("span");
		pid1.innerText = "1";
		pid1.className = "ps col-xs-3"
		row2.appendChild(pid1);

		var cmd1 = document.createElement("span");
		cmd1.innerText = "Apache ActiveMQ";
		cmd1.className = "ps col-xs-3"
		row2.appendChild(cmd1);

		var info1 = document.createElement("span");
		info1.innerText = "I help make things scale";
		info1.className = "ps col-xs-3"
		row2.appendChild(info1);

		var row3 = document.createElement("div");
		row3.className = "row";

		var pid2 = document.createElement("span");
		pid2.innerText = "2";
		pid2.className = "ps col-xs-3"
		row3.appendChild(pid2);

		var cmd2 = document.createElement("span");
		cmd2.innerText = "Apache Solr";
		cmd2.className = "ps col-xs-3"
		row3.appendChild(cmd2);

		var info2 = document.createElement("span");
		info2.innerText = "I help with searches too, only a bit though.";
		info2.className = "ps col-xs-3"
		row3.appendChild(info2);

		var row4 = document.createElement("div");
		row4.className = "row";

		var pid3 = document.createElement("span");
		pid3.innerText = "3";
		pid3.className = "ps col-xs-3"
		row4.appendChild(pid3);

		var cmd3 = document.createElement("span");
		cmd3.innerText = "Music";
		cmd3.className = "ps col-xs-3"
		row4.appendChild(cmd3);

		var info3 = document.createElement("span");
		info3.innerText = "Barely barre chords on the guitar. Don't even ask about the violin";
		info3.className = "ps col-xs-3"
		row4.appendChild(info3);

		var row5 = document.createElement("div");
		row5.className = "row";

		var pid4 = document.createElement("span");
		pid4.innerText = "4";
		pid4.className = "ps col-xs-3"
		row5.appendChild(pid4);

		var cmd4 = document.createElement("span");
		cmd4.innerText = "Other stuff";
		cmd4.className = "ps col-xs-3"
		row5.appendChild(cmd4);

		var info4 = document.createElement("span");
		info4.innerText = "Video games, books, thinking about the answer to the question of life the universe and everything";
		info4.className = "ps col-xs-3"
		row5.appendChild(info4);

		container.appendChild(row1);
		container.appendChild(row2);
		container.appendChild(row3);
		container.appendChild(row4);
		container.appendChild(row5);

		return container;
	}
},
{
	command: "echo Hi!",
	result: "Hi!"
}
];

start(commandList);