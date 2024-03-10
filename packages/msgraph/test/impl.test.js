import { expect } from 'chai';
import * as impl from '../src/impl';
import { fixtures } from '../src/mock/fixtures';

describe('getDrive', () => {
  // look how simple this unit test is now
  it('should get a drive by id and set it to state', async () => {
    // no config needed, we take that for granted here
    const state = {
      configuration: {},
      drives: {} // TODO I shouldn't need to set this though
    };
    
    // Mock out request to just return the drive response data
    // TODO if we want, we cah test crentials here
    const request = async () => fixtures.driveResponse;

    // We can literally just test the result of get drive
    const result = await impl.getDrive(state, request, { id: 'b!YXzpkoLwR06bxC8tNdg71m_' })

    // TODO not sure why this is wrapped in default...
    expect(result.drives).to.eql({ default: fixtures.driveResponse });
  });
});