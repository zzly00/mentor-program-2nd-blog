document.addEventListener('DOMContentLoaded', function(){
	let equation = [];
	q('.bottom').addEventListener('click', function(e){
		const text = e.target.innerText;
		let top = q('.top').innerText;
		
		// 0-9
		if(text>=0 && text<10 && top==='0'){
			q('.top').innerText = text;
		}else if(text>=0 && text<10 && equation.length===2 && top!='-0'){
			q('.top').innerText = text;
			equation.push(text);
		}else if(text>=0 && text<10 && equation.length===2 && top==='-0'){
			q('.top').innerText = '-'+text;
			equation.push('-'+text);
		}else if(text>=0 && text<10 && top.length<12){
			q('.top').innerText += text;
		}
		
		// .
		if(top.indexOf('.')<0 && text === '.'){
			q('.top').innerText += text;
		}
		
		// +-×÷
		if((text==='+' || text==='-' || text==='×' || text==='÷') && equation.length===0){
			equation.push(top);
			equation.push(getOperator(text));
		}else if((text==='+' || text==='-' || text==='×' || text==='÷') && equation.length===3){
			equation.splice(2, 1, getSecondNum(top));
			let ans = eval(equation.join(''));
			if(ans.toString().length<13){
				q('.top').innerText = ans;
			}else{
				q('.top').innerText = ans.toExponential(5);
			}
			equation = [ans.toString()];
			equation.push(getOperator(text));
		}else if((text==='+' || text==='-' || text==='×' || text==='÷') && equation.length===2){
			equation.splice(1, 1, getOperator(text));
		}else if((text==='+' || text==='-' || text==='×' || text==='÷') && equation.length===1){
			equation.splice(0, 1, getSecondNum(top));
			equation.push(getOperator(text));
		}

		// =
		if(text==='=' && equation.length===3){
			equation.splice(2, 1, getSecondNum(top));
			let ans = eval(equation.join(''));
			if(ans.toString().length<13){
				q('.top').innerText = ans;
			}else{
				q('.top').innerText = ans.toExponential(5);
			}
			equation = [ans.toString()];
		}

		// ac
		if(text === 'AC'){
			q('.top').innerText = '0';
			equation = [];
		}

		// +/-
		if(text === '+/-' && equation.length===2){
			q('.top').innerText = '-0';
		}else if(text === '+/-'){
			q('.top').innerText = top * -1;
		}
	
		// %
		if(text === '%'){
			q('.top').innerText = getPercentNum(top);
		}	
	})
})

// querySelector
function q(element){
	return document.querySelector(element);
}

// 轉換*/
function getOperator(str){
	if(str === '×'){
		return '*';
	}else if(str === '÷'){
		return '/';
	}else{
		return str;
	}
}

// 第二個數字<0，要加括弧
function getSecondNum(num){
	return num<0 ? `(${num})` : num;
}

// 一直點擊％後的結果
function getPercentNum(num){
	let numArr = num.toString().match(/[1-9]/g);
	let indexArr = [];
	for(let i=0; i<numArr.length; i++){
		if(num.toString().indexOf(numArr[i])<12){
			indexArr.push(num.toString().indexOf(numArr[i]));
		}
	}
	if(num%1===0){
		return num/100;
	}else if(num.toString().length>9 || num.toString().indexOf('e')>0){
		return Number(num).toExponential(5);
	}else{
		return (num/100).toFixed(indexArr[indexArr.length-1]+1);
	}
}
