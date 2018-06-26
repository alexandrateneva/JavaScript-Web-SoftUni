import React from 'react';

import Roster from './Roster';
import Details from './Details';
import fetcher from '../../fetcher';

const rosterEndpoint = '/roster';
const detailsEndpoint = '/character/';

export default class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            details: {
                name: null,
                id: null,
                url: null,
                bio: null
            }
        }
    }

    fetchRoster = () =>
        fetcher.get(rosterEndpoint, data =>
            this.setState({ images: data.map(i => ({ id: i.id, url: i.url })) }));

    fetchDetails = id =>
        fetcher.get(detailsEndpoint + id, data =>
            this.setState({ details: data }));

    selectCharacter = id => this.fetchDetails(id); 
        
    componentDidMount = () => this.fetchRoster();

    render = () => (
        <div>
            <Roster images={this.state.images} select={this.selectCharacter}/>
            <Details {...this.state.details} />
        </div>
    )
}