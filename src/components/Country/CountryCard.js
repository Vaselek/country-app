import React, {Component} from 'react';
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

import './CountryCard.css';



class CountryCard extends Component {

  state = {
    loadedCountry: null,
    borderCountries: []
  };

  _makeRequest(url) {
    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong with network request');
    });
  }

  componentDidUpdate() {
    const codeUrl = `https://restcountries.eu/rest/v2/alpha`;
    if (this.props.code) {
      if (!this.state.loadedCountry || (this.state.loadedCountry && this.state.loadedCountry.alpha3Code !== this.props.code)) {
        this._makeRequest(`${codeUrl}/${this.props.code}`)
          .then(country => {
            this.setState({loadedCountry: country});
            Promise.all(country.borders.map(border => {
              return this._makeRequest(`${codeUrl}/${border}`)
                .then(borderCountry => {
                  return borderCountry.name;
                })
            })).then((countries) => this.setState({borderCountries: countries}))
        })
      }
    }
  }

  render() {
    if (this.state.loadedCountry) {
      return (
        <div>
          <Card>
            <CardTitle><h3 className="CountryTitle">{this.state.loadedCountry.name}</h3></CardTitle>
            <CardImg top width="100%" src={this.state.loadedCountry.flag} alt="Card image cap" />
            <CardBody>
              <CardSubtitle><b>Capital: </b>{this.state.loadedCountry.capital}</CardSubtitle>
              <CardSubtitle><b>Population: </b>{this.state.loadedCountry.population}</CardSubtitle>
              {this.state.borderCountries.length > 0 && (
                <div>
                  <b>Borders with: </b>
                  <ul>{this.state.borderCountries.map((country, index) => (
                        <li key={index}>{country}</li>
                      ))}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      );
    }
    return (
      <div>Select a country</div>
    );
  }
}

export default CountryCard;