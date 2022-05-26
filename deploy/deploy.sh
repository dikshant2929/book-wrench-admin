#!/bin/bash
git checkout . && git fetch --all && git checkout $1 && git pull origin $1

#Install npm modules if any one missing or update
npm install

#Build js
npm run build:staging

sleep 1

#Copy Build to Production
cp -r build/* prod/

