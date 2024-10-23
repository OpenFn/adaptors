// Sample expression which uses the built-in mock

fn((state = {}) => {
  // set up a mock
  const server = collections.createMockServer();
  collections.setMockClient(server);

  server.api.createCollection('collection');

  state.configuration = {
    collections_token: 'abc',
  };

  state.data = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

  return state;
});

collections.set('collection', v => v.id, $.data);

collections.each('collection', '*', (state, value, key) => {
  console.log(value, key);
});
