---
'@openfn/language-postgresql': minor
---

Add optional SSH tunnel support, for databases that can only be reached through
an SSH server (a bastion or jump host).

Set `sshHost` in the configuration to turn it on. The adaptor connects to the
SSH server and sends postgres traffic over that SSH connection. It does not open
a local port. `host` and `port` then name the database as the SSH server sees it
(often `localhost`). They default to `localhost` and 5432.

- `sshHost`: the SSH server. Setting it turns the tunnel on.
- `sshPort`: the SSH port. Defaults to 22.
- `sshUsername`: the SSH username.
- `sshPrivateKey`: the private key contents.
- `sshPassphrase`: optional. The passphrase for an encrypted private key.
- `sshHostKey`: optional. The SHA256 fingerprint of the SSH server's host key,
  as `ssh-keygen -lf` prints it (for example `SHA256:abc...`). The `SHA256:`
  prefix and any trailing `=` are optional. When set, the adaptor refuses to
  connect if the server presents a different key, before it sends any
  credentials. When unset, any host key is accepted and its fingerprint is
  logged so that you can copy it into `sshHostKey`.

Connection errors, through the tunnel or not, now fail the job with the error
instead of surfacing as unhandled rejections. A connection that drops while idle
is now logged rather than crashing the process. Connecting to postgres now gives
up after 30 seconds instead of waiting forever for a server that never answers.

**SSL certificate check for IP addresses.** When `ssl` is on and `host` is an IP
address, the adaptor now checks that the server's certificate is issued for that
IP address. Previously Node checked the certificate against the name `localhost`
instead, so a certificate for the wrong server could be accepted. This applies
to every connection, with or without SSH. It can break a connection that uses
all of these: `ssl` on, `allowSelfSignedCert` off, an IP address as `host`, and
a certificate that names `localhost` but not that IP address. To fix it, reissue
the certificate with the IP address in its subject alternative names, or connect
by a hostname the certificate names. Connections with `allowSelfSignedCert` on
are not affected, because they skip this check.
