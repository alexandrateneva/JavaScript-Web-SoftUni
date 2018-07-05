import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Post from '../partials/Post';
import reqHandler from '../../utils/reqHandler';
import dataCollector from '../../utils/dataCollector';
import observer from '../../utils/observer';

class AddPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            imageUrl: '',
            description: '',
            author: ''
        };
    }

    dataCollector = (e) => {
        this.setState(dataCollector(e));
    }

    componentWillMount() {
        reqHandler.getPostDetails(this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.title,
                    url: res.url,
                    imageUrl: res.imageUrl,
                    description: res.description,
                    author: res.author
                });
            });
    }

    editPost = (e) => {
        e.preventDefault();
        if (this.state.url === '' || this.state.title === '') {
            observer.trigger(observer.events.notification, {
                type: 'error',
                message: 'Link URL and Link Title are not optional.'
            });
            return;
        }
        reqHandler.editPost(this.props.match.params.id, this.state).then(res => {
            this.props.history.push('/catalog');
            observer.trigger(observer.events.notification, {
                type: 'success',
                message: 'Post successfully edited!'
            });
        });
    }

    render() {
        return (<section id="viewSubmit">
            <div className="submitArea">
                <h1>Submit Link</h1>
                <p>Please, fill out the form. A thumbnail image is not required.</p>
            </div>
            <div className="submitArea formContainer">
                <form id="submitForm" className="submitForm" onSubmit={this.editPost.bind(this)}>
                    <label>Link URL:</label>
                    <input name="url" value={this.state.url} type="text" onChange={this.dataCollector.bind(this)} />
                    <label>Link Title:</label>
                    <input name="title" value={this.state.title} type="text" onChange={this.dataCollector.bind(this)} />
                    <label>Link Thumbnail Image (optional):</label>
                    <input name="imageUrl" value={this.state.imageUrl} type="text" onChange={this.dataCollector.bind(this)} />
                    <label>Comment (optional):</label>
                    <textarea name="description" value={this.state.description} onChange={this.dataCollector.bind(this)}></textarea>
                    <input id="btnSubmitPost" value="Submit" type="submit" />
                </form>
            </div>
        </section>);
    }
}

export default AddPost;
