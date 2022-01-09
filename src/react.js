let isFirstRender = true;
let rootElement = undefined;
let rootContainer = undefined;
let classComponentId = 0;

export function render(element, container) {
  if (isFirstRender) {
    rootElement = element;
    rootContainer = container;
    isFirstRender = false;
  }
  if (typeof element === 'string') {
    container.appendChild(document.createTextNode(element));
  } else if (typeof element === 'number') {
    container.appendChild(document.createTextNode(element.toString()));
  } else if (typeof element === 'object') {
    const { tagName, props, children } = element;
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
      const copiedClassComponentId = classComponentId++;
      const instance = new tagName({
        classComponentId: copiedClassComponentId,
        ...props,
        children,
      });
      const element = instance.render();
      return {
        ...element,
        props: {
          ...element.props,
          elementId: copiedClassComponentId,
        },
      };
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
    const newElement = this.render();

    const currentElement = findElement(
      rootElement,
      this.props.classComponentId
    );
    currentElement.children = newElement.children;

    while (rootContainer.firstChild) {
      rootContainer.removeChild(rootContainer.firstChild);
    }

    render(rootElement, rootContainer);
  }
}

function findElement(element, elementId) {
  let target = null;
  dfs(element);
  return target;

  function dfs(element) {
    if (element.props && element.props.elementId === elementId) {
      target = element;
      return;
    }
    if (element.children) {
      element.children.forEach((child) => {
        dfs(child);
      });
    }
  }
}
