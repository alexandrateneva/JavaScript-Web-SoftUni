import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import requester from '../../utils/requester';
import AddCategory from './AddCategory';

class Categories extends Component {
  constructor () {
    super();

    this.state = {
      categories: []
    };
  }

  componentDidMount () {
    requester.listCategories().then(res => {
      this.setState({ categories: res });
    });
  }

  addCategory = (category) => {
    this.setState(prevState => {
        let categories = prevState.categories
        categories.splice(0,0,category);

        return { categories }
    })
}

  render () {
    return (<div>
      <AddCategory addCategory={this.addCategory.bind(this)} />
      <h2>Categories</h2>
      <div className='categories'>
        {this.state.categories.map((c, i) =>
          <div style={{display: 'block'}}>
            <h5 style={{display: 'inline-block'}}>{c.name}</h5>
            <Link to={`/deleteCategory/${c._id}`}> <Icon small id='delete'>delete</Icon></Link>
            <Link to={`/editCategory/${c._id}`}> <Icon small id='build'>build</Icon></Link>
          </div>)
        }
      </div>
    </div>);
  }
}

export default Categories;
