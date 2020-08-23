import React, { Component } from "react";
import Country from "./Country";

import css from "./country.module.css";

export default class Coutries extends Component {
  render() {
    const { countries } = this.props;

    return (
      <div className={css.coutries}>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />;
        })}
      </div>
    );
  }
}
