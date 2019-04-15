import React from 'react';
import {mount} from "enzyme";

import {ImportItemsError, ItemsImporter} from "./ItemsImporter";
import ItemsService from "../../../Services/ItemsService";
import mockedItems from "../../../mock-data/items";
import mockedProjects from "../../../mock-data/projects";
import {simulateValueOnInput} from "../../../testHelpers/inputs";
import {expectComponent} from "../../../testHelpers/components";

const project = mockedProjects[0];
const url = "https://raw.githubusercontent.io/...";

function mockImportItems() {
  const importItems = jest.fn(() => new Promise(resolve => resolve(mockedItems)));
  ItemsService.importFromCsvUrl = importItems;
  return importItems;
}


function mockImportItemsToBeSlow() {
  const importItems = jest.fn(() => new Promise(resolve => {}));
  ItemsService.importFromCsvUrl = importItems;
  return importItems;
}


function mockImportItemsToFail() {
  const importItems = jest.fn(() => new Promise(() => {
    throw new Error("can't import items");
  }));
  ItemsService.importFromCsvUrl = importItems;
  return importItems;
}


const mountItemsImporter = () => mount(
  <ItemsImporter project={project}/>
);

const startImport = async (wrapper) => {
  simulateValueOnInput(wrapper, 'csvUrl', url);
  wrapper.find('button').simulate('click');
  await wrapper.update();
  await wrapper.update();
};

test('should convert the items', async () => {
  const importItems = mockImportItems();
  const wrapper = mountItemsImporter();

  await startImport(wrapper);

  expect(importItems).toHaveBeenCalledWith(project, url);
});


test("should show an error if items can't be converted", async () => {
  mockImportItemsToFail();
  const wrapper = mountItemsImporter();

  await startImport(wrapper);

  expectComponent(wrapper, ImportItemsError);
});


test("should show a loading message while converting the items", async () => {
  mockImportItemsToBeSlow();
  const wrapper = mountItemsImporter();

  await startImport(wrapper);

  expect(wrapper.state('importing')).toBe(true);
});


test("should show the number of converted items", async () => {
  mockImportItems();
  const wrapper = mountItemsImporter();

  await startImport(wrapper);

  expect(wrapper.state('importedItemsCount')).toBe(mockedItems.length);
});

