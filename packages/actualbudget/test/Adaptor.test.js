import { expect } from 'chai';
import * as actualBudgetApi from '@actual-app/api';
import { getBudgetMonth, setMockApi, execute } from '../src/Adaptor.js';

const state = {};
let mockApi = actualBudgetApi;
setMockApi(mockApi);

describe('getBudgetMonth', () => {
  before(async () => {
    await mockApi.init({
      dataDir: './test/mocks',
    });
    await mockApi.loadBudget('test-budget');
  });

  it('should throw an error if month is has no budget', async () => {
    await getBudgetMonth('2012-01')(state).catch(err => {
      expect(err.message).to.eq(`No budget exists for month: 2012-01`);
    });
  });
  it('should fetch the budget for the given month', async () => {
    const { data } = await getBudgetMonth('2023-01')(state);
    expect(data.month).to.eq('2023-01');
  });

  after(async () => {
    await mockApi.shutdown();
  });
});
