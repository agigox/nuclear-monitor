import { expect } from 'chai';
import { fullPartialSplit, groupByKey, partitionArray } from '../utils/helpers';

describe('Testing Helpers', () => {
  it('should group by key (value as string)', () => {
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
        values: [
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

  it('should group by key (value as object)', () => {
    const array = [
      {
        infos: { name: 'jim' },
        color: 'blue',
        age: '22',
      },
      {
        infos: { name: 'jim' },
        color: 'blue',
        age: '33',
      },
      {
        infos: { name: 'eddie' },
        color: 'green',
        age: '77',
      },
    ];
    const result = [
      {
        key: 'jim',
        values: [
          {
            infos: { name: 'jim' },
            color: 'blue',
            age: '22',
          },
          {
            infos: { name: 'jim' },
            color: 'blue',
            age: '33',
          },
        ],
      },
      {
        key: 'eddie',
        values: [
          {
            infos: { name: 'eddie' },
            color: 'green',
            age: '77',
          },
        ],
      },
    ];
    const resultTest = groupByKey(array, 'infos.name');
    expect(resultTest).to.deep.equal(result);
    // expect('foo').to.be.a('string');
  });
  it('should test the partition method', () => {
    const [pass, fail] = partitionArray([1, 2, 5, 4, 78], (e) => e > 5);
    expect(pass).to.eql([78]);
    expect(fail).to.eql([1, 2, 5, 4]);
  });

  it('should separate an array to fullyDown, partiallyDown and total', () => {
    const startValues = [
      {
        values: [
          {
            start_date: '2023-01-16T07:00:00+01:00',
            end_date: '2023-01-20T16:30:00+01:00',
            available_capacity: 0,
            unavailable_capacity: 30,
          },
          {
            start_date: '2023-01-16T07:00:00+01:00',
            end_date: '2023-01-20T16:30:00+01:00',
            available_capacity: 12,
            unavailable_capacity: 30,
          },
        ],
      },
      {
        values: [
          {
            start_date: '2023-01-16T07:00:00+01:00',
            end_date: '2023-01-20T16:30:00+01:00',
            available_capacity: 0,
            unavailable_capacity: 30,
          },
        ],
      },
    ];

    const expectedResult = {
      fullyDown: [
        {
          values: [
            {
              start_date: '2023-01-16T07:00:00+01:00',
              end_date: '2023-01-20T16:30:00+01:00',
              available_capacity: 0,
              unavailable_capacity: 30,
            },
          ],
          availableCapacitySum: 0,
          unavailableCapacitySum: 30,
        },
      ],
      partiallyDown: [
        {
          values: [
            {
              start_date: '2023-01-16T07:00:00+01:00',
              end_date: '2023-01-20T16:30:00+01:00',
              available_capacity: 0,
              unavailable_capacity: 30,
            },
            {
              start_date: '2023-01-16T07:00:00+01:00',
              end_date: '2023-01-20T16:30:00+01:00',
              available_capacity: 12,
              unavailable_capacity: 30,
            },
          ],
          availableCapacitySum: 12,
          unavailableCapacitySum: 60,
        },
      ],
    };

    const functionResult = fullPartialSplit(startValues);
    expect(functionResult).to.deep.equal(expectedResult);
    // expect('foo').to.be.a('string');
  });
});
