sql('select * from users');
fn(state => {
  console.log('rows:', JSON.stringify(state.data));
  return state;
});
