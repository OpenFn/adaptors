# language-thaura <img src='./assets/square.png' width="30" height="30"/>

An OpenFn **_adaptor_** for building integration jobs for use with the
[Thaura](https://thaura.ai) API.

Thaura is an independent AI, hosted in the EU (Helsinki, Finland) and guided by
a public [Constitution](https://thaura.ai/constitution). Its API is compatible
with the OpenAI Chat Completions API. See the
[Thaura API documentation](https://thaura.ai/api-platform) for the parameters it
accepts, its limits and its pricing.

## Documentation

View the [docs site](https://docs.openfn.org/adaptors/packages/thaura-docs) for
full technical documentation.

### Configuration

View the
[configuration-schema](https://docs.openfn.org/adaptors/packages/thaura-configuration-schema/)
for required and optional `configuration` properties.

You need a Thaura API key. Create one in the Thaura app: open your account menu,
then API, then API Keys. `baseUrl` defaults to `https://backend.thaura.ai/v1`.

```json
{
  "apiKey": "YOUR_THAURA_API_KEY"
}
```

The configuration schema uses
[JSON Schema draft-07](https://json-schema.org/draft-07/json-schema-release-notes).
Run `pnpm validate:schemas` from the adaptors repo root after editing it.

### Examples

Send a single prompt. The answer's text is at
`state.data.choices[0].message.content`:

```js
prompt(`Summarize this feedback in one sentence: ${$.data.feedback}`);
fn(state => {
  state.summary = state.data.choices[0].message.content;
  return state;
});
```

Set a system prompt and limit the answer's length:

```js
prompt($.data.question, {
  system:
    'You answer questions about our vaccination program in plain language.',
  max_tokens: 500,
});
```

Send a whole conversation, and ask for JSON:

```js
chat(
  [
    { role: 'system', content: 'You extract data from clinic notes.' },
    {
      role: 'user',
      content: `Return the patient's name and age as JSON: ${$.data.note}`,
    },
  ],
  { response_format: { type: 'json_object' } }
);
```

### Limits

- Each API key can make 60 requests a minute and 8 requests at once. Over either
  limit the API answers 429; the adaptor waits as long as the API asks (up to a
  minute) and tries again, up to two more times, then throws.
- Each request has a 128,000-token context window (prompt and answer together),
  and an answer is at most 32,000 tokens.
- The adaptor waits for the whole answer and does not stream. An answer must
  finish within about 5 minutes, or the API returns 504 `upstream_timeout`. For
  long tasks, ask for a shorter answer or set a lower `max_tokens`.
- While a request runs, the most it can cost (its input plus `max_tokens` of
  output, 32,000 by default) is held on your balance. If your balance can't
  cover it, the API answers 402 `insufficient_balance`: add funds, or set a
  lower `max_tokens`.

## Development

Clone the [adaptors monorepo](https://github.com/OpenFn/adaptors). Follow the
"Getting Started" guide inside to get set up.

Run tests using `pnpm run test` or `pnpm run test:watch`

Build the project using `pnpm build`.

To build _only_ the docs run `pnpm build docs`.
