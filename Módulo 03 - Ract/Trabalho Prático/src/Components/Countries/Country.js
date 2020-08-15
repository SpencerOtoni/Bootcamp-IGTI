import React, { Component } from "react";

import css from "./country.module.css";

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag } = country;
    return (
      <div className={css.coutry}>
        <img className={css.img} src={flag} alt="Bandeira" /> 
        <span>{name}</span>
      </div>
    );
  }
}
