import React, { Component } from 'react';
import { getRecipes } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//component
import CatalogItem from '../components/catalog';

class Catalog extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    return (
      <div>
        <CatalogItem catalog={this.props.recipes.allRecipes} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { recipes: state.recipes };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipes
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
