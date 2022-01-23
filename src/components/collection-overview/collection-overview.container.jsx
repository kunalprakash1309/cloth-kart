// conatiner pattern is used to pass props to their inner component. we can see that we are not rendering and anything here

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collection.overview.component";


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
})

// one way of doing
// const CollectionOvervieContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview))

const CollectionOvervieContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)


export default CollectionOvervieContainer