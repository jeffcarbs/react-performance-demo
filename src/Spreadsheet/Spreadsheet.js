import React, { Component } from 'react';
import PropTypes from 'prop-types';

import eventCounter from '../lib/eventCounter';

import Row from './Row';

import './Spreadsheet.css';

class Spreadsheet extends Component {
  static propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
  };

  state = {
    selectedRange: undefined,
  };

  handleMouseDown = (e, { rowIdx, columnIdx }) => {
    const start = { rowIdx, columnIdx };
    const stop = { rowIdx, columnIdx };

    this.setState({ selectedRange: { origin: start, start, stop } });

    this.mouseDown = true;
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseEnter = (e, { rowIdx, columnIdx }) => {
    if (!this.mouseDown) return;

    const { origin } = this.state.selectedRange;

    const start = {
      rowIdx: Math.min(origin.rowIdx, rowIdx),
      columnIdx: Math.min(origin.columnIdx, columnIdx),
    };
    const stop = {
      rowIdx: Math.max(origin.rowIdx, rowIdx),
      columnIdx: Math.max(origin.columnIdx, columnIdx),
    };

    this.setState({ selectedRange: { origin, start, stop } });
  };

  handleMouseUp = () => {
    if (!this.mouseDown) return;

    this.mouseDown = false;
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  renderHeaderCell = column => {
    eventCounter('HeaderCell');

    return <th key={column.key}>{column.name}</th>;
  };

  renderRow = (row, rowIdx) => {
    const { selectedRange } = this.state;

    const selected =
      selectedRange && selectedRange.start.rowIdx <= rowIdx && selectedRange.stop.rowIdx >= rowIdx;

    return (
      <Row
        key={row.id}
        columns={this.props.columns}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        row={row}
        rowIdx={rowIdx}
        selectedStart={selected ? selectedRange.start.columnIdx : undefined}
        selectedStop={selected ? selectedRange.stop.columnIdx : undefined}
      />
    );
  };

  render() {
    eventCounter('Spreadsheet');

    return (
      <table>
        <thead>
          <tr>{this.props.columns.map(this.renderHeaderCell)}</tr>
        </thead>
        <tbody>{this.props.rows.map(this.renderRow)}</tbody>
      </table>
    );
  }
}

export default Spreadsheet;
