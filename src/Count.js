/* @jsx createElement */
import { createElement, Component } from './react.js';

class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handlePlusClick = () => {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
  };

  handleMinusClick = () => {
    this.setState({
      ...this.state,
      count: this.state.count - 1,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <button onClick={this.handleMinusClick}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.handlePlusClick}>+</button>
      </div>
    );
  }
}

export default Count;
