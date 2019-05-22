import React from "react";
import {mount} from "enzyme";

import ResultDownloader, {DropdownDownload, LatestDownloadButton, NoResultsMessage} from "./ResultDownloader";
import {expectComponent} from "../../../../../../testHelpers/components";


describe('no results', () => {
  it('should display a message if block never finished', () => {
    // given
    const runnable = {
      getFinishedRuns: () => []
    };

    // when
    const wrapper = mount(<ResultDownloader runnable={runnable}/>);

    // then
    expectComponent(wrapper, NoResultsMessage);
  });
});

const downloadLinkFactory = (run) => `http://localhost/${run.getRunId()}`;

describe('test the latest results button', ()=>{
  it('should display the button to download the latest result', () => {
    // given
    const runnable = {
      isRunning: () => false,
      getFinishedRuns: () => [{getRunId: () => 1}]
    };

    // when
    const wrapper = mount(<ResultDownloader downloadLinkFactory={downloadLinkFactory}
                                            runnable={runnable}/>);

    // then
    expectComponent(wrapper, LatestDownloadButton);

    const button = wrapper.find(LatestDownloadButton);
    expect(button.prop('id')).toBe(1);
    expect(button.prop('isLatest')).toBe(true);
    expect(button.prop('link')).toBe('http://localhost/1');

    expect(button.html()).toContain("Download latest result");
  });


  it('should display the button to download the latest available result', () => {
    // given
    const runnable = {
      isRunning: () => true,
      getFinishedRuns: () => [{getRunId: () => 1}]
    };

    // when
    const wrapper = mount(<ResultDownloader downloadLinkFactory={downloadLinkFactory}
                                            runnable={runnable}/>);

    // then
    expectComponent(wrapper, LatestDownloadButton);

    const button = wrapper.find(LatestDownloadButton);
    expect(button.prop('id')).toBe(1);
    expect(button.prop('isLatest')).toBe(false);
    expect(button.prop('link')).toBe('http://localhost/1');

    expect(button.html()).toContain("Download #1");
  });
});

describe('test the dropdown', () => {
  it("should display the link with the 'latest' suffix", () => {
    // given
    const runnable = {
      isRunning: () => false,
      getFinishedRuns: () => [{getRunId: () => 1}]
    };
    const wrapper = mount(<ResultDownloader downloadLinkFactory={downloadLinkFactory}
                                            runnable={runnable}/>);

    // when
    wrapper.find('button.dropdown-toggle').simulate('click');

    // then
    expectComponent(wrapper, DropdownDownload);
  });


  it("should display the link without the 'latest' suffix", () => {
    // given
    const runnable = {
      isRunning: () => true,
      getFinishedRuns: () => [{getRunId: () => 1}]
    };
    const wrapper = mount(<ResultDownloader downloadLinkFactory={downloadLinkFactory}
                                            runnable={runnable}/>);

    // when
    wrapper.find('button.dropdown-toggle').simulate('click');

    // then
    expectComponent(wrapper, DropdownDownload);
  });
});
