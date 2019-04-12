import React from 'react';
import BlockCard from "./BlockCard";
import {expectToMatchSnapshot} from "../../../../testHelpers/snpashots";

const MockedContent = () => <p>mocked card content</p>;

const makeCardBlock = (card) => (
  <BlockCard {...card} expandable="false" title="Mocked Block">
    <MockedContent/>
  </BlockCard>
);

const expectCardBlockToMatchSnapshot = (card) => expectToMatchSnapshot(makeCardBlock(card));

it('renders a collapsed not-expandable BlockCard', () =>
  expectCardBlockToMatchSnapshot({
    type: 'mock',
    id: '1',
    expanded: false
  }));


it('renders a collapsed expandable BlockCard', () =>
  expectCardBlockToMatchSnapshot({
    type: 'mock',
    id: '1',
    expanded: false
  }));

it('renders a collapsed expandable BlockCard with not valid data', () =>
  expectCardBlockToMatchSnapshot({
    type: 'mock',
    id: '1',
    expanded: false,
    valid: false
  }));

it('renders a expanded BlockCard', () =>
  expectCardBlockToMatchSnapshot({
    type: 'mock',
    id: '1',
    expanded: true
  }));

