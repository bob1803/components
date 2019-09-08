const getViewportWidth = () => document.documentElement.clientWidth;
const getSizeContainerByClassName = className => {
  const container = document.getElementsByClassName(className)[0];
  const visible = container.clientWidth !== 0 && container.clientHeight !== 0;
  return {
    width: container.clientWidth,
    height: container.clientHeight,
    visible: visible
  };
};
const isHidden = elem => {
  return !elem.offsetWidth && !elem.offsetHeight;
};
export { getViewportWidth, getSizeContainerByClassName, isHidden };
