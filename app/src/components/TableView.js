import React from 'react';

import TableEntry from './TableEntry';

export default class TableView extends React.Component {
    constructor() {
        super();
    }

    render() {
        let entriesDOM =
            this.props.profiles
            .map(entry => <TableEntry data={entry} />);

        return (
            <div className="tbl">
                {entriesDOM}
            </div>
        );
    }
}
