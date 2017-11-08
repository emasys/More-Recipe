import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions';
import { bindActionCreators } from 'redux';

// component
import Catalog from '../components/catalog';

class Home extends Component {
  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <div>
        <Catalog catalog={this.props.recipes.recipe} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: state.recipe };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      fetchRecipes
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
