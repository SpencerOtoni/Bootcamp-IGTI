import React, { Component } from "react";
import Countries from "./Components/Countries/Coutries";
import Header from "./Components/Header/Header";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filterdCountries: [],
      filter: "",
      totalpopulation: 0,
    };
  }

  async componentDidMount() {
    const data = await fetch("https://restcountries.eu/rest/v2/all");
    const result = await data.json();

    const allCountries = result.map(
      ({ name, numericCode, flag, population }) => {
        return {
          id: numericCode,
          name,
          filterName: name.toLowerCase(),
          flag,
          population,
        };
      }
    );

    const filterPopulation = this.calculateTotalPopulationFrom(allCountries);

    this.setState({
      allCountries,
      filterdCountries: allCountries,
      totalpopulation: filterPopulation,
    });
  }

  calculateTotalPopulationFrom = (contry) => {
    const totalPopulation = contry.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);

    return totalPopulation;
  };

  handleInput = (value) => {
    this.setState({
      filter: value,
    });
    const { allCountries } = this.state;

    const filterLowerCase = value.toLowerCase();

    const filterdCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filterPopulation = this.calculateTotalPopulationFrom(
      filterdCountries
    );

    this.setState({
      filterdCountries,
      totalpopulation: filterPopulation,
    });
  };

  render() {
    const { filterdCountries, filter, totalpopulation } = this.state;
    return (
      <div className="container">
        <h1 style={style.styleTtile}>React Coutries</h1>
        <Header
          filter={filter}
          totalcountries={filterdCountries.length}
          totalpopulation={totalpopulation}
          onChangeFilter={this.handleInput}
        />
        <Countries countries={filterdCountries} />
      </div>
    );
  }
}

const style = {
  styleTtile : {
    textAlign : 'center'
  }
}