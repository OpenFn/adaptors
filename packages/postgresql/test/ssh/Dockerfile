# TEST ONLY: postgres that is reachable exclusively through an SSH tunnel.
#  - sshd listens on :22 (published as 2222) and only accepts keys/test_key.pub
#  - postgres listens on 127.0.0.1 inside the container, and its port is never published
FROM postgres:16-alpine

RUN apk add --no-cache openssh-server \
 && ssh-keygen -A \
 && adduser -D -s /bin/sh tunnel \
 && passwd -u tunnel \
 && mkdir -p /home/tunnel/.ssh \
 && chmod 700 /home/tunnel/.ssh

COPY keys/test_key.pub /home/tunnel/.ssh/authorized_keys
RUN chown -R tunnel:tunnel /home/tunnel/.ssh && chmod 600 /home/tunnel/.ssh/authorized_keys

COPY sshd_config /etc/ssh/sshd_config.d/tunnel.conf
RUN echo "Include /etc/ssh/sshd_config.d/*.conf" >> /etc/ssh/sshd_config

COPY init.sql /docker-entrypoint-initdb.d/init.sql
COPY entrypoint.sh /usr/local/bin/tunnel-entrypoint.sh
RUN chmod +x /usr/local/bin/tunnel-entrypoint.sh

EXPOSE 22
ENTRYPOINT ["tunnel-entrypoint.sh"]
CMD ["postgres", "-c", "listen_addresses=127.0.0.1"]
