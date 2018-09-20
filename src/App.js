import React, { Component } from 'react';

import rows from './lib/people-1000.json';
import Spreadsheet from './Spreadsheet';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'firstName', name: 'First Name' },
  { key: 'lastName', name: 'Last Name' },
  { key: 'email', name: 'Email' },
  { key: 'street1', name: 'Street 1' },
  { key: 'street2', name: 'Street 2' },
  { key: 'city', name: 'City' },
  { key: 'state', name: 'State' },
  { key: 'zip', name: 'Zip' },
];

class App extends Component {
  render() {
    return <Spreadsheet columns={columns} rows={rows} />;
  }
}

export default App;
