import { Image } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import FilledTextField from '.';

const props = {
  label: 'test',
};

/* eslint-env jest */

it('renders', () => {
  let field = renderer.create(<FilledTextField {...props} />).toJSON();

  expect(field).toMatchSnapshot();
});

it('renders value', () => {
  let field = renderer
    .create(<FilledTextField {...props} value="text" />)
    .toJSON();

  expect(field).toMatchSnapshot();
});

it('renders disabled value', () => {
  let field = renderer
    .create(<FilledTextField {...props} value="text" disabled />)
    .toJSON();

  expect(field).toMatchSnapshot();
});

it('renders title', () => {
  let field = renderer
    .create(<FilledTextField {...props} title="field" />)
    .toJSON();

  expect(field).toMatchSnapshot();
});

it('renders counter', () => {
  let field = renderer
    .create(
      <FilledTextField {...props} value="text" characterRestriction={10} />
    )
    .toJSON();

  expect(field).toMatchSnapshot();
});

it('renders accessory', () => {
  let render = () => <Image />;

  let field = renderer
    .create(<FilledTextField {...props} renderLeftAccessory={render} />)
    .toJSON();

  expect(field).toMatchSnapshot();
});
