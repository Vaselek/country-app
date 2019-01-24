import React, {Component} from 'react';
import { ListGroupItem } from 'reactstrap';


class Item extends Component {
  render() {
    return (
      <ListGroupItem tag="a"
                     href="#"
                     onClick={this.props.clicked}>
        {this.props.title}
      </ListGroupItem>
    );
  }
}

export default Item;