import config from '../config';
import { makeActions, makeFetchThunk, makeAPIReducer } from './reduxeed';

// /////////////////////////////////////////////////////////////////////////////
// LAYER_DATA
// /////////////////////////////////////////////////////////////////////////////

const layerDataActions = makeActions('LAYER_DATA', true);

export function fetchSearchResults (query) {
  return makeFetchThunk({
    url: `${config.api}/search`,
    options: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/geo+json, application/json'
        },
        method: 'POST',
        body: JSON.stringify(query)
    },
    requestFn: layerDataActions.request,
    receiveFn: layerDataActions.receive
  });
}

export default makeAPIReducer('LAYER_DATA', true);
