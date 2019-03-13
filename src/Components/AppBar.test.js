import React from 'react';
import AppBar from './AppBar';
import shallow from "enzyme/shallow";


it("it should call 'props.onToggleSidebar' when the hamburger menu is clicked", () => {
  const listener = jest.fn();

  const wrapper = shallow(<AppBar onToggleSidebar={listener}/>);

  wrapper.find('a.navbar-toggle').simulate('click');
  expect(listener.mock.calls.length).toBe(1);
});