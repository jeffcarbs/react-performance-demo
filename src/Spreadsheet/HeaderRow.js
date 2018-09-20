import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import eventCounter from '../lib/eventCounter';

class HeaderRow extends PureComponent {
  static propTypes = {
    columns: PropTypes.array.isRequired,
  };

  renderHeaderCell = column => {
    eventCounter('HeaderCell');

    return <th key={column.key}>{column.name}</th>;
  };

  render() {
    return <tr>{this.props.columns.map(this.renderHeaderCell)}</tr>;
  }
}

export default HeaderRow;
