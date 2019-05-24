import React from "react";
import {mount} from "enzyme";
import MemoryRouter from "react-router-dom/MemoryRouter";
import Layout from "./Layout";
import {Projects} from "./Projects/Projects";
import AuthService from "../Services/AuthService";

it("should redirect to '/project' if no other route is found", () => {
  // TODO: Mock auth library

  const wrapper = mount(
    <MemoryRouter initialEntries={["/unknown"]}>
      <Layout/>
    </MemoryRouter>
  );

  expect(wrapper.find(Projects).length).toBe(1);

});

// TODO Test loading of auth library
