import { expect } from 'chai';
import { groupByKey } from '../utils/helpers';

describe('Testing Helpers', () => {
  it('should group by key', () => {
    const array = [
      {
        name: 'jim',
        color: 'blue',
        age: '22',
      },
      {
        name: 'Sam',
        color: 'blue',
        age: '33',
      },
      {
        name: 'eddie',
        color: 'green',
        age: '77',
      },
    ];
    const result = [
      {
        key: 'blue',
        values: [
          {
            name: 'jim',
            color: 'blue',
            age: '22',
          },
          {
            name: 'Sam',
            color: 'blue',
            age: '33',
          },
        ],
      },
      {
        key: 'green',
        vales: [
          {
            name: 'eddie',
            color: 'green',
            age: '77',
          },
        ],
      },
    ];
    const resultTest = groupByKey(array, 'color');

    expect(resultTest).to.deep.equal(result);
  });
});
