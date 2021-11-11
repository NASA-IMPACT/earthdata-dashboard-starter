import '@babel/polyfill';
import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';

import config from './config';
import { fetchJSON, wrapApiResult } from './redux/reduxeed';

import {
  hideGlobalLoading,
  showGlobalLoadingMessage
} from './components/common/global-loading';
import { storeSpotlightLayers } from './components/common/layers';

// Dev note:
// The datasets (or map layers) information was moved to the api, however some
// parts of the app access the data in a synchronous way, making it impossible
// to fetch datatsets on demand. The homepage itself requires several datasets
// to be loaded so the map can be animated.
// For the time being, layers will be front loaded as part of the application
// bootstrap process and only when all the data is present the app will start.
// This allows us to quickly get the datasets information from the api without
// significant refactor. This was decided taking into account that significant
// development is planned for the near future.

class LayerDataLoader extends React.Component {
  componentDidMount () {
    showGlobalLoadingMessage('Loading datasets');
  }

  componentDidUpdate (prevProps) {
    const { spotlightList } = this.props;
    if (spotlightList.isReady() && !prevProps.spotlightList.isReady()) {
      this.requestData(spotlightList.getData());
    }
  }

  async requestData (spotlightList) {
    const ids = spotlightList.map((s) => s.id);
    await Promise.all(
      ids.map(async (spotlightId) => {
        const { body } = await fetchJSON(
          `${config.api}/${spotlightId}`
        );
        body.type = 'raster';
        body.source = {};
        body.source.type = 'raster';
        body.source.tiles = [ "https://titiler.maap-project.org/mosaicjson/mosaics/8610ecf4-d017-419b-a89a-dfb3b4e508f1/tiles/{z}/{x}/{y}.png?resampling_method=nearest&return_mask=true&bidx=6&rescale=0.01%2C0.5&colormap_name=viridis" ]
        storeSpotlightLayers(spotlightId, body);
      })
    );

    hideGlobalLoading();
    this.props.onReady();
  }

  render () {
    return null;
  }
}

LayerDataLoader.propTypes = {
  spotlightList: T.object,
  onReady: T.func
};

function mapStateToProps (state, props) {
  return {
    spotlightList: wrapApiResult(state.spotlight.list)
  };
}

export default connect(mapStateToProps, {})(LayerDataLoader);
