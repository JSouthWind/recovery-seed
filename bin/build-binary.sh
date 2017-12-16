#!/bin/bash
curl -L http://enclose.io/nodec/nodec-linux-x64.gz | gzip -d > /usr/local/bin/nodec
chmod +x /usr/local/bin/nodec
apt update
apt install -y gcc g++ squashfs-tools clang  make
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt install -y nodejs
nodec index.js -o bin/recovery-seed
