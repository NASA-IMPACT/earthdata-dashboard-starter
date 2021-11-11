// Store the layer data.
const layersDataBySpotlight = [];

export function getSpotlightLayers (spotlightId) {
  return layersDataBySpotlight[spotlightId];
}

export function getGlobalLayers () {
  return layersDataBySpotlight;
}

export const storeSpotlightLayers = (spotlightId, layers) => {
  layersDataBySpotlight.push(layers);
};
