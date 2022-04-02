const core = require('@actions/core');
const github = require('@actions/github');
const newman = require('newman');

const username = core.getInput('USERNAME') || `${github.context.issue.owner}-${new Date().toString()}`;
const email = core.getInput('EMAIL') || `${username}@mail.com`;
const password = core.getInput('PASSWORD') || (Math.random() * 12).toString(36)

newman.run({
    delayRequest: 500,
    globals: {
        url: core.getInput('APIURL'),
        username,
        email,
        password
    },
    collection: require('./postman-collection.json'),
    reporters: 'cli'
},  (err) =>  {
    if (err) { core.setFailed(err) }
});
