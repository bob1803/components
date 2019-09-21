import React from "react";
import "./swiper.less";
import { observable, useStrict, action, toJS, computed } from "mobx";
import { observer } from "mobx-react";

useStrict(true);

class SwiperState {
  constructor() {
    this.prev = 0;
    this.startPrev = 0;
    this.startNext = 0;
    this.dots = [];
    this.next = 0;
    this.animation = true;
    this.itemWidth = null;
    this.start = {};
    this.viewportWidth = null;
    this.contentWidth = null;

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
  animation;

  @action
  toogleAnimation() {
    this.animation = !this.animation;
  }

  @observable
  dots;

  @action
  setDots(newDots) {
    this.dots = newDots;
  }

  @observable
  next;

  @action
  setNext(newValue) {
    this.next = newValue;
  }

  @observable
  start;

  @action
  setStart(newValue) {
    this.start = newValue;
  }

  @observable
  startPrev;

  @action
  setStartPrev(newPrev) {
    this.startPrev = newPrev;
  }

  @observable
  startNext;

  @action
  setStartNext(newNext) {
    this.startNext = newNext;
  }

  @observable
  delta;

  @action
  setDelta(newValue) {
    this.delta = newValue;
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

  @computed
  get maxScroll() {
    return this.contentWidth - this.viewportWidth;
  }

   // the size scrolling to the end
  @computed
  get toEnd() {
    return this.contentWidth - this.viewportWidth - this.prev;

  }
}

const cssTransition = {
  transition: `all 0.5s;`
};

@observer
export default class Swiper extends React.Component {
  constructor(props) {
    super(props);
    this._id =
      this.props.id ||
      "swiper" +
        Math.random()
          .toString(16)
          .slice(2);
    this._elem = null; // Root DOM node
    this._content = null; // DOM node, container with items
    this._viewPort = null; // DOM node with visible area
    this._stickingSize = this.props.stickingSize || 150; //если остаток картинки меньше, то докручивать до конца
    this._state = new SwiperState(); // setup object MOBX with state slider
    this._classViewport = "swiper_viewport"; //CSS class the viewport
    this._classContent = "swiper_content"; // CSS class the content container
    this._cssTransition = cssTransition; //animation for translate
    this._minValueSwipe = 50; //min value move in 'px' for determine the swipe
    this._maxScroll = null;
  }

  _getConfigDots = () => {
    let countDotsNext = 0;
    let countDotsPrev = 0;

    let centeredNext = this.__centeringItem(true, 0);
    if (Math.abs(centeredNext) > this._state.itemWidth) {
      centeredNext -= this._state.itemWidth;
    }

    let centeredPrev = Math.abs(this.__centeringItem(false, 0));
    if (centeredPrev > this._state.itemWidth) {
      centeredPrev -= this._state.itemWidth;
    }

    for (let sizeNext = this._state.next; sizeNext > 0; ) {
      if (this._state.prev === 0 && countDotsNext === 0) {
        ++countDotsNext;
        sizeNext = sizeNext - centeredNext;
      } else {
        ++countDotsNext;
        sizeNext = sizeNext - this._state.itemWidth;
      }
    }
    for (let sizePrev = this._state.prev; sizePrev > 0; ) {
      if (this._state.next === 0 && countDotsPrev === 0) {
        ++countDotsPrev;
        sizePrev = sizePrev - centeredPrev;
      } else {
        ++countDotsPrev;
        sizePrev = sizePrev - this._state.itemWidth;
      }
    }

    const dots = [];
    //set dots prev
    for (let i = 0; i < countDotsPrev; i++) {
      dots.push({
        active: false,
        value: i + 1,
        direction: "prev"
      });
    }
    dots.reverse();
    //set dot active
    if (countDotsPrev !== 0 || countDotsNext !== 0) {
      dots.push({
        active: true,
        value: null,
        direction: "active"
      });
    }
    //set dots next
    for (let i = 0; i < countDotsNext; i++) {
      dots.push({
        active: false,
        value: i + 1,
        direction: "next"
      });
    }
    return dots;
  };

  _getViewportWidth = () => {
    return this._viewPort.clientWidth;
  };

  _getContentWidth = () => {
    return (
      this._state.itemWidth * this.props.children.length - this._state.prev
    );
  };

  _getAvailableNext = () => {
    return this._state.contentWidth - this._state.viewportWidth;
  };

  _getItemWidth = () => {
    const countItems = React.Children.count(this.props.children);
    let itemWidth =
      this.props.itemWidth || this._state.contentWidth / countItems;

    itemWidth =
      this._state.viewportWidth < itemWidth ? this._state.viewportWidth : itemWidth;
      return itemWidth;
  };

  _onTouchStart = event => {
    this._state.toogleAnimation();
    let touches = event.touches[0];

    // measure start values
    this._state.setStart({
      x: touches.pageX,
      y: touches.pageY
    });

    //save startPrev value
    this._state.setStartPrev(toJS(this._state.prev));

    //save startNext value
    this._state.setStartNext(toJS(this._state.next));

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

    // swipeSize < 0  --- swipe next
    // swipeSize > 0  --- swipe prev

    //disable scroll outside content
    if (this._state.prev + swipeSizeX >= this._state.maxScroll) {

      this._state.setPrev(this._state.maxScroll);
      this._state.setNext(0);
    } else if (this._state.prev + swipeSizeX <= 0) {

      this._state.setPrev(0);
      this._state.setNext(this._state.maxScroll);
    } else {

      this._state.setPrev(this._state.prev + swipeSizeX);
      this._state.setNext(this._state.next - swipeSizeX);
    }
  };

  _onTouchEnd = event => {
    this._state.toogleAnimation();
    let touches = event.changedTouches[0];
    let swipeSizeX = touches.pageX - this._state.start.x;

    // if swipe direction prev
    if (this._state.delta.x > 0) this._swipePrev(swipeSizeX);

    // if swipe direction prev
    if (this._state.delta.x < 0) this._swipeNext(swipeSizeX);

    // reset delta the swipe
    this._state.setDelta({});
  };

  __centeringItem = (direction, swipeSize) => {
    // direction === true - next, direction === false - prev
    // total number of cards
    let countItems = this.props.children.length;

    // find the current card you want to center
    let currentCenterItem = Math.ceil(
      (this._state.viewportWidth / 2 + this._state.prev) / this._state.itemWidth
    );

    // if swipe was less than half a card,
    // and this is not the first card, then scroll it to the middle of the next card
    if (direction) {
      // to Next
      if (
        // when one card in viewport, we go to the next
        //swipeSize < this._state.itemWidth / 2 &&
        this._state.viewportWidth / this._state.itemWidth === 1
      ) {
        ++currentCenterItem;

      } else if (
        // the first step we center half the card, then the whole card
        this._state.startPrev !== 0 &&
        this._state.viewportWidth / this._state.itemWidth > 1
      ) {
        ++currentCenterItem;
      }
    }
    if (!direction) {
      // to Prev
      if (
        // when one card in viewport we go to the prev
        swipeSize < this._state.itemWidth / 2 &&
        this._state.viewportWidth / this._state.itemWidth === 1
      ) {
        --currentCenterItem;
      } else if (
        // the first step we center half the card, then the whole card
        this._state.startNext !== 0 &&
        this._state.viewportWidth / this._state.itemWidth > 1
      ) {
        --currentCenterItem;
      }
    }

    // current remainder in the left
    let currentPrevSize =
      currentCenterItem * this._state.itemWidth -
      this._state.itemWidth / 2 -
      this._state.prev;

    // current remainder in the right
    let currentNextSize =
      (countItems - currentCenterItem) * this._state.itemWidth +
      this._state.itemWidth / 2 -
      this._state.next;

    // difference of remainders and there will be an offset value for alignment.
    // Negative to the right, positive to the left.

    // if the value centering on the starting position is negative,
    // then we recalculate the center for the next item
    if (this._state.prev === 0 && currentPrevSize - currentNextSize < 0) {
      currentCenterItem = ++currentCenterItem;
      // current remainder in the left
      currentPrevSize =
        currentCenterItem * this._state.itemWidth -
        this._state.itemWidth / 2 -
        this._state.prev;
      // current remainder in the right
      currentNextSize =
        (countItems - currentCenterItem) * this._state.itemWidth +
        this._state.itemWidth / 2 -
        this._state.next;
    }

    // if the value centering on the starting position prev,
    // then we recalculate the center for the next item

    if (this._state.next === 0 && currentPrevSize - currentNextSize > 0) {
      currentCenterItem = --currentCenterItem;

      // current remainder in the left
      currentPrevSize =
        currentCenterItem * this._state.itemWidth -
        this._state.itemWidth / 2 -
        this._state.prev;

      // current remainder in the right
      currentNextSize =
        (countItems - currentCenterItem) * this._state.itemWidth +
        this._state.itemWidth / 2 -
        this._state.next;
    }

    return (currentPrevSize - currentNextSize) / 2;
  };

  // scrolling to the begin
  _toBegin = () => {
    return this._state.prev;
  };

  _swipePrev = swipeSize => {
    let swipeSizeX = Math.abs(swipeSize);

    // if move is less than the determined minimum value for swipe, - reset the swipe
    if (swipeSizeX < this._minValueSwipe) {
      this._state.setPrev(toJS(this._state.startPrev));
      this._state.setNext(toJS(this._state.startNext));
      this._state.setDelta({
        x: 0,
        y: 0
      });
      return;
    }

    let valueCentering = this.__centeringItem(false, swipeSizeX);

    let scrollSize;

    // if the swipe is smaller then remainder,
    if (swipeSizeX <= this._state.startPrev) {
      scrollSize = valueCentering;
      if (this._state.prev + scrollSize <= 0) {
        scrollSize = -this._state.prev;
      }
    } else {
      scrollSize = this._state.prev;

      // here you can handle the scroll end animation
    }

    this._state.setPrev(this._state.prev + scrollSize);
    this._state.setNext(this._state.next - scrollSize);
    this._state.setDots(this._getConfigDots());
  };

  _swipeNext = swipeSize => {
    
    let swipeSizeX = Math.abs(swipeSize);

    // if move is less than the determined minimum value for swipe, - reset the swipe
    if (swipeSizeX < this._minValueSwipe) {
      this._state.setPrev(toJS(this._state.startPrev));
      this._state.setNext(toJS(this._state.startNext));
      this._state.setDelta({
        x: 0,
        y: 0
      });
      return;
    }
    let valueCentering = this.__centeringItem(true, swipeSizeX);

    let scrollSize;

    // if the swipe is smaller then remainder,
    if (swipeSizeX > this._state.startNext) {

      scrollSize = this._state.toEnd;
    } else if (swipeSizeX + valueCentering <= this._state.startNext) {
      
      scrollSize = valueCentering;
    } else {

      scrollSize = this._state.toEnd;

      // here you can handle the scroll end animation
    }

    this._state.setPrev(this._state.prev + scrollSize);
    this._state.setNext(this._state.next - scrollSize);
    this._state.setDots(this._getConfigDots());
  };

  _getClassShadowSide = () => {
    if (+this._state.prev !== 0 && +this._state.next !== 0) {
      return "swiper_shadow_right_left";
    }
    if (+this._state.prev !== 0 && this._state.next === 0) {
      return "swiper_shadow_left";
    }
    if (this._state.prev === 0 && +this._state.next !== 0) {
      return "swiper_shadow_right";
    }
  };

  _getClassShadowLeft = () => {
    if (+this._state.prev !== 0 ) {
      return "swiper_shadow_left";
    }
  }

  _getClassShadowRight = () => {
    if (this._state.next !== 0 ) {
      return "swiper_shadow_right";
    }
  }

  _getClassAnimation = () => {
    return this._state.animation
      ? "swiper_animation"
      : "swiper_animation_none";
  };

  _clickDot = event => {
    let direction = event.target.getAttribute("direction");
    if (direction === "active") return;
    let countStep = event.target.getAttribute("val");
    if (direction === "next") this._scrollNext(+countStep);
    if (direction === "prev") this._scrollPrev(+countStep);
  };

  _clickArrow = event => {
    let target = event.target;
    while (target !== this._elem) {
      if (target.classList.contains("swiper_arrow")) {
        let direction = target.getAttribute("direction");
        if (direction === "next" && this._state.next !== 0) this._scrollNext(1);
        if (direction === "prev" && this._state.prev !== 0) this._scrollPrev(1);
        return;
      }
      target = target.parentNode;
    }
  };

  _scrollNext = countStep => {
    let scrollSize = 0;

    for (let i = 0; i < countStep; i++) {
      // if we scroll from the very beginning
      if (i === 0 && this._state.prev === 0) {
        scrollSize = this.__centeringItem(true, 0, "logged scrollNext");

      // if only one iteration
        scrollSize = (scrollSize > this._state.next) ? this._state.next : scrollSize;
        continue;
      }
      scrollSize += this._state.itemWidth;

      // if the calculated value is more than possible
      if (scrollSize > this._state.next) {
        scrollSize = this._state.toEnd;

        break;
      }
    }

    this._state.setPrev(this._state.prev + scrollSize);
    this._state.setNext(this._state.next - scrollSize);
    this._state.setDots(this._getConfigDots());
  };

  _scrollPrev = countStep => {
    let scrollSize = 0;
    for (let i = 0; i < countStep; i++) {

      // if we scroll out the very end
      if (i === 0 && this._state.next === 0) {
        scrollSize = Math.abs(this.__centeringItem(false, 0));

        
      // if only one iteration
      scrollSize = (scrollSize > this._state.prev) ? this._state.prev : scrollSize;
        continue;
      }
      scrollSize += this._state.itemWidth;

      // if the calculated value is more than possible
      if (scrollSize > this._state.prev) {
        scrollSize = this._state.prev;
        break;
      }
    }

    this._state.setPrev(this._state.prev - scrollSize);
    this._state.setNext(this._state.next + scrollSize);
    this._state.setDots(this._getConfigDots());
  };

  _clickDot = event => {
    let direction = event.target.getAttribute("direction");
    if (direction === "active") return;
    let countStep = event.target.getAttribute("val");
    if (direction === "next") this._scrollNext(+countStep);
    if (direction === "prev") this._scrollPrev(+countStep);
  };

  _initialSwiper = () => {
    this._state.setPrev(0);
    this._state.setViewportWidth(this._getViewportWidth()); // to reduce DOM operations
    this._state.setItemWidth(this._getItemWidth());
    this._state.setContentWidth(this._getContentWidth()); // to reduce DOM operations
    this._state.setNext(this._getAvailableNext());
    this._state.setDots(this._getConfigDots());
  };

  _resize = () => {
    // if resize has changed viewport width
    if (this._getViewportWidth() !== this._state.viewportWidth) {
      this._initialSwiper();
    }
  };

  componentWillUnmount() {
      window.removeEventListener("onload", this._initialSwiper);
      window.removeEventListener("resize", this._resize);

  }

  componentDidMount() {
    this._initialSwiper();
    this._viewPort.addEventListener("touchstart", this._onTouchStart, false);
    this._viewPort.addEventListener("touchmove", this._onTouchMove, false);
    this._viewPort.addEventListener("touchend", this._onTouchEnd, false);
    window.addEventListener("resize", this._resize, false);
    window.addEventListener("onload", this._initialSwiper, false);
  }

  render() {
    return (
      <div
        ref={node => {
          this._elem = node;
        }}
        className="swiper_container"
      >
        <div className="swiper_wrap_content_arrow">
          <div
            onClick={this._clickArrow}
            direction="prev"
            className={`${"swiper_arrow_prev"} ${
              this._state.prev === 0
                ? "swiper_inactiveArrow"
                : "swiper_arrow"
            }`}
          >
            <svg
              className="swiper_arrow_ico"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.141,13.418c0.268,0.271 0.268,0.709 0,0.978c-0.268,0.27 -0.701,0.272 -0.969,0l-3.83,-3.908c-0.268,-0.27 -0.268,-0.707 0,-0.979l3.83,-3.908c0.267,-0.27 0.701,-0.27 0.969,0c0.268,0.271 0.268,0.709 0,0.978l-3.141,3.421l3.141,3.418Z" />
            </svg>
          </div>
          <div
            ref={node => (this._viewPort = node)}
            className="swiper_viewport"
          >
           <div className={this._getClassShadowLeft()}></div>
            <div
              ref={node => {
                this._content = node;
              }}
              className={`${"swiper_content"} ${this._getClassAnimation()}`}
              style={{ marginLeft: `-${this._state.prev}px` }}
            >
              {this.props.children.map((item, index) => (
                <div
                  className="swiper_item"
                  style={{
                    minWidth: `${this._state.itemWidth}px`
                  }}
                  key={index}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className={this._getClassShadowRight()}></div>

          </div>
          <div
            onClick={this._clickArrow}
            direction="next"
            className={`${"swiper_arrow_next"} ${
              this._state.next === 0
                ? "swiper_inactiveArrow"
                : "swiper_arrow"
            }`}
          >
            <svg
              className="swiper_arrow_ico"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11,10l-3.141,-3.42c-0.268,-0.27 -0.268,-0.707 0,-0.978c0.268,-0.27 0.701,-0.27 0.969,0l3.83,3.908c0.268,0.271 0.268,0.709 0,0.979l-3.83,3.908c-0.267,0.272 -0.701,0.27 -0.969,0c-0.268,-0.269 -0.268,-0.707 0,-0.978l3.141,-3.419Z" />
            </svg>
          </div>
        </div>
        <div className="swiper_wrap_dots">
          {this._state.dots.map((item, index) => (
            <div
              key={index}
              onClick={this._clickDot}
              val={item.value}
              direction={item.direction}
              className={
                item.active ? "swiper_dotActive" : "swiper_dot"
              }
            />
          ))}
        </div>
      </div>
    );
  }
}
