import env from 'src/services/env';

const { MAILER_DOMAIN } = env;

export const identities = {
  support: { address: `support@${MAILER_DOMAIN}`, name: 'Support' },
  welcome: { address: `welcome@${MAILER_DOMAIN}`, name: 'Welcome' },
  doNotReply: {
    address: `donotreply@${MAILER_DOMAIN}`,
    name: 'Do Not Reply',
  },
};
