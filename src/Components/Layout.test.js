import React from "react";
import {mount} from "enzyme";
import MemoryRouter from "react-router-dom/MemoryRouter";
import Layout from "./Layout";
import {Projects} from "./Projects/Projects";

it("should redirect to '/project' if no other route is found", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={["/unknown"]}>
      <Layout/>
    </MemoryRouter>
  );

  expect(wrapper.find(Projects).length).toBe(1);

});

