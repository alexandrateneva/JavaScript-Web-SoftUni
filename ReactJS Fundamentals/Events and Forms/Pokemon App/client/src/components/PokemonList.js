import React, { Component } from 'react';
import PokemonField from './form/formFields/PokemonField';

class PokemonList extends Component {
  render () {
    let pokemonsColection = this.props.pokemonsColection || [];

    return (
      <div style={({ display: 'inline-block' })}>
        {pokemonsColection.map((p, i) => {
          return <PokemonField key={i} data={p} />;
        })}
      </div>
    );
  }
}

export default PokemonList;
