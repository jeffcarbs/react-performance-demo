import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Spreadsheet.css';

class Spreadsheet extends Component {
  static propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
  };

  renderHeaderCell = column => {
    return <th key={column.key}>{column.name}</th>;
  };

  renderCell = (row, column) => {
    return <td key={column.key}>{row[column.key]}</td>;
  };

  renderRow = row => {
    return <tr key={row.id}>{this.props.columns.map(column => this.renderCell(row, column))}</tr>;
  };

  render() {
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
