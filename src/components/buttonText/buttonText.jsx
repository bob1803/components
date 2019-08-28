import React from "react";
import { Link } from "react-router-dom";
import Radium from 'radium';

@Radium
export default class ButtonText extends React.Component {
  constructor(props) {
    super(props);
    this.styles = {
        button: {
            backgroundColor: this.props.config.backgroundColor,
            color: this.props.config.color,
            borderColor: this.props.config.border,
            borderRadius: this.props.config.borderRadius,
            width: '100%',
            padding: this.props.config.padding,
            fontWeight: this.props.config.fontWeight,
            ':hover': {
                backgroundColor: this.props.config.backgroundColorHover,
                borderColor: this.props.config.borderColorHover,
                color: this.props.config.colorHover
            }
        }
    }
  }

  render() {
    return (
      <div className="button-text__container">
        <Link to={this.props.config.buttonLink}>
          <button
            className="button-text__wrap"
            style={this.styles.button}
          >
            {this.props.config.text}
          </button>
        </Link>
      </div>
    );
  }
}
