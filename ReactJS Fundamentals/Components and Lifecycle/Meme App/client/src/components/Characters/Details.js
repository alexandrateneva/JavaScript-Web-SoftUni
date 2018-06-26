import React from 'react';

export default class Details extends React.Component {
    render() {
        const hasChoosen = this.props.name;

        if (!hasChoosen) {
            return (
                <section id="bio">
                    <i>Select a character from the section above for show more detailed information </i>
                </section>
            )
        }

        return (
            <section id="bio">
                <div className="image">
                    <img src={this.props.url} />
                </div>
                <div className="info">
                    <p>Name: <strong>{this.props.name}</strong></p>
                    <p>Bio:</p>
                    <p>{this.props.bio}</p>
                </div>
            </section>
        )
    }
}