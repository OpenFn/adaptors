/**
 * A simple test job which gets a drive
 */
getDrive((
  state) => ({ id: state.id }), // get the drive id from state
  "default", // drive name
  (state) => ({ ...state, savedDrives: state.drives }) // alias savedDrives onto state (it gets removed by the adaptor)
)
