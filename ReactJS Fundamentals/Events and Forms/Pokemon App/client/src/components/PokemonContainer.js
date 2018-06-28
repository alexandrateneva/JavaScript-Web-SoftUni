import React, { Component } from 'react';
import PokemonForm from './form/PokemonForm';
import PokemonList from './PokemonList';

class PokemonContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonsColection: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ pokemonsColection: data.pokemonColection })
            })
    }

    addPokemon = (pokemon) => {
        this.setState(prevState => {
            let pokemonsColection = prevState.pokemonsColection
            pokemonsColection.push(pokemon)

            return { pokemonsColection }
        })
    }

    render() {
        return (
            <div>
                <PokemonForm addPokemon={this.addPokemon.bind(this)} />
                <PokemonList pokemonsColection={this.state.pokemonsColection} />
            </div>
        )
    }
}

export default PokemonContainer;
