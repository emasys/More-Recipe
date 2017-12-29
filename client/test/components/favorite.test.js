import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from '../../src/components/Favorites';

window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiYWRtaW4iLCJsYXN0TmFtZSI6Im9mdGhpc3BhZ2UiLCJiaW8iOiJBZG1pbiBvZiB0aGlzIHBhZ2UiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImNvdW50cnkiOiJOaWdlcmlhIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZW1hc3lzL2ltYWdlL3VwbG9hZC92MTUxMzAxNDgzMi9qaXNnbWNrNDBkN2o0bGRvNWRsZy5qcGciLCJtb25pa2VyIjoiYWRtaW4iLCJpYXQiOjE1MTMwMTQ5NDMsImV4cCI6MTU0NDU1MDk0M30.Ed0jTMUxFTiz3JQ04x4CsDrA7vWCL7ec6n20FsjldpM');

test('should render favorite component correctly with props', () => {
  const wrapper = shallow(<Favorites/>);
  expect(wrapper).toMatchSnapshot();
});

