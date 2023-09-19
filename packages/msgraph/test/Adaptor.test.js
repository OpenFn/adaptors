import { expect } from 'chai';
import { setGlobalDispatcher } from 'undici';

import MockAgent from './mockAgent.js';
import { fixtures } from './fixtures.js';
import {
  execute,
  getDrive,
  getFolder,
  getFile,
  submitXls,
} from '../src/Adaptor.js';

setGlobalDispatcher(MockAgent);

describe('execute', () => {
  it('executes each operation in sequence', done => {
    const state = {};
    const operations = [
      state => {
        return { counter: 1 };
      },
      state => {
        return { counter: 2 };
      },
      state => {
        return { counter: 3 };
      },
    ];

    execute(...operations)(state)
      .then(finalState => {
        expect(finalState).to.eql({ counter: 3 });
      })
      .then(done)
      .catch(done);
  });

  it('assigns references, data to the initialState', () => {
    const state = {};

    execute()(state).then(finalState => {
      expect(finalState).to.eql({ references: [], data: null });
    });
  });

  it('should stop operation on error', async () => {
    const state = {
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };
    const operations = [
      state => {
        state.counter++;
        throw new Error('Failed operation');
      },
      state => {
        return { ...state, counter: 1 };
      },
    ];

    let e;
    const finalState = await execute(...operations)(state).catch(err => {
      e = err;
    });

    expect(e.message).to.contain('Failed operation');

    expect(finalState).to.eql(undefined);
  });
});
describe('getDrive', () => {
  it('should get a drive by id and set it to state', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' }, undefined, state => {
        // write the drives object back to state before it gets cleaned up
        state.result = state.drives;
        return state;
      })
    )(state);

    expect(finalState.result.default).to.eql(fixtures.driveResponse);
  });

  it('should get a named drive by id and set it to state', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' }, 'mydrive', state => {
        // write the drives object back to state before it gets cleaned up
        state.result = state.drives;
        return state;
      })
    )(state);

    expect(finalState.result.mydrive).to.eql(fixtures.driveResponse);
  });

  it('should get the default drive for a site', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive(
        { id: 'openfn.sharepoint.com', owner: 'sites' },
        undefined,
        state => {
          // write the drives object back to state before it gets cleaned up
          state.result = state.drives;
          return state;
        }
      )
    )(state);

    expect(finalState.result.default).to.eql(fixtures.driveResponse);
  });
  it('should throws 400 error', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    await execute(
      getDrive({ id: 'noAccess', owner: 'sites' })(state).catch(e => {
        expect(e.message).to.contain(
          fixtures.invalidRequestResponse.error.message
        );
      })
    )(state);
  });

  it('throws 401 error with invalidToken message', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.invalidToken,
      },
    };

    await execute(
      getDrive({ id: 'openfn.sharepoint.com', owner: 'sites' })(state).catch(
        e => {
          expect(e.message).to.contain(
            fixtures.invalidTokenResponse.error.message
          );
        }
      )
    )(state);
  });

  it('should throws 401 error with expiredToken message', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.expiredToken,
      },
    };

    await execute(
      getDrive({ id: 'openfn.sharepoint.com', owner: 'sites' })(state).catch(
        e => {
          expect(e.message).to.contain(
            fixtures.expiredTokenResponse.error.message
          );
        }
      )
    )(state);
  });
});

describe('getFolder', () => {
  it('should get a folder metadata by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3', { metadata: true })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  it('should get a folder items by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3')
    )(state);

    expect(finalState.data).to.eql(fixtures.itemsResponse);
  });

  it('should get a folder metadata for a named drive by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3', {
        driveName: 'mydrive',
        metadata: true,
      })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  it('should get a folder items for a named drive by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3', { driveName: 'mydrive' })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemsResponse);
  });

  it('should get a folder metadata by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('/Sample Data', { metadata: true })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  it('should get a folder items by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(getFolder('/Sample Data'))(state);

    expect(finalState.data).to.eql(fixtures.itemsResponse);
  });

  it('should get a folder metadata for a named drive by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };
    const finalState = await execute(
      getFolder('/Sample Data', { driveName: 'mydrive', metadata: true })
    )(state);
    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  it('should get a folder items for a named drive by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };
    const finalState = await execute(
      getFolder('/Sample Data', { driveName: 'mydrive' })
    )(state);
    expect(finalState.data).to.eql(fixtures.itemsResponse);
  });

  it('should throw a helpful error if drive is not defined', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {},
    };

    await getFolder('/Sample Data')(state).catch(e => {
      expect(e.message).to.contain('Drive is not defined');
    });
  });
});

describe('getFile', () => {
  it('should get a file by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFile('01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW')
    )(state);

    expect(finalState.data).to.eql(fixtures.itemContent);
  });

  it('should get a file metadata by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFile('01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW', {
        metadata: true,
      })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemWithDownloadUrl);
  });

  it('should get a file for a named drive by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFile('01LUM6XOGRONYNTZ26DBBJPTN5IFTQPBIW', {
        driveName: 'mydrive',
      })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemContent);
  });

  it('should get a file by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(getFile('/Sample Data/test.csv'))(state);

    expect(finalState.data).to.eql(fixtures.itemContent);
  });

  it('should get a file metadata by path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFile('/Sample Data/test.csv', { metadata: true })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemWithDownloadUrl);
  });

  it('should throw a helpful error if drive is not defined', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {},
    };

    await getFile('/Sample Data/test.csv')(state).catch(e => {
      expect(e.message).to.contain('Drive is not defined');
    });
  });
});

describe('submitXls', () => {
  it.skip('should convert array of object to excel and post to specified path', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      siteId: 'openfn.sharepoint.com',
      folderId: '01LUM6XOGVJ2OK2Z5RJRAKU3WAK2MTC5XD',
      drives: {},
      rows: [
        [
          {
            name: 'Mtuchi',
            birthday: '1/1/1973',
          },
          {
            name: 'Aleksa',
            birthday: '1/1/2023',
          },
        ],
      ],
    };

    const fileName = '2023_09_19T07_29_09_369Z.xls';
    const fileUploadPath = `sites/${state.siteId}/drive/items/${state.folderId}:/${fileName}:/content`;

    const finalState = await submitXls(
      {
        path: fileUploadPath,
      },
      {
        wsName: 'Birthdays',
        rows: state.rows,
      }
    )(state);
    console.log(finalState);
    /* The above code is written in JavaScript and it is using the `expect` function to check if the
    `data` variable is equal to the `fixtures.submitXlsResponse` variable. */
    // expect(data).to.eql(fixtures.submitXlsResponse);
  });
});
