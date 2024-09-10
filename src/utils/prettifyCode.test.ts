import { describe, expect, it } from 'vitest';
import { prettifyCode } from './prettifyCode';

describe('prettifyCode', () => {
  it('should correctly format a code block with correct indentation', () => {
    const input = `
function test() {
const a = 1;
if (a > 0) {
console.log(a);
}
}
    `;

    const expectedOutput = `function test() {
  const a = 1;
  if (a > 0) {
    console.log(a);
  }
}`;

    expect(prettifyCode(input).trim()).toBe(expectedOutput);
  });

  it('should handle an empty string input', () => {
    const input = '';
    const expectedOutput = '';

    expect(prettifyCode(input).trim()).toBe(expectedOutput);
  });

  it('should correctly format nested code blocks', () => {
    const input = `
function outer() {
console.log('outer');
function inner() {
console.log('inner');
}
}
    `;

    const expectedOutput = `function outer() {
  console.log('outer');
  function inner() {
    console.log('inner');
  }
}`;

    expect(prettifyCode(input).trim()).toBe(expectedOutput);
  });
});
