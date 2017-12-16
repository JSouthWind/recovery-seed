#!/bin/bash
curl http://enclose.io/nodec/nodec-linux-x64.gz | gzip -d > /usr/local/bin/nodec
chmod +x /usr/local/bin/nodec
apt update
apt install gcc g++ quashfs-tools clang  make
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt install nodejs
nodec recovery-seed/index.js -o bin/recovery-seed
