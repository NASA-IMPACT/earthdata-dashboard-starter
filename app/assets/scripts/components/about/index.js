import React from 'react';
import styled from 'styled-components';

import App from '../common/app';
import {
  Inpage,
  InpageHeader,
  InpageHeaderInner,
  InpageHeadline,
  InpageTitle,
  InpageBody
} from '../../styles/inpage';
import Constrainer from '../../styles/constrainer';
import Prose from '../../styles/type/prose';

import { glsp } from '../../styles/utils/theme-values';

const PageConstrainer = styled(Constrainer)`
  ${Prose} {
    max-width: 50rem;
  }

  > *:not(:last-child) {
    margin-bottom: ${glsp(2)};
  }
`;

export default class About extends React.Component {
  render () {
    return (
      <App pageTitle='About'>
        <Inpage>
          <InpageHeader>
            <InpageHeaderInner>
              <InpageHeadline>
                <InpageTitle>About</InpageTitle>
              </InpageHeadline>
            </InpageHeaderInner>
          </InpageHeader>
          <InpageBody>
            <PageConstrainer>
              <Prose>
                <p>The ESA-NASA Joint Multi-Mission Algorithm and Analysis Platform (MAAP) is a collaborative project focused on improving the understanding of aboveground terrestrial carbon dynamics.</p>
                <p>The goal of this dashboard is to visualize the MAAP datasets and therefore enable exploration of the MAAP data.</p>
                <p>Learn more about the MAAP on the project site at <a href='https://scimaap.net/'>scimaap.net</a></p>
                <p>
                Learn more about NASA Earth Science at <a href='https://nasa.gov/earth'>nasa.gov/earth</a>.
                </p>
              </Prose>
            </PageConstrainer>
          </InpageBody>
        </Inpage>
      </App>
    );
  }
}
