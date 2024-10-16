// Set up the test
fn((state = {}) => {
  // set up a mock
  const server = mock.createServer();
  collections.setMockClient(server);

  server.api.createCollection('collection');

  state.configuration = {
    collections_token: 'abc',
  };

  state.data = [
    { key: 'a', value: { id: 'a' } },
    { key: 'b', value: { id: 'b' } },
    { key: 'c', value: { id: 'c' } },
  ];

  return state;
});

collections.set('collection', $.data);

collections.each('collection', '*', (state, key, value) => {
  console.log(key, value);
});
