import React, {Component} from 'react';

export default class BlockComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      type: props.data.type,
      expanded: props.data.expanded || true
    }
  }

  handleTextChange = (e) => {
    const field = e.target;
    this.setState({[field.name]: field.value});
  };

  handleTextBlur = () => this.props.onChange(this.state);
}

