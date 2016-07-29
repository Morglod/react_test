import React from 'react';
import {Link} from 'react-router';

export default class TableEntry extends React.Component {
    goEdit() {
        this.context.router.push("/entry/" + this.props.data.id);
    }

    render() {
        const {id, name, surname, job, about} = this.props.data;
        return (
            <div className="tbl-row entry-row" onClick={this.goEdit.bind(this)}>
                <span className="tbl-cell">{name}</span>
                <span className="tbl-cell">{surname}</span>
                <span className="tbl-cell">{job}</span>
            </div>
        );
    }
}

TableEntry.contextTypes = {
    router: React.PropTypes.object.isRequired
};
