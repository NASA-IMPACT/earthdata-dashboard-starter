import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

import { themeVal } from '../../../styles/utils/general';
import { visuallyHidden } from '../../../styles/helpers';
import LineChart from '../../common/line-chart/chart';
import BarChart from '../../common/bar-chart/chart';
import Panel, { PanelHeadline, PanelTitle } from '../../common/panel';
import ShadowScrollbar from '../../common/shadow-scrollbar';
import {
  PanelBlock,
  PanelBlockHeader,
  PanelBlockTitle
} from '../../common/panel-block';
import { Accordion, AccordionFold } from '../../common/accordion';
import Heading, { headingAlt } from '../../../styles/type/heading';
import Prose from '../../../styles/type/prose';
import SummaryExpandable from '../../common/summary-expandable';

import { glsp } from '../../../styles/utils/theme-values';
import { utcDate } from '../../../utils/utils';
import collecticon from '../../../styles/collecticons';
import media, { isLargeViewport } from '../../../styles/utils/media-queries';
import { getBandColor } from '../../common/common-chart-utils/data-highlight-bands.layer';

const PanelSelf = styled(Panel)`
  ${media.largeUp`
    width: 30rem;
  `}
`;

const BodyScroll = styled(ShadowScrollbar)`
  flex: 1;
  z-index: 1;
`;

export const AccordionFoldTrigger = styled.a`
  display: flex;
  align-items: center;
  margin: -${glsp(0.5)} -${glsp()};
  padding: ${glsp(0.5)} ${glsp()};

  &,
  &:visited {
    color: inherit;
  }

  &:after {
    ${collecticon('chevron-down--small')}
    margin-left: auto;
    transition: transform 240ms ease-in-out;
    transform: ${({ isExpanded }) =>
      isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const PanelBodyInner = styled.div`
  padding: ${glsp()};

  > *:not(:last-child) {
    margin-bottom: ${glsp(1.5)};
  }

  figure {
    margin-top: -1rem;
  }

  figcaption {
    display: grid;
    grid-gap: ${glsp(0.5)};
  }
`;

const CaptionTitle = styled.h6`
  ${visuallyHidden()}
`;

const CaptionAttribution = styled.address`
  font-size: 0.874rem;
  text-align: center;
  font-style: italic;
  padding-right: ${glsp(2)};
  margin-bottom: ${glsp()};
`;

const CaptionLegend = styled.dl`
  display: grid;
  grid-gap: ${glsp(1 / 2)};
  grid-template-columns: min-content min-content;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  justify-content: center;

  dt {
    display: flex;

    span {
      display: block;
      width: 1rem;
      height: 0.5rem;
      font-size: 0;
      border-radius: ${themeVal('shape.rounded')};
      box-shadow: inset 0 0 0 1px ${themeVal('color.baseAlphaB')};
      margin-top: 0.25rem;
    }
  }

  dd {
    ${headingAlt()}
    font-size: 0.75rem;
    line-height: 1rem;
  }
`;

class SecPanel extends React.Component {
  renderChart (ind) {
    const xDomain = ind.domain.date.map(utcDate);
    const yDomain = ind.domain.indicator;
    const { selectedDate } = this.props;

    return (
      <figure>
        {ind.id === 'ship-detections' ? (
          <BarChart
            yDomain={yDomain}
            data={ind.data}
            yUnit={ind.units}
            selectedDate={selectedDate}
            highlightBands={
              ind.highlight_bands && ind.highlight_bands.length
                ? ind.highlight_bands
                : null
            }
          />
        ) : (
          <LineChart
            xDomain={xDomain}
            yDomain={yDomain}
            data={ind.data}
            yUnit={ind.units}
            selectedDate={selectedDate}
            highlightBands={
              ind.highlight_bands && ind.highlight_bands.length
                ? ind.highlight_bands
                : null
            }
            noBaseline={ind.data[0].baseline === undefined}
            noBaselineConfidence
            noIndicatorConfidence
          />
        )}
        <figcaption>
          <CaptionTitle>Legend</CaptionTitle>
          <CaptionLegend>
            {ind.data[0].indicator !== undefined && (
              <>
                <dt>
                  <span style={{ backgroundColor: '#2276AC' }}>#2276AC</span>
                </dt>
                <dd>Indicator</dd>
              </>
            )}
            {ind.data[0].baseline !== undefined && (
              <>
                <dt>
                  <span style={{ backgroundColor: '#2C3E5080' }}>#2C3E5080</span>
                </dt>
                <dd>Baseline</dd>
              </>
            )}
            {ind.highlight_bands && ind.highlight_bands.map((band, i) => (
              <React.Fragment key={band.label}>
                <dt>
                  <span style={{ backgroundColor: getBandColor(i) }}>{getBandColor(i)}</span>
                </dt>
                <dd>{band.label}</dd>
              </React.Fragment>
            ))}
          </CaptionLegend>
          {ind.attribution && (
            <>
              <CaptionTitle>Attribution</CaptionTitle>
              <CaptionAttribution>By {ind.attribution}</CaptionAttribution>
            </>
          )}
        </figcaption>
      </figure>
    );
  }

  render () {
    const {
      onPanelChange,
      summary
    } = this.props;

    // Ensure that we only deal with groups that have data.
    const groups = [];

    return (
      <PanelSelf
        collapsible
        direction='right'
        onPanelChange={onPanelChange}
        initialState={isLargeViewport()}
        headerContent={
          <PanelHeadline>
            <PanelTitle>Insights</PanelTitle>
          </PanelHeadline>
        }
        bodyContent={
          <BodyScroll>
            {summary && <SummaryExpandable initialExpanded={!groups.length}>{summary}</SummaryExpandable>}

            <Accordion allowMultiple initialState={[true]}>
              {({ checkExpanded, setExpanded }) =>
                !!groups.length &&
                groups.map((group, idx) => (
                  <AccordionFold
                    forwardedAs={PanelBlock}
                    key={group.id}
                    isFoldExpanded={checkExpanded(idx)}
                    setFoldExpanded={(v) => setExpanded(idx, v)}
                    renderHeader={({ isFoldExpanded, setFoldExpanded }) => (
                      <PanelBlockHeader>
                        <AccordionFoldTrigger
                          isExpanded={isFoldExpanded}
                          onClick={() => setFoldExpanded(!isFoldExpanded)}
                        >
                          <PanelBlockTitle>{group.label}</PanelBlockTitle>
                        </AccordionFoldTrigger>
                      </PanelBlockHeader>
                    )}
                    renderBody={() => (
                      <PanelBodyInner>
                        {group.prose && (
                          <Prose size='small'>
                            <p>{group.prose}</p>
                          </Prose>
                        )}
                      </PanelBodyInner>
                    )}
                  />
                ))}
            </Accordion>
          </BodyScroll>
        }
      />
    );
  }
}

SecPanel.propTypes = {
  onPanelChange: T.func,
  summary: T.node,
  selectedDate: T.object
};

export default SecPanel;
