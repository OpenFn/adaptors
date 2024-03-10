/**
 * these tests check default and custom mock values
 * they do not exercise execute or anything
 */
import { expect } from 'chai';

import { fixtures } from '../src/mock/fixtures';
import { patterns } from '../src/mock/mock';

// not sure if this is the right import
// I guess it's fine
import Adaptor from '../src/index.js'

const defaultState = { configuration: {resource: 'x'}, drives: {}};


// Test all the default mock behaviours
describe('default values', () => {
  before(() => {
    Adaptor.enableMock(defaultState);
  });

  // These can all use the default mock
  it('getDrive', async () => {
    const state = { ...defaultState };

    const result = await Adaptor.getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' })(state)
    expect(result.drives).to.eql({ default: fixtures.driveResponse })
  })

  it('getDrive basically ignores the drive id argument', async () => {
    const state = { ...defaultState };

    const result = await Adaptor.getDrive({ id: 'abcdefg' })(state)
    expect(result.drives).to.eql({ default: fixtures.driveResponse })
  })
})

describe('custom values', () => {
  it('getDrive', async () => {
    Adaptor.enableMock(defaultState, {
      'drives': {
        pattern: patterns.drives,
        data: { x: 22 },
        options: { once: true }
      }
    });

    const state = { ...defaultState };

    const result = await Adaptor.getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' })(state)
    expect(result.drives).to.eql({ default:  { x: 22 } })
  })
})