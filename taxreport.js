
var g_tpCurFormNo = 0;
var g_tpForm = [
	//question 1
	{//self
		name: "self",
		tips: "您是否为自己报税?",
		inputs: {
			type: "radio",
			value: ["是","不是"],
			next: [null,null]			
		},
		prev: null
	},
	{//personel info
		name: "ps",
		tips: "请输入报税人的个人信息",
		inputs: {
			type: "multi",
			subinputs: [
				{
					name: "sex",
					tips: "性别：",
					inputs: {
						type: "radio",
						value: ["女", "男"],
						next: [null, null]
					},
					prev: null
				},
				{
					name: "lastname",
					tips: "姓：",
					inputs: {
						type: "text",
						attr: {
							name: [],
							value:[]
						},
						validate: {
							required: true,
							regularE: "[a-zA-Z]"
						},
					},
					prev: null
				},
				{
					name: "firstname",
					tips: "名：",
					inputs: {
						type: "text",
						attr: {
							name: [],
							value:[]
						},
						validate: {
							required: true,
							regularE: "[a-zA-Z]"
						},
					},
					prev: null
				}				
			],			
		},
		prev: null,
	},
	{//marriage
		name: "marriage",
		tips: "请选择您的婚姻状况?",
		inputs:{
			type: "radio",
			value: ["未婚","已婚","同居"],
			next: [null,null,null]
		},
		prev: null
	},
	{
		name: "end",
		tips: "信息搜集完成",
		prev: null,
		inputs : {
			type: "none",
		}
	},
];

var classDiv = "tp-div";
var classTips = "tp-tips";
function idDiv(formNumber) {
	return "tp"+formNumber;
}
function idTips(name) {
	return "tp-tips-"+name;
}
function nameAttr(name) {
	return "tp_"+name;
}

function radioInput(name, radioObj) {
	var radiocode="";
	
	for (var j = 0; j < radioObj.value.length; j++) {
		//add the radio
		radiocode = radiocode + '<input type="radio" name="'+nameAttr(name)+'"' + 'value="' + j + '"';
		if (j == 0) {
			radiocode = radiocode + ' checked="checked"/>';
		} else {
			radiocode = radiocode + '/>';
		}
		//add the label
		radiocode = radiocode + '<label for="tp-rd-' + name + '">' + radioObj.value[j] + '</label>';
	}	
	
	return radiocode;
}

function textInput(name, textObj) {
	var textcode = "";
	
	textcode = textcode + '<input type="text" name="' + nameAttr(name) + '"';	
	
	textcode = textcode + '/>';
	return textcode;
}

function multiInput(name, multiObj) {
	var inputsNum = multiObj.subinputs.length;
	var multicode = "";
	var tmpForm;
	
	for (var i = 0; i < inputsNum; i++) {
		tmpForm = multiObj.subinputs[i];
		//add the tips
		multicode = multicode + '<p class="'+classTips+'" id="'+idTips(tmpForm.name) + '">'+tmpForm.tips+'</p>';
		//process the subinput fild
		switch (tmpForm.inputs.type) {
			case "radio" :
				multicode = multicode + radioInput(tmpForm.name, tmpForm.inputs );			
				break;
			case "text":
				multicode = multicode + textInput(tmpForm.name, tmpForm.inputs );
				break;
			case "multi" :
				multicode = multicode + multiInput(tmpForm.name, tmpForm.inputs );	
				break;
				
			default:
				break;
		}
	}
	multicode = multicode + '<br />';
	return multicode;
}

function formgenerate(formNum) {
	var newForm = g_tpForm[formNum];
	
	var fdiv = document.createElement("div");
	//fdiv.setnameibute('id',"tp"+formNum);
	fdiv.setAttribute('id',idDiv(formNum));
	fdiv.className = classDiv;
	//add the tips
	var htmlcode = '<p class="'+classTips+'" id="'+idTips(newForm.name) + '">'+newForm.tips+'</p>';
	
	//process the input fild
	switch (newForm.inputs.type) {
		case "radio" :
			htmlcode = htmlcode + radioInput(newForm.name, newForm.inputs );			
			break;
			
		case "multi" :
			htmlcode = htmlcode + multiInput(newForm.name, newForm.inputs );	
			break;
			
		default:
			break;
	}
	
	
	fdiv.innerHTML = htmlcode;
	document.getElementById('tp-form').appendChild(fdiv);
	return ;	
}

function tpButtonDisplay() {
	var prevNo = g_tpForm[g_tpCurFormNo].prev;
	
	if (null == prevNo) {
		document.getElementById('tp-bt-prev').style.display = 'none';
	} else {
		document.getElementById('tp-bt-prev').style.display = 'inline-block';
	}
	
	if (g_tpForm[g_tpCurFormNo].name == "end") {
		//hide next button
		document.getElementById('tp-bt-next').style.display = 'none';
		//show submit button
		document.getElementById('tp-submit').style.display = 'inline-block';
	} else {
		//hide next button
		document.getElementById('tp-bt-next').style.display = 'inline-block';
		//show submit button
		document.getElementById('tp-submit').style.display = 'none';
	}		
}

function tpEntry() {
	formgenerate(0);
	tpButtonDisplay();
	return ;
}


function tpPrev() {
	var prevNo = g_tpForm[g_tpCurFormNo].prev;
	var prevId = idDiv(prevNo);
	
	//hide current form
	var currentId = idDiv(g_tpCurFormNo);
	document.getElementById(currentId).style.display = 'none';
	
	if (prevNo == null) {
		document.getElementById('tp-bt-prev').style.display = 'none';
	} else {
		//show previous form
		document.getElementById(prevId).style.display = 'block';
	}
	
	document.getElementById('tp-bt-next').style.display = 'inline-block';
	
	g_tpCurFormNo = prevNo;
	tpButtonDisplay();
	return ;	 
}

function tpNext() {
	var newForm = g_tpForm[g_tpCurFormNo];
	var nextFormNo = g_tpCurFormNo + 1;
	
	if (newForm.inputs.type === "radio") {
		var name = nameAttr(newForm.name);
		var radios = document.getElementsByName(name);
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				// get the value
				var radiovalue = radios[i].value;
				if (newForm.inputs.next[radiovalue] != null) {
					nextFormNo = newForm.inputs.next[radiovalue];
				}
				// only one radio can be logically checked, don't check the rest
				break;
			}
		}
	}
		
	//hide current form
	var currentId = idDiv(g_tpCurFormNo);
	document.getElementById(currentId).style.display = 'none';
	
	var nextId = idDiv(nextFormNo);
	var nextElem = document.getElementById(nextId);
	
	if (nextElem == null) {
		//generate new form
		formgenerate(nextFormNo);
	} else {
		nextElem.style.display = 'block';
	}
	//update the prev index
	g_tpForm[nextFormNo].prev = g_tpCurFormNo;
	//update current form number
	g_tpCurFormNo = nextFormNo;
	tpButtonDisplay();
}



