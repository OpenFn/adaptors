# @openfn/language-fayda

## 1.0.0

Initial release. Adds `getUserInfo(code, options)` which verifies a user's
identity against eSignet (VeriFayda 2.0): it exchanges an authorization code for
an access token using a JWK-signed client assertion (`private_key_jwt`) and
PKCE, calls the userinfo endpoint, and returns the decoded claims on
`state.data`. The client-assertion lifetime is configurable via
`configuration.tokenExpirationTime` (default `5m`).
