import {closeAndAfterAnimation} from "./modal";

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('test the function to close modal and call callback', () => {

  it('should close and not throw an error if no callback is specified', () => {
    const component = {
      setState: jest.fn()
    };
    const listener = closeAndAfterAnimation(component);

    listener();

    expect(component.setState).toHaveBeenCalledWith({show: false});
  });

  it('should close and call the specified callback after 100 ms', async () => {
    const component = {
      setState: jest.fn()
    };
    const callback = jest.fn();
    const listener = closeAndAfterAnimation(component, callback);

    listener();

    expect(component.setState).toHaveBeenCalledWith({show: false});

    await wait(110);

    expect(callback).toHaveBeenCalled();
  });

});


