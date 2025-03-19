import { expect } from 'chai';
import { execute, setMockConnection } from '../src/Adaptor';
import {
  toUTF8,
  removeNestings,
  assertNoNesting,
  formatResults,
} from '../src/util';

describe('toUTF8', () => {
  it('Transliterate unicode to ASCII representation', async () => {
    const state = {};
    setMockConnection({});
    // Run toUTF8 inside an execute block to ensure that any-ascii gets loaded correctly
    const convert = str => execute(state => toUTF8(str))(state);

    let result = await convert('άνθρωποι');
    expect(result).to.eql('anthropoi');

    // Misc
    result = await convert('☆ ♯ ♰ ⚄ ⛌');
    expect(result).to.equal('* # + 5 X');

    // Emojis
    result = await convert('👑 🌴');
    expect(result).to.eql(':crown: :palm_tree:');

    // Letterlike
    result = await convert('№ ℳ ⅋ ⅍');
    expect(result).to.eql('No M & A/S');

    // Ordinal coordinator
    result = await convert('Nhamaonha 6ª Classe 2023-10-09');
    expect(result).to.eql('Nhamaonha 6a Classe 2023-10-09');
  });
});

describe('formatResults', () => {
  it('should return success true with no errors when all records succeed', () => {
    const input = [
      { id: '001', success: true, errors: [] },
      { id: '002', success: true, errors: [] },
      { id: '003', success: true, errors: [] },
    ];

    const expectedOutput = {
      success: true,
      completed: ['001', '002', '003'],
      errors: [],
    };

    const result = formatResults(input);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should return success false with errors when some records fail', () => {
    const input = [
      { id: '001', success: true, errors: [] },
      { id: '002', success: false, errors: ['Validation error'] },
      { id: '003', success: true, errors: [] },
    ];

    const expectedOutput = {
      success: false,
      completed: ['001', '003'],
      errors: [{ id: '002', message: 'Validation error' }],
    };

    const result = formatResults(input);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should include warnings in the errors array for successful records', () => {
    const input = [
      {
        id: '001',
        success: true,
        errors: ['Warning: Missing optional field'],
      },
      { id: '002', success: true, errors: [] },
      { id: '003', success: false, errors: ['Validation error'] },
    ];

    const expectedOutput = {
      success: false,
      completed: ['001', '002'],
      errors: [
        { id: '001', message: 'Warning: Missing optional field' },
        { id: '003', message: 'Validation error' },
      ],
    };

    const result = formatResults(input);
    expect(result).to.deep.equal(expectedOutput);
  });

  it('should handle records with multiple errors', () => {
    const input = [
      { id: '001', success: false, errors: ['Error 1', 'Error 2'] },
    ];

    const expectedOutput = {
      success: false,
      completed: [], // No successful records
      errors: [
        { id: '001', message: 'Error 1' },
        { id: '001', message: 'Error 2' },
      ],
    };

    const result = formatResults(input);
    expect(result).to.deep.equal(expectedOutput);
  });
});

describe('removeNestings', () => {
  it('should throw an error for nested objects beyond two levels deep', () => {
    const input = [
      {
        Project__r: {
          Details: {
            SubMetric__c: 'subValue1',
          },
        },
      },
    ];

    expect(() => removeNestings(input)).throw(
      'Nested object with key Project__r.Details exceeds the allowed depth'
    );
  });

  it('should flatten an array of objects up to two levels deep', () => {
    const input = [
      {
        Task__r: {
          Metrics_ID__c: 'value2',
        },
      },
    ];

    const expectedOutput = [
      {
        'Task__r.Metrics_ID__c': 'value2',
      },
    ];

    expect(removeNestings(input)).to.eql(expectedOutput);
  });

  it('should throw an error for invalid input types', () => {
    const invalidInputs = [null, undefined, 42, 'string', true, {}];
    invalidInputs.forEach(input => {
      expect(() => removeNestings(input)).throw(
        'Input must be an array of objects.'
      );
    });
  });

  it('should handle empty array input', () => {
    expect(removeNestings([])).to.eql([]);
  });

  it('should preserve 1-level keys', () => {
    const input = [
      {
        Name: 'it Project',
        Details: {
          Description: 'A it description',
        },
      },
    ];

    const expectedOutput = [
      {
        Name: 'it Project',
        'Details.Description': 'A it description',
      },
    ];

    expect(removeNestings(input)).to.eql(expectedOutput);
  });
});
describe('assertNoNesting', () => {
  it('should not throw an error for inputs without keys containing dots', () => {
    expect(() =>
      assertNoNesting({ Task__r: 'value1', Metrics_ID__c: 'value2' })
    ).not.throw();

    expect(() =>
      assertNoNesting([
        { Task__r: 'value1', Metrics_ID__c: 'value2' },
        { Project__r: 'value3' },
      ])
    ).not.throw();
  });

  it('should throw an error for input containing dots', () => {
    const input = {
      'Task__r.Metrics_ID__c': 'value1',
      Metrics_ID__c: 'value2',
    };
    expect(() => assertNoNesting(input)).throw(
      'UNEXPECTED_KEY: Dot notation syntax (i.e., Task__r.Metrics_ID__c) is not supported in key names'
    );
  });

  it('should throw an error if the input is not an object or array', () => {
    const invalidInputs = [null, undefined, 42, 'string', true];
    invalidInputs.forEach(input => {
      expect(() => assertNoNesting(input)).throw(
        'INVALID_INPUT_TYPE: Input must be an object or an array of objects.'
      );
    });
  });
  it('should not throw an error for an empty object or array input', () => {
    expect(() => assertNoNesting({})).not.throw();
    expect(() => assertNoNesting([])).not.throw();
  });
});
