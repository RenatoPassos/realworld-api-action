const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');
const newman = require('newman');
const quote = require('quote')
const cliParser = require('argument-vector')();
const io = require('@actions/io');

const username = core.getInput('username') || `${github.context.issue.owner}-${new Date().toString()}`;
const email = core.getInput('email') || `${username}@mail.com`;
const password = core.getInput('password') || (Math.random() * 12).toString(36);

const startCommand = core.getInput('start');

const execCommand = () => {
    const args = cliParser.parse(startCommand);
    return io.which(args[0], true).then((toolPath) => {
        const toolArguments = args.slice(1);
        const promise = exec.exec(
            quote(toolPath),
            toolArguments
        )
    });
}

execCommand().then(() => {
    debug(`newManRun`)
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
        if (err || summary.run.error) {
            core.setFailed('collection run encountered an error.')
        } else if (summary.run.failures.length) {
            core.setFailed(`${summary.run.failures.length} failure${summary.run.failures.length > 1 ? 's' : ''}.`);
        } else {
            console.log('collection run completed.');
        }
        process.exit(0);
    });
}).catch(() => process.exit(1));


