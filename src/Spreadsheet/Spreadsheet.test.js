import React from 'react';
import { mount } from 'enzyme';

import Spreadsheet from './spreadsheet';

describe('Spreadsheet', () => {
  const cellAt = (spreadsheet, rowIdx, columnIdx) =>
    spreadsheet
      .find('tbody tr')
      .at(rowIdx)
      .find('td')
      .at(columnIdx);

  const baseProps = {
    columns: [
      { key: 'id', name: 'ID' },
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
    ],
    rows: [
      { id: 0, firstName: 'Laila', lastName: 'Goodwin' },
      { id: 1, firstName: 'Marty', lastName: 'Thompson' },
      { id: 2, firstName: 'Madilyn', lastName: 'Hyatt' },
    ],
  };

  const renderSpreadsheet = props => mount(<Spreadsheet {...baseProps} {...props} />);

  it('allows selection by clicking on Cell then moving to other cells', () => {
    const spreadsheet = renderSpreadsheet();

    expect(spreadsheet.find('.selected')).toHaveLength(0);

    cellAt(spreadsheet, 1, 1).simulate('mouseDown');
    expect(spreadsheet.find('.selected')).toHaveLength(1);

    cellAt(spreadsheet, 2, 2).simulate('mouseEnter');
    expect(spreadsheet.find('.selected')).toHaveLength(4);

    cellAt(spreadsheet, 0, 1).simulate('mouseEnter');
    expect(spreadsheet.find('.selected')).toHaveLength(2);
  });
});
