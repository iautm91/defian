import React, { Component, createRef } from 'react';
import Try from './Try.jsx';

function getNumbers(){ //숫자 네개를 겹치지않고 뽑음
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i< 4; i += 1){
        const choosen = candidate.splice(Math.floor(Math.random()*(9-i)),1)[0];
        array.push(choosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result:'',
        value:'',
        answer: getNumbers(),
        tries:[],
    };

    onSubmitForm = (e) => {
        const { result, value, answer, tries } = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState((prevState) => {
                return {
                    result:'홈런',
                    tries:[...prevState.tries, {try:value, result:'홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value:'',
                answer: getNumbers(),
                tries:[],
            })
        }else{
            const answerArray = value.split('').map((v)=>parseInt(v));
            let strike =0;
            let ball =0;
            if(tries.length >= 9){
                this.setState({
                    result:'10번 넘게 틀려서 실패! 답은 '+answer.join(",")+'였습니다!',
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries:[],
                })
            } else {
                for (let i =0; i<4 ;i+=1){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
            }
            this.setState((prevState) => {
                return {
                    value:'',
                    tries: [...prevState.tries, { try:this.state.value, result: strike +'스트라이크,'+ ball +'볼 입니다.'}]
                };
            })
        }
        this.inputRef.current.focus();

    };

    onChangeInput = (e) => {
        this.setState({
            value : e.target.value
        })
    };

    inputRef = createRef();

    render(){
        return (
                <>
                <h1>{this.state.result}</h1>

                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>시도: {this.state.tries.length} </div>
                <ul>
                    {this.state.tries.map((v,i) =>{
                            return (
                                <Try key={`${i+1}차 시도 : `} tryInfo={v}/>
                            )
                        }
                    )}
                </ul>
                </>
        )
    }

}

export default NumberBaseball; // import NumberBaseball;


// export const hello = 'hello'; // import { hello }
// export const bye = 'hello'; // import { hello, bye }

// const React = require('react');
// exports.hello = 'hello';
// module.exports = NumberBaseball;
