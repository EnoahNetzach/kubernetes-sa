#!/usr/bin/env bash

cd services/api
gradle install
cd -

cd services/frontend
yarn install --pure-lockfile
cd -

cd services/logic
pyCmd=python3
if ! type "$pyCmd" > /dev/null; then
  pyCmd=python
fi
"$pyCmd" -m pip install -r requirements.txt
"$pyCmd" -m textblob.download_corpora
cd -
