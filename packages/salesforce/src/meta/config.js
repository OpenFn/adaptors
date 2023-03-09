// config for salesforce sandbox
export default {
  configuration: {
    loginUrl: 'https://login.salesforce.com/',
    username: process.env.OPENFN_SF_USER,
    password: process.env.OPENFN_SF_PW,
    securityToken: process.env.OPENFN_SF_TOKEN,
  },
};
