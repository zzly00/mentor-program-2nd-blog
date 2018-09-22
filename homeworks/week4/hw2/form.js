document.addEventListener('DOMContentLoaded', function(){
	document.getElementById('submit').addEventListener('click', function(e){
		const question = document.querySelectorAll('.required');
		const questionRadio = document.querySelectorAll('.required__radio');
		const radio = document.getElementsByName('class_type');
		const option = document.querySelectorAll('.option > input');
		const alert = document.querySelectorAll('.required > .alert');
		const ans = document.querySelectorAll('.required > input');
		const ansArray = [];

		//顏色及顯示變數
		const bgcRed = '#ffebee';
		const bgcWhite = '#fff';
		const alertShow = 'block';
		const alertHide = 'none';
		const underlineRed = '#db4437';
		const underlineGrey = 'rgba(0,0,0,0.12)';

		
		//判斷必填
		for(let i=0; i<question.length; i++){
			if(!ans[i].value){
				e.preventDefault();
				alert[i].style.display = alertShow;
				question[i].style.backgroundColor = bgcRed;
				document.querySelectorAll('.required > .underline')[i].style.borderColor = underlineRed;
			}else{
				alert[i].style.display = alertHide;
				question[i].style.backgroundColor = bgcWhite;
				document.querySelectorAll('.required > .underline')[i].style.borderColor = underlineGrey;
				ansArray.push(question[i].firstElementChild.innerText+': '+ans[i].value);
			}
		}

		//判斷單選
		let radioCount = 0;
		for(let i=0; i<radio.length; i++){
			if(radio[i].checked){
				radioCount += 1;
				radio[i].parentNode.lastElementChild.style.display = alertHide;
				radio[i].parentNode.style.backgroundColor = bgcWhite;
				ansArray.push(radio[i].parentNode.firstElementChild.innerText + ': ' + radio[i].value);
			}
		}
		if(radioCount === 0){
			radio[0].parentNode.lastElementChild.style.display = alertShow;
			radio[0].parentNode.style.backgroundColor = bgcRed;
		}


		//非必填
		let optionCount = 0
		for(let i=0; i<option.length; i++){
			if(option[i].value){
				optionCount += 1;
				ansArray.push(option[i].parentNode.firstElementChild.innerText+': '+option[i].value);
			}
		}


		//判斷是否全部都填寫，並印出
		if(ansArray.length-optionCount == question.length+questionRadio.length){
			console.log(ansArray);
		 	window.alert('完成囉');
		 	self.location.reload();
		 	window.scrollTo(0, 0);
		}

	})
})