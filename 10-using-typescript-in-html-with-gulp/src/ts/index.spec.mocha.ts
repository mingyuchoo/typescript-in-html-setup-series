// ES6 (ECMAScript2016, Native) Module 형태
// Babel이 ES5형태로 변환하여 ES6 형태의 테스트 대상 모듈 인식이 가능

import { expect } from 'chai';

import * as index from './index';

describe('index.js', () => {
  it('sum()', () => {
    expect(index.sum(1, 2)).to.be.equal(3);
  });

  it('msg()', () => {
    expect(index.msg()).to.be.equal('Hello, JavaScript!');
  });

  it('isValidPwdRegex()', () => {
    expect(index.isValidPwdRegex('qwe123!!')).to.be.equal(true);
  });
});
