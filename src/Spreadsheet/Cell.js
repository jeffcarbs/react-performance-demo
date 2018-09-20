import React, { Component } from 'react';
import PropTypes from 'prop-types';

import eventCounter from '../lib/eventCounter';

class Cell extends Component {
  static propTypes = {
    rowIdx: PropTypes.number.isRequired,
    columnIdx: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    value: PropTypes.any,
  };

  handleMouseDown = e => {
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown(e, this.props);
  };

  handleMouseEnter = e => {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter(e, this.props);
  };

  render() {
    eventCounter('Cell');

    const { value } = this.props;

    return (
      <td
        className={this.props.selected ? 'selected' : ''}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
      >
        {value}
      </td>
    );
  }
}

export default Cell;
