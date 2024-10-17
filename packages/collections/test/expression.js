// Set up the test
fn((state = {}) => {
  // set up a mock
  const server = mock.createServer();
  collections.setMockClient(server);

  server.api.createCollection('collection');

  state.configuration = {
    collections_token: 'abc',
  };

  state.data = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

  return state;
});

collections.set('collection', v => v.id, $.data);

collections.each('collection', '*', (state, key, value) => {
  console.log(key, value);
});
