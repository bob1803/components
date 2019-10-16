import React from "react";
import "./swiperX.less";
import { observable, useStrict, action, toJS, computed } from "mobx";
import { observer } from "mobx-react";

let log = logObj => console.log(logObj);

useStrict(true);

class SwiperXState {
  constructor() {
    this.prev = 0;
    this.startPrev = 0;
    this.stickyItem = null;
    this.itemWidth = null;
    this.viewportWidth = null;
    this.contentWidth = null;
    this.availableShift = null;
    this.start = {};
    this.delta = {
      x: 0,
      y: 0
    };
  }

  @observable
  prev;

  @action
  setPrev(newValue) {
    this.prev = newValue;
  }

  @observable
  startPrev;

  @action
  setStartPrev(newPrev) {
    this.startPrev = newPrev;
  }

  @observable
  delta;

  @action
  setDelta(newValue) {
    this.delta = newValue;
  }

  @observable
  start;

  @action
  setStart(newValue) {
    this.start = newValue;
  }

  @observable
  itemWidth;

  @action
  setItemWidth(newWidth) {
    this.itemWidth = newWidth;
  }

  @observable
  viewportWidth;

  @action
  setViewportWidth(newWidth) {
    this.viewportWidth = newWidth;
  }

  @observable
  contentWidth;

  @action
  setContentWidth(newWidth) {
    this.contentWidth = newWidth;
  }

  @observable
  availableShift;

  @action
  setAvailableShift(newAvailableShift) {
    this.availableShift = newAvailableShift;
  }

  @observable
  stickyItem;

  @action
  setStickyItem(newItem) {
    this.stickyItem = newItem;
  }
}

@observer
export default class SwiperX extends React.Component {
  constructor(props) {
    super(props);
    this._state = new SwiperXState();
    this._elem = null; // Root DOM node
    this._content = null; // DOM node, container with items
    this._viewPort = null; // DOM node with visible area
    this._countItems = React.Children.count(this.props.children);
  }

  _getContentWidth = () => {
    return (
      this._state.itemWidth * this.props.children.length // - this._state.prev
    );
  };

  _getItemWidth = () => {
    const countItems = React.Children.count(this.props.children);
    let itemWidth =
      this.props.itemWidth || this._state.contentWidth / countItems;

    itemWidth =
      this._state.viewportWidth < itemWidth
        ? this._state.viewportWidth
        : itemWidth;
    return itemWidth;
  };

  _onTouchStart = event => {
    let touches = event.touches[0];
    // measure start values
    this._state.setStart({
      x: touches.pageX,
      y: touches.pageY
    });

    //save startPrev value
    this._state.setStartPrev(toJS(this._state.prev));

    // reset value delta
    this._state.setDelta({
      x: 0,
      y: 0
    });
  };

  _onTouchMove = event => {
    // ensure swiping with one touch and not pinching
    if (event.touches.length > 1 || (event.scale && event.scale !== 1)) return;

    let touches = event.touches[0];

    let swipeSizeX =
      this._state.delta.x - (touches.pageX - this._state.start.x);

    // measure change in x and y
    this._state.setDelta({
      x: touches.pageX - this._state.start.x,
      y: touches.pageY - this._state.start.y
    });

    // swipeSize < 0  --- swipe next // swipeSize > 0  --- swipe prev
    /*
    console.log("_onTouchMove", {
      swipe__size: swipeSizeX,
      prev__state: this._state.prev
    });
    */

    let newPrew = this._state.prev - swipeSizeX;
    // newPrew = swipeSizeX > 0 ? newPrew : -newPrew;

    this._state.setPrev(newPrew);
  };

  _onTouchEnd = event => {
    //this._state.toogleAnimation();
    let touches = event.changedTouches[0];
    let swipeSize = touches.pageX - this._state.start.x;

    // if swipe direction prev
    if (this._state.delta.x > 0) this._movePrev(swipeSize);

    // if swipe direction prev
    if (this._state.delta.x < 0) this._moveNext(swipeSize);

    // reset delta the swipe
    this._state.setDelta({});
    //console.log("_onTouchEnd");
  };

  _getStickyItemForNext = swipeSize => {
    swipeSize = Math.abs(swipeSize);
    let availableNext = Math.ceil(
      this._state.contentWidth - this._state.viewportWidth + this._state.prev
    );
    let newStickyItem;
    // console.log(this.props.children.length, "children")
    switch (true) {
      //do not move to centered on finger shake
      case swipeSize < 16:
        newStickyItem = this._state.stickyItem;
        break;
      case swipeSize >= availableNext:
        newStickyItem = this._countItems;
        break;
      case swipeSize < availableNext:
        newStickyItem =
          this._state.stickyItem + Math.ceil(swipeSize / this._state.itemWidth);
        break;
    }

    log({
      call: " _getStickyItemForNext",
      swipeSize: swipeSize,
      availableNext: availableNext,
      newStickyItem: newStickyItem
    });

    return newStickyItem;
  };

  _movePrev = swipeSize => {
    swipeSize = Math.abs(swipeSize);
    let stickyItem = this._getStickyItemForPrev(swipeSize);
    let valuePushUp;
    switch (true) {
      case stickyItem === 1:
        valuePushUp = 0;
        break;
      case stickyItem === this._countItems:
        valuePushUp = -this._state.availableShift;
        break;
      default:
        valuePushUp = -(
          this._state.itemWidth * stickyItem -
          this._state.itemWidth
        );
    }

    this._state.setPrev(valuePushUp);
    this._state.setStickyItem(stickyItem);
  };

  _getStickyItemForPrev = swipeSize => {
    let newStickyItem;
    let caseItem;
    switch (true) {
      //do not move to centered on finger shake
      case swipeSize < 16:
        caseItem = "swipeSize < 16";
        newStickyItem = this._state.stickyItem;
        break;

      case this._state.prev >= 0:
        caseItem = "this._state.prev >= 0";
        newStickyItem = 1;
        break;

      case this._state.stickyItem === this._countItems:
        caseItem = "this._state.stickyItem === this._countItems";
        newStickyItem = Math.ceil(
          Math.abs(this._state.prev) / this._state.itemWidth
        );
        break;
      default:
        caseItem = "default";
        newStickyItem =
          this._state.stickyItem - Math.ceil(swipeSize / this._state.itemWidth);
        break;
    }

    log({
      call: " _getStickyItemForPrev",
      case: caseItem,
      swipeSize: swipeSize,
      prev: this._state.prev,
      newStickyItem: newStickyItem
    });
    return newStickyItem;
  };

  _moveNext = swipeSize => {
    let stickyItem = this._getStickyItemForNext(swipeSize);
    let valuePushUp;
    switch (true) {
      case stickyItem === 1:
        valuePushUp = 0;
        break;
      case stickyItem === this._countItems:
        valuePushUp = -this._state.availableShift;
        break;

      default:
        valuePushUp = -(
          this._state.itemWidth * stickyItem -
          this._state.itemWidth
        );
    }
    /*
    log({
      call: "_moveNext",
      stickyItem: stickyItem,
      valuePushUp: valuePushUp,
      statePrev: this._state.prev,
      countItems: this._countItems
    });
    */
    this._state.setPrev(valuePushUp);
    this._state.setStickyItem(stickyItem);
  };

  _resize = () => {
    //console.log("_resize");
  };

  componentDidMount() {
    this._viewPort = this._elem.getElementsByClassName("swiper-x__viewport")[0];
    this._content = this._elem.getElementsByClassName("swiper-x__content");
    this._initialSwiper();
    this._viewPort.addEventListener("touchstart", this._onTouchStart, false);
    this._viewPort.addEventListener("touchmove", this._onTouchMove, false);
    this._viewPort.addEventListener("touchend", this._onTouchEnd, false);
    window.addEventListener("resize", this._resize, false);
    window.addEventListener("onload", this._initialSwiper, false);
  }

  _initialSwiper = () => {
    this._state.setViewportWidth(this._viewPort.clientWidth); // to reduce DOM operations
    this._state.setItemWidth(this._getItemWidth());
    this._state.setContentWidth(this._getContentWidth()); // to reduce DOM operations
    this._state.setAvailableShift(
      this._state.contentWidth - this._state.viewportWidth
    );
    this._state.setStickyItem(1);
  };

  render() {
    return (
      <div
        ref={node => {
          this._elem = node;
        }}
        className="swiper-x__container"
      >
        <div className="swiper-x__wave-limiter-left"
        style={{borderRadius: "0 100% 100% 0 / 0 50% 50% 0",
        width: `${this._state.waveLimiter.leftWidth}`}}></div>
        <div className="swiper-x__viewport">
          <div
            className="swiper-x__content"
            style={{ marginLeft: `${this._state.prev}px` }}
          >
            {this.props.children.map((item, index) => (
              <div
                className="swiper-x__item"
                style={{
                  minWidth: `${this._state.itemWidth}px`
                }}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="swiper-x__wave-limiter-right"
          style={{borderRadius: "100% 0 0 100% / 50% 0 0 50%",
          width: `${this._state.waveLimiter.rightWidth}`}}></div>
      </div>
    );
  }
}
