import React from 'react';
import Sidebar from './Sidebar';
import shallow from "enzyme/shallow";

describe('it renders the sidebar according to the props', () => {
  it("doesn't add the 'open' class when the sidebarOpen is true", () => {
    const sidebar = shallow(<Sidebar sidebarOpen={false}/>);

    expect(sidebar.hasClass('open')).toEqual(false);
  });

  it("adds the 'open' class when the sidebarOpen is true", () => {
    const sidebar = shallow(<Sidebar sidebarOpen={true}/>);

    expect(sidebar.hasClass('open')).toEqual(true);
  });
});
