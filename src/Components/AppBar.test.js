import React from 'react';
import AppBar from './Appbar/AppBar';
import shallow from "enzyme/shallow";


it("it should call 'props.onToggleSidebar' when the hamburger menu is clicked", () => {
  const listener = jest.fn();

  const wrapper = shallow(<AppBar onToggleSidebar={listener}/>);

  wrapper.find('button.navbar-toggle').simulate('click');
  expect(listener).toHaveBeenCalled();
});
