import React, {Component} from 'react';
import Item from "./Item";
import { ListGroup } from 'reactstrap';


import './List.css';

class List extends Component {
  render() {
    return (
      <ListGroup>
        {this.props.countries.map((country, index) =>
          <Item key={index}
                title={country.name}
                clicked={() => this.props.clicked(country.alpha3Code)}/>
        )}
      </ListGroup>
    );
  }
}

export default List;