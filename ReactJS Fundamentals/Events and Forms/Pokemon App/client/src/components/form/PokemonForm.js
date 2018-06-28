import React, { Component } from 'react';
import Input from './formFields/Input';
import validationFunc from './../../utils/pokemonValidator';

class PokemonForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: ''
        };

        this.baseState = this.state;
    }

    submitCreatePokemon = (e) => {
        e.preventDefault();
        e.target.reset();
        this.setState(this.baseState);

        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo
        };

        this.props.addPokemon(payload);

        this.create(payload);
    }

    create(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
            })
    }


    render() {
        let validObj = validationFunc(
            this.state.pokemonName,
            this.state.pokemonImg,
            this.state.pokemonInfo
        );

        return (
            <form onSubmit={this.submitCreatePokemon.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                        <h2>Create Pokemon</h2>
                        <Input
                            type='text'
                            data='name'
                            name='Pokemon Name'
                            func={e => {
                                this.setState({ pokemonName: e.target.value })
                            }}
                            valid={validObj.validName}
                        />

                        <Input
                            type='text'
                            data='image'
                            name='Pokemon Image'
                            func={e => {
                                this.setState({ pokemonImg: e.target.value })
                            }}
                            valid={validObj.validImage}
                        />

                        <Input
                            type='text'
                            data='info'
                            name='Pokemon Info'
                            func={e => {
                                this.setState({ pokemonInfo: e.target.value })
                            }}
                            valid={validObj.validInfo}
                        />

                        <input
                            style={({ 'display': (validObj.validName && validObj.validImage && validObj.validInfo) === true ? '' : 'none' })}
                            type='submit'
                            value='Create Pokemon'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default PokemonForm;
