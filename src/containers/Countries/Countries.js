import React, {Component} from 'react';
import CountryCard from "../../components/Country/CountryCard";
import List from "../../components/Country/List";
import axios from 'axios';

class Countries extends Component {

  state = {
    countries: [],
    selectedCountryCode: null
  }

  componentDidMount() {
    const listUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha3Code';
    axios.get(listUrl).then(response => {
      return response.data
    }).then(countries => {
      this.setState({countries});
    }).catch(error => {
      console.log(error);
    });
  }

  changeCountryCode = (code) => {
    const selectedCountryCode = code;
    this.setState({selectedCountryCode});
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <List countries={this.state.countries}
                  clicked={this.changeCountryCode}/>
          </div>
          <div className="col-8">
            <CountryCard code={this.state.selectedCountryCode}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Countries;