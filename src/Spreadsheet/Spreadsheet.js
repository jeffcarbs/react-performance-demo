import React, { Component } from 'react';
import PropTypes from 'prop-types';

import eventCounter from '../lib/eventCounter';

import HeaderRow from './HeaderRow';
import Row from './Row';

import './Spreadsheet.css';

const columnsToShow = (columns, hiddenColumnKeys) => {
  const hiddenColumnSet = new Set(hiddenColumnKeys);
  return columns.filter(column => !hiddenColumnSet.has(column.key));
};

class Spreadsheet extends Component {
  static propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
  };

  state = {
    selectedRange: undefined,
    hiddenColumnKeys: [],
    rows: [...this.props.rows],
    visibleColumns: [...this.props.columns],
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

  handleHeaderRemoveClick = (e, { key }) => {
    const hiddenColumnKeys = [...this.state.hiddenColumnKeys, key];

    this.setState({
      hiddenColumnKeys,
      visibleColumns: columnsToShow(this.props.columns, hiddenColumnKeys),
    });
  };

  handleCellRemoveClick = (e, { rowIdx, columnIdx }) => {
    const column = this.state.visibleColumns[columnIdx];
    const rows = this.state.rows;

    rows[rowIdx] = { ...rows[rowIdx], [column.key]: null };
    this.setState({ rows });
  };

  renderRow = (row, rowIdx) => {
    const { selectedRange, visibleColumns } = this.state;

    const selected =
      selectedRange && selectedRange.start.rowIdx <= rowIdx && selectedRange.stop.rowIdx >= rowIdx;

    return (
      <Row
        key={row.id}
        columns={visibleColumns}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onRemoveClick={this.handleCellRemoveClick}
        row={row}
        rowIdx={rowIdx}
        selectedStart={selected ? selectedRange.start.columnIdx : undefined}
        selectedStop={selected ? selectedRange.stop.columnIdx : undefined}
      />
    );
  };

  render() {
    eventCounter('Spreadsheet');

    const { visibleColumns } = this.state;

    return (
      <table>
        <thead>
          <HeaderRow columns={visibleColumns} onRemoveClick={this.handleHeaderRemoveClick} />
        </thead>
        <tbody>{this.state.rows.map(this.renderRow)}</tbody>
      </table>
    );
  }
}

export default Spreadsheet;
