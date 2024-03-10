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

Adaptor.enableMock(defaultState);

// Test all the default mock behaviours
describe('default values', () => {
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

// TODO this doesn't work with Undici :(
// Which means we don't have sufficient control of the mock
describe.skip('custom values', () => {
  it('getDrive', async () => {
    const state = { ...defaultState };

    // This should override the default mock... (forever)
    // This is annoying, I think the first mock to bind is the winner in case of a conflict
    // That doesn't suit me!
    // A shame because this is actually a really nice pattern
    Adaptor.mock(patterns.drives, {
      x: 22
    })

    const result = await Adaptor.getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' })(state)
    expect(result.drives).to.eql({ default:  { x: 22 } })
  })
})