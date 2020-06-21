// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import * as index from './index';

describe('index.js', () => {
  it('sum()', () => {
    expect(index.sum(1, 2)).toBe(3);
  });

  it('msg()', () => {
    expect(index.msg()).toBe('Hello, JavaScript!');
  });

  it('isValidPwdRegex()', () => {
    expect(index.isValidPwdRegex('qwe123!!')).toBe(true);
  });
});
