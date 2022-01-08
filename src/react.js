export function render(component, container) {
  if (typeof component === 'string') {
    container.appendChild(document.createTextNode(component));
  } else if (typeof component === 'number') {
    container.appendChild(document.createTextNode(component.toString()));
  } else if (typeof component === 'object') {
    const { tagName, props, children } = component;
    const $el = document.createElement(tagName);
    if (props) {
      for (const [propsKey, propsValue] of Object.entries(props)) {
        switch (propsKey) {
          case 'className':
            $el.setAttribute('class', propsValue);
            break;
          case 'style':
            for (const [styleName, styleValue] of Object.entries(propsValue)) {
              $el.style[styleName] = styleValue;
            }
            break;
          case 'onClick':
            $el.addEventListener('click', propsValue);
            break;
          default:
            $el.setAttribute(propsKey, propsValue);
            break;
        }
      }
    }
    children.forEach((child) => {
      render(child, $el);
    });
    container.appendChild($el);
  }
}

export function createElement(tagName, props, ...children) {
  if (typeof tagName === 'function') {
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({ ...props, children });
      return instance.render();
    }
    return tagName.apply(null, [props, ...children]);
  }
  return {
    tagName,
    props,
    children,
  };
}

export class Component {
  constructor(props) {
    this.props = props;
  }
  setState(newState) {
    this.state = newState;
    this.render();
  }
}
