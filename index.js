const core = require('@actions/core');
const github = require('@actions/github');
const newman = require('newman');

const username = core.getInput('username') || `${github.context.issue.owner}-${new Date().toString()}`;
const email = core.getInput('email') || `${username}@mail.com`;
const password = core.getInput('password') || (Math.random() * 12).toString(36)


newman.run({
    delayRequest: 500,
    globalVar: [
        {key: 'APIURL', value: core.getInput('url')},
        {key: 'USERNAME', value: username},
        {key: 'EMAIL', value: 'foo@mail.com'},
        {key: 'PASSWORD', value: password},
    ],
    collection: require('./postman-collection.json'),
    reporters: 'cli'
},  (err) =>  {
    if (err) { core.setFailed(err) }
});
