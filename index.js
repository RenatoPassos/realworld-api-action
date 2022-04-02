const core = require('@actions/core');
const github = require('@actions/github');
const newman = require('newman');
const {setFailed} = require("@actions/core");

const username = core.getInput('username') || `${github.context.issue.owner}-${new Date().toString()}`;
const email = core.getInput('email') || `${username}@mail.com`;
const password = core.getInput('password') || (Math.random() * 12).toString(36)


newman.run({
    delayRequest: 500,
    globalVar: [
        {key: 'APIURL', value: core.getInput('url')},
        {key: 'USERNAME', value: username},
        {key: 'EMAIL', value: email},
        {key: 'PASSWORD', value: password},
    ],
    collection: require('./postman-collection.json'),
    reporters: 'cli'
}).on('done', (err, summary) => {
    console.log('summary', summary);
    if (err || summary.error) {
        core.setFailed('collection run encountered an error.')
    } else if (summary.failures && summary.failures.length) {
        core.setFailed( `${summary.failures.length} failure${summary.failures.length > 1 ? 's' : ''}.`);
    } else {
        console.log('collection run completed.');
    }
});
