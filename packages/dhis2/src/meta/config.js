// Config for dhis2 sandbox
export default {
  configuration: {
    hostUrl: 'https://play.im.dhis2.org/stable-2-42-1',
    username: process.env.OPENFN_DHIS2_USER,
    password: process.env.OPENFN_DHIS2_PW,
  },
};
