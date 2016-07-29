import React from 'react';

export default class Base extends React.Component {
    constructor() {
        super();
    }

    render() {
        // Pass 'store' ref to all children
        const childrenWithStore = React.Children.map(this.props.children,
             (child) => React.cloneElement(child, {
                 store: this.props.route.store
             })
        );

        return (
            <div>
                <h2>Список сотрудников</h2>
                {childrenWithStore}
            </div>
        );
    }
}
