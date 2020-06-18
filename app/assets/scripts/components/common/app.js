import React, { Component } from 'react';
import T from 'prop-types';
import { withRouter } from 'react-router';
import styled from 'styled-components';

import MetaTags from './meta-tags';
import PageHeader from './page-header';
import PageFooter from './page-footer';
import { reveal } from '../../styles/animation';

import config from '../../config';
import SizeAwareElement from './size-aware-element';
import { mediaRanges } from '../../styles/theme/theme';

const { appTitle, appDescription } = config;

const Page = styled.div`
  display: grid;
  grid-template-rows: minmax(2rem, min-content) 1fr ${({ hideFooter }) => hideFooter ? 0 : 'auto'};
  min-height: 100vh;
  min-height: ${({ innerHeight }) => `${innerHeight}px`};
`;

const PageBody = styled.main`
  padding: 0;
  margin: 0;

  /* Animation */
  animation: ${reveal} 0.48s ease 0s 1;
`;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      useSmallPanel: false,
      useShortTitle: false,
      height: window.innerHeight
    };

    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  // Handle cases where the page is updated without changing
  componentDidUpdate (prevProps) {
    if (this.props.location && this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  resizeListener ({ width, height }) {
    this.setState({
      // Store the height to set the page min height. This is needed for mobile
      // devices to account for the address bar, since 100vh does not work.
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      height,
      useShortTitle: width < mediaRanges.small[0],
      useSmallPanel: width < mediaRanges.medium[0]
    });
  }

  render () {
    const { pageTitle, hideFooter, children } = this.props;
    const title = pageTitle ? `${pageTitle} — ` : '';

    return (
      <SizeAwareElement
        innerHeight={this.state.height}
        element={Page}
        onChange={this.resizeListener}
        hideFooter={hideFooter}
      >
        <MetaTags title={`${title}${appTitle}`} description={appDescription} />
        <PageHeader
          useShortTitle={this.state.useShortTitle}
          useSmallPanel={this.state.useSmallPanel}
        />
        <PageBody role='main'>{children}</PageBody>
        <PageFooter />
      </SizeAwareElement>
    );
  }
}

App.propTypes = {
  pageTitle: T.string,
  hideFooter: T.bool,
  children: T.node,
  location: T.object
};

export default withRouter(App);
