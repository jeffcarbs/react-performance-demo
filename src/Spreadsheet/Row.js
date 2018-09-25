import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import eventCounter from '../lib/eventCounter';

import Cell from './Cell';

class Row extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    rowIdx: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    selectedStart: PropTypes.number,
    selectedStop: PropTypes.number,
  };

  renderCell = (column, columnIdx) => {
    const { selectedRange, rowIdx } = this.props;

    const selected =
      this.props.selectedStart !== undefined &&
      this.props.selectedStart <= columnIdx &&
      this.props.selectedStop >= columnIdx;

    return (
      <Cell
        key={column.key}
        selected={!!selected}
        onMouseDown={this.props.onMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onRemoveClick={this.props.onRemoveClick}
        columnIdx={columnIdx}
        rowIdx={this.props.rowIdx}
        value={this.props.row[column.key]}
      />
    );
  };

  render() {
    eventCounter('Row');

    return <tr key={this.props.row.id}>{this.props.columns.map(this.renderCell)}</tr>;
  }
}

export default Row;
