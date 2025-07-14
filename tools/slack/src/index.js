const { readFileSync } = require('node:fs');
const { WebClient } = require('@slack/web-api');

const SLACK_DEV = 'C06DV9P91T6';
const DEVS = 'C05KZNPEJFN';
const IMPLEMENTATION = 'C017ELVRSM8';
const ADAPTORS_AND_TEMPLATES = 'C08MA92GMT5';

const token = process.env.SLACK_TOKEN;
const slack = new WebClient(token);

const getMessage = changes => {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🧩 *New adaptors releases* ✨`,
      },
    },
  ];

  const versions = changes.publishedPackages.map(
    pkg => `${pkg.version.padEnd(10)} ${pkg.name}`
  );

  const attachments = [
    {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `\`\`\`${versions.join('\n')}\`\`\``,
          },
        },
      ],
    },
  ];

  return {
    blocks,
    attachments,
  };
};

const file = readFileSync('../../pnpm-publish-summary.json');
if (file) {
  const json = JSON.parse(file);
  if (json.publishedPackages.length) {
    console.log('Generating slack post for all releases');
    console.log();

    const message = getMessage(json);
    console.log(JSON.stringify(message));

    slack.chat.postMessage({
      ...message,
      channel: ADAPTORS_AND_TEMPLATES,
    });

    console.log();
    console.log('Done!');
  } else {
    console.log('No releases to report');
  }
} else {
  console.error('ERROR: no pnpm-publish-summary.json found');
  process.exit(1);
}
