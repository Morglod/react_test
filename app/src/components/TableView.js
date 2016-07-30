import React, {PropTypes} from 'react';

import TableEntry from './TableEntry';

export default class TableView extends React.Component {
    constructor() {
        super();
    }

    render() {
        let entriesDOM =
            this.props.profiles
            .map(entry => <TableEntry profile={entry} />);

        return (
            <div className="tbl">
                {entriesDOM}
            </div>
        );
    }
}

TableView.propTypes = {
    profiles: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        name: PropTypes.string,
        surname: PropTypes.string,
        job: PropTypes.string,
        about: PropTypes.string
    })).isRequired
};
