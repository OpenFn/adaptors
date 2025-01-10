import chai from 'chai';
import { execute } from '../src/Adaptor';
import { toUTF8, formatResults } from '../src/util';

const { expect } = chai;

describe('toUTF8', () => {
  it('Transliterate unicode to ASCII representation', async () => {
    const state = {
      connection: {},
    };

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
