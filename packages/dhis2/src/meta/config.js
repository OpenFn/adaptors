// Config for dhis2 sandbox
export default {
  configuration: {
    hostUrl: 'https://play.dhis2.org/2.39.0.1',
    username: process.env.OPENFN_DHIS2_USER,
    password: process.env.OPENFN_DHIS2_PW,
  },
};
