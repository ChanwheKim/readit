import { connect } from 'react-redux';
import MainCategory from '../components/MainCategory';
import * as actions from '../actions';

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  actions,
)(MainCategory);
