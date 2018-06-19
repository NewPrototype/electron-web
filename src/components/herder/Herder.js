import React from 'react';
import './Herder.styl';

class Herder extends React.Component {

constructor(props) {
	super(props);
	this.state = {
	};
}

render() {
  return (
		<div className="herder">
			component herder
		</div>
	);
}
	
componentWillMount() {}
componentDidMount() {}
componentWillReceiveProps(nextProps) {}
shouldComponentUpdate(nextProps, nextState) { return true; }
componentWillUpdate(nextProps, nextState) {}
componentDidUpdate(prevProps, prevState) {}
componentWillUnmount() {}
}

export default Herder;
