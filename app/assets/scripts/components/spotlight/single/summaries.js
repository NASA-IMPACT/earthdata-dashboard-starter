import React from 'react';
import { Link } from 'react-router-dom';

const summaries = {
  boreal: (
    <>
      <p>
        MAAP User Working Group (UWG) members are developing a biomass product using covariates from Landsat 8, ICESat-2 Canopy Heights, and Copernicus DEM for the <a href='https://ec.europa.eu/environment/nature/natura2000/biogeog_regions/boreal/index_en.htm'>boreal region</a>. This region is 50 - 75 degrees North, encompasing parts of North America and Eurasia. The MAAP makes it possible for UWG members to collaborate virtually and scale their science using the MAAP Algorithm Development Environment (ADE) and Data Processing System (DPS).
      </p>
      <p>
        <em>Inputs:</em> Pictured are the inputs to the final biomass product as well as the final product itself. Landsat8 Covariates are a UWG-generated product. ICESat-2 ATL08 is included as a dependent variable in the model and is shown here with color categories based on canopy height.
      </p>
      <p>The MAAP will enable international scientific collaboration on biomass mapping. Later this year, MAAP scientists will use the platform to share and request other groups’ biomass products to enable harmonization of those different products.
      </p>
      <p>
        <b>ATL08 information</b>
        Canopy height measurements taken with ICESat2 sensor are used determine tree heights across the region of interest.
      </p>
      <p>
        <b>Landsat Covariates</b>
        14 Different variables are being calculated based on Landsat 8 surface reflectance values. The composite shown here is made with data from spring and summer data between 2015-2020.
        The map layer here, shows the maximum Normalized Difference Vegatation Index (NVDI), a measure of plant health, over the time period.
      </p>
      <p>
        <b>Elevation covariates derived from Copernicus 30m DEM</b>
        The map layer shows the slope of the topography, a component that influences the growth of vegetation.
      </p>

    </>
  ),
  taiga: (
    <>
      <p>
        <b>Forest structure pattern in the taiga-tundra ecotone</b>
      </p>
      <p>The forest structure pattern classification is made up of 11 pixel-level classes formed from the combination of the magnitude and gradient of tree canopy cover. This indicates the pattern of forest structure for each pixel in the bioclimatic envelope. The magnitude levels (<em>Intermediate, Open, and Sparse</em>) indicate the percentage of the canopy portion/extent. <em>Sparse</em> is 1-5% tree cover, <em>Open</em> is 6-30% tree cover, and <em>Intermediate &amp; Closed</em> corresponds to greater than 30% tree cover. The abruptness levels (<em>Closed, Abrupt, Diffuse-rapid, Diffuse-gradual</em>) indicate the gradient of the tree canopy extent. Read more about these classifications <a href='https://doi.org/10.1088/1748-9326/abb2c7'>https://doi.org/10.1088/1748-9326/abb2c7</a></p>

      <p>We defined the taiga-tundra ecotone - the ecological transition zone between the boreal (taiga) and tundra - using ecological regions, modelled climate data, and tree canopy cover composites from Landsat for the year 2010.</p> 
      <p>Tree cover, and its spatial gradient, was used to classify forest structure patterns in this ecotone.</p>
      <p>The maps show the gradual (diffuse) and then rapid (abrupt) changes in forest structure as landscapes transition from boreal forest to tundra.</p>
      <p>These patterns of forest structure, as captured from space across the entire transition zone, provide clues as to other landscape patterns and processes in the high northern latitudes.
      </p>
    </>

  )
};

export default summaries;
