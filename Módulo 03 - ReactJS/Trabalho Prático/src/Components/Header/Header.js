import React, { Component } from "react";
import { formatNumber } from "../../Libs/formatHelpers";
import css from "./header.module.css";

export default class Header extends Component {
  handleInput = (event) => {
    const { value } = event.target;

    this.props.onChangeFilter(value);
  };

  render() {
    const { filter, totalcountries, totalpopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          type="text"
          placeholder="Filtro"
          value={filter}
          onChange={this.handleInput}
        />
        <span className={css.countries}>
          | Total de paíse: <strong>{totalcountries}</strong>
        </span>
        <span className={css.population}>
          | Total da população: <strong>{formatNumber(totalpopulation)}</strong>
        </span>
      </div>
    );
  }
}
