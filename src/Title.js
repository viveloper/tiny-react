/* @jsx createElement */
import { createElement } from './react.js';

function Title({ title, className }) {
  return <h1 className={className}>{title}</h1>;
}

export default Title;
