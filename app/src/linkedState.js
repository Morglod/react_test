
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
