document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('submit').addEventListener('click', function(e){
		const question = qAll('.required');
		const questionRadio = qAll('.required__radio');
		const radio = document.getElementsByName('class_type');
		const option = qAll('.option > input');
		const alert = qAll('.required > .alert');
		const ans = qAll('.question__input--text');
		const ansArray = [];
		const coordY = [];
		
		//判斷必填
		for(let i=0; i<question.length; i++){
			if(!ans[i].value){
				e.preventDefault();
				alert[i].style.display = getStyle('alertShow');
				question[i].style.backgroundColor = getStyle('bgcRed');
				ans[i].style.borderBottom = getStyle('underlineRed');
				coordY.push(question[i].offsetTop-question[i].scrollTop+question[i].clientTop);
			}else{
				alert[i].style.display = getStyle('alertHide');
				question[i].style.backgroundColor = getStyle('bgcWhite');
				ans[i].style.borderBottom = getStyle('underlineGrey');
				ansArray.push(question[i].firstElementChild.innerText+': '+ans[i].value);
			}
		}

		//判斷單選
		let radioCount = 0;
		for(let i=0; i<radio.length; i++){
			if(radio[i].checked){
				radioCount += 1;
				radio[i].parentNode.lastElementChild.style.display = getStyle('alertHide');
				radio[i].parentNode.style.backgroundColor = getStyle('bgcWhite');
				ansArray.push(radio[i].parentNode.firstElementChild.innerText + ': ' + radio[i].value);
			}
		}
		if(radioCount === 0){
			e.preventDefault();
			radio[0].parentNode.lastElementChild.style.display = getStyle('alertShow');
			radio[0].parentNode.style.backgroundColor = getStyle('bgcRed');
			coordY.push(radio[0].parentNode.offsetTop-radio[0].parentNode.scrollTop+radio[0].parentNode.clientTop);
		}

		//非必填
		let optionCount = 0
		for(let i=0; i<option.length; i++){
			if(option[i].value){
				optionCount += 1;
				ansArray.push(option[i].parentNode.parentNode.firstElementChild.innerText+': '+option[i].value);
			}
		}

		//判斷是否全部都填寫，並印出
		if(ansArray.length-optionCount === question.length+questionRadio.length){
			console.log(ansArray);
		 	window.alert('完成囉');
		 	self.location.reload();
		 	window.scrollTo(0, 0);
		}else{
			window.scroll(0, getY(coordY), 'instant');
		}
	})
})

// q
function qAll(element){
	return document.querySelectorAll(element);
}

// style
function getStyle(style){
	switch(style){
		case 'bgcRed':
			return '#ffebee';
		case 'bgcWhite':
			return '#fff';
		case 'alertShow':
			return 'block';
		case 'alertHide':
			return 'none';
		case 'underlineRed':
			return '1px solid #db4437';
		case 'underlineGrey':
			return '1px solid rgba(0,0,0,0.12)';
	}
}

// Y
function getY(arrY){
	return arrY.sort((a, b) => a-b)[0];
}