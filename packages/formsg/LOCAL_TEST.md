# FormSG Adaptor - Local Testing Guide

## Prerequisites
- OpenFn CLI installed: `npm install -g @openfn/cli`
- FormSG adaptor built locally

## Step 1: Build the adaptor
```bash
cd packages/formsg
pnpm build
```

## Step 2: Set environment variable
```bash
export OPENFN_ADAPTORS_REPO=~/path/to/adaptors
```

## Step 3: Create test files

### Create `state.json`:
```json
{
  "configuration": {
    "formSecretKey": "epV/ENO9NstNrVVtBWdmEKpFMKla58Qy/eS7BVl4fok=",
    "mode": "development",
    "webhookEndpoint": "https://webhook.site/5d839958-ef57-40e0-8158-8d7fb2b4a527"
  },
  "data": {
    "formId": "68e7e536228a4c0fff058a3e",
    "submissionId": "68e7e5a8228a4c0fff058b0a",
    "encryptedContent": "AVaUzPxsPVODeB+AWEB9JFtEQeUo1N//hyJk3tCjBmg=;VkvWrSb8rJfbEjY104P56jEYOwty39Ko:6KnKpMb7ATmY2BL68Vn20mGwQOq+3a480d/XubbU+YZ72Pg3bMmzPpAq/pEYhlSgAoNlEM/ZXFt2d9x3dG3Z4ai3Mj3RwfcgG3mkpDcYIqd3FwXzwoKhAL02nH1lYk+0eVtp1Vmf/5tBfLEYdkSD+MWbcjgcrI101Ajs+68cS9HX",
    "version": 2.1,
    "created": "2025-10-09T16:41:12.647Z"
  },
  "headers": {
    "x-formsg-signature": "t=1760028072670,s=68e7e5a8228a4c0fff058b0a,f=68e7e536228a4c0fff058a3e,v1=Kq+Pjx28M6dJh80/AjNlVbJoRFBWaQxKHINy0A2hI5uHA5yVOF2xbWhjckEdee4UJBstdHj2O3B8/rbKauMTDg=="
  }
}
```

### Create `job.js`:
```javascript
// Test 1: Decrypt without signature verification
decryptSubmission(state.data);
```

### Create `job-with-verify.js`:
```javascript
// Test 2: Decrypt with signature verification
processWebhook(state.data, state.headers['x-formsg-signature']);
```

## Step 4: Run tests

### Test without signature verification:
```bash
openfn job.js -ma formsg -s state.json -o output.json
```

### Test with signature verification:
```bash
openfn job-with-verify.js -ma formsg -s state.json -o output.json
```

## Step 5: Check output
```bash
cat output.json
```

Expected output structure:
```json
{
  "configuration": { ... },
  "data": {
    "responses": [
      {
        "_id": "field-id",
        "question": "Field Question",
        "answer": "User's answer",
        "fieldType": "textfield"
      }
    ]
  },
  "references": [ ... ]
}
```

## Troubleshooting

### Error: "formSecretKey is required"
- Make sure `formSecretKey` is in `state.configuration`

### Error: "X-FormSG-Signature header is invalid"
- Check that the signature in `state.headers` matches the webhook payload
- Verify `webhookEndpoint` matches the URL used when form was submitted

### Error: "Failed to decrypt submission"
- Ensure `formSecretKey` matches the key downloaded from FormSG
- Verify `encryptedContent` is complete and not truncated

## Getting Fresh Test Data

1. Go to https://webhook.site and get a unique URL
2. In FormSG, update webhook URL to your webhook.site URL
3. Submit a test form
4. Copy the JSON payload from webhook.site to `state.data`
5. Copy the `x-formsg-signature` header to `state.headers`
6. Use the form secret key in `state.configuration.formSecretKey`

## Clean Up
```bash
rm state.json job.js job-with-verify.js output.json
unset OPENFN_ADAPTORS_REPO
```
