/* @jsx createElement */
import { createElement, Component } from './react.js';
import Title from './Title.js';
import Counter from './Counter.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title className="text-blue" title="Tiny React" />
        <Counter />
      </div>
    );
  }
}

export default App;
