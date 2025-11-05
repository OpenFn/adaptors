import { expect } from 'chai';
import { getBudgetMonth, setMockApi } from '../src/Adaptor.js';

const state = {
  configuration: {
    serverUrl: 'https://actual.budget',
    password: 'password',
    budgetSyncId: 'budgetSyncId',
  },
};

const mockBudgetMonth = month => {
  if (month !== '2023-01') {
    throw new Error('Invalid month');
  }
  return {
    month: '2025-01',
    incomeAvailable: -7634035745,
    lastMonthOverspent: 0,
    forNextMonth: 0,
    totalBudgeted: -585000000,
    toBudget: -8219035745,
    fromLastMonth: -7634035745,
    totalIncome: 0,
    totalSpent: -265500000,
    totalBalance: 7586744074,
    categoryGroups: [],
  };
};
const mockApi = {
  getBudgetMonth: async month => {
    return mockBudgetMonth(month);
  },
};

setMockApi(mockApi);

describe('getBudgetMonth', () => {
  it('should fetch the budget for the given month', async () => {
    const result = await getBudgetMonth('2023-01')(state);
    expect(result.data).to.be.an('array');
  });
});
