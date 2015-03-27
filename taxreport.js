
var g_tpCurFormNo = 0;
var g_tpForm = [
	//question 1
	{//self
		attr: "self",
		tips: "您是否为自己报税?",
		inputs: {
			type: "radio",
			value: ["是","不是"],
			next: [null,null],
			defaultchecked: 0,				
		},
		prev: null,
	},
	{//marriage
		attr: "marriage",
		tips: "请选择您的婚姻状况?",
		inputs:{
			type: "radio",
			value: ["未婚","已婚","同居"],
			next: [null,null,null],
			defaultchecked: 0,
		},
		prev: null,
	},
	{
		attr: "end",
		tips: "信息搜集完成",
		prev: null,
		inputs : {
			type: "none",
		},
	},
];

var classDiv = "tp-div";
var classTips = "tp-tips";
function idDiv(formNumber) {
	return "tp"+formNumber;
}
function idTips(attr) {
	return "tp-tips-"+attr;
}
function nameRadio(attr) {
	return "tp_"+attr;
}

function formgenerate(formNum) {
	var newForm = g_tpForm[formNum];
	
	var fdiv = document.createElement("div");
	//fdiv.setAttribute('id',"tp"+formNum);
	fdiv.setAttribute('id',idDiv(formNum));
	fdiv.className = classDiv;
	
	//add the tips
	var htmlcode = '<p class="'+classTips+'" id="'+idTips(newForm.attr) + '">'+newForm.tips+'</p>';
		
	//process the input fild
	switch (newForm.inputs.type) {
		case "radio" :
			for (var j = 0; j < newForm.inputs.value.length; j++) {
				//add the radio
				htmlcode = htmlcode + '<input type="radio" name="'+nameRadio(newForm.attr)+'"' + 'value="' + j + '"';
				if (j == newForm.inputs.defaultchecked) {
					htmlcode = htmlcode + ' checked="checked"/>';
				} else {
					htmlcode = htmlcode + '/>';
				}
				//add the label
				htmlcode = htmlcode + '<label for="tp-rd-' + newForm.attr + '">' + newForm.inputs.value[j] + '</label><br />';
			}					
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
	
	if (g_tpForm[g_tpCurFormNo].attr == "end") {
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
		var name = nameRadio(newForm.attr);
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



