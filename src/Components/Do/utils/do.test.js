import {rewardFloatToInteger, rewardIntegerToString} from "./do";

describe('test functions to convert rewards from user representation to data', () => {

  it('should convert 1 to "0.01',
    () => expect(rewardIntegerToString(1)).toBe('0.01')
  );

  it('should convert 0.01 to 1',
    () => expect(rewardFloatToInteger(0.01)).toBe(1)
  );

});
