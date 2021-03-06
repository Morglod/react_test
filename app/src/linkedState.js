/*

Example:

constructor() {
    super();
    this.state = {
        name: ''
    };
}

render() {
    return (
        <input placeholder="Имя" valueLink={LinkedState(this, 'name')} />
    );
}

When 'Имя' field will be changed, state.name will be automatically updated. 

*/

export default function LinkedState(self, name) {
    return {
        value: self.state[name],
        requestChange: (function (newValue) {
            let newState = {...(this.state)};
            newState[name] = newValue;
            this.setState(newState);
        }).bind(self)
    };
}
