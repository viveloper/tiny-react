/* @jsx createElement */
import { createElement, Component } from './react.js';
import Title from './Title.js';
import Count from './Count.js';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Title title="Tiny React" />
        <Count />
      </div>
    );
  }
}

export default App;
