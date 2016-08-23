import React from 'react';

let clickComp = React.createClass({
    handleClick: function (event) {
        console.log(this);
        let tipE = React.findDOMNode(this.refs.tip);
        if (tipE.style.display === 'none') {
            tipE.style.display = 'inline';
        }else {
            tipE.style.display = 'none';
        }
        event.stopPropagation();
        event.preventDefault();
    },
    render: function () {
        return (
            <div>
                <button onClick={this.handleClick}>显示｜隐藏</button>
                <span ref="tip">测试点击</span>
            </div>
        );
    }
});

let inputComp = React.createClass({
    getInitialState: function () {
        return {
            inputContent: ''
        }
    },
    handleChange: function (event) {
        this.setState({
            inputContent: event.target.value
        });
        event.stopPropagation();
        event.preventDefault();
    },
    render: function () {
        return (
            <div>
                <input type="text" onChange={this.handleChange} /><span>{this.state.inputContent}</span>
            </div>
        );
    }
});

var MyComponent1 = React.createFactory(clickComp);
var MyComponent = React.createFactory(inputComp);
let TestComponent = React.createClass({
    render: function () {
        return (
            <div>
                <MyComponent />
                <MyComponent1 />
            </div>
        );
    }
})

export default TestComponent;

// ReactDOM.render(<div></div>, document.getElementById('cont'));
