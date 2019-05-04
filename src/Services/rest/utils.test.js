import {isResponseOk, makeCancellable} from "./utils";

describe("test 'isResponseOk' utility function", () => {
  it('classify 200 as a OK response', () =>
    expect(isResponseOk({status: 200})).toBe(true));

  it('classify 201 as a OK response', () =>
    expect(isResponseOk({status: 201})).toBe(true));

  it('classify 500 not as a OK response', () =>
    expect(isResponseOk({status: 500})).toBe(false));

  it('classify 400 not as a OK response', () =>
    expect(isResponseOk({status: 400})).toBe(false));
});

describe("test 'makeCancellable'", () => {
  it("should resolve if 'cancel' is not called", () => {
    const promise = new Promise(resolve => resolve());
    const cancellable = makeCancellable(promise);
    return cancellable.result;
  });

  it("should reject if 'cancel' is not called and promise is rejected", () => {
    const promise = new Promise((resolve, reject) => reject('rejected'));
    const cancellable = makeCancellable(promise);

    expect(cancellable.result).rejects.toMatch('rejected');
  });

});
