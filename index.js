#! /usr/bin/env node

const { spawn } = require('child_process');

const folderName = process.argv[2];

// if folder name is not specified or contains invalid characters
if (!folderName || !folderName.match(/^[a-z0-9-]+$/i)) {
    return console.log('Invalid directory name.');
}

const REPOS = {
    'basic': 'https://github.com/RajathaDH/Starter-Express-API-Basic.git',
    'jwt': 'https://github.com/RajathaDH/Starter-Express-API-JWT.git'
};

const api = process.argv[3];
const repoURL = REPOS[api];

// if 4th argument is specified (given api) and it is invalid
if (api && !repoURL) {
    return console.log('Invalid API.');
}

function runCommand(command, args, options) {
    const cmd = spawn(command, args, options);

    return new Promise((resolve) => {
        cmd.stdout.on('data', (data) => {
            console.log(data.toString());
        });
    
        cmd.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    
        cmd.on('close', (code) => {
            //console.log('Exit code', code);
            resolve();
        });
    });
}

runCommand('git', ['clone', repoURL || REPOS['basic'], folderName])
    .then(() => {
        /*if (process.platform === 'win32') {
            return runCommand('cmd', ['/c', 'rmdir', '/s', ]);
        } else {
            return runCommand('rm', ['-rf', `${folderName}/.git`]);
        }*/

        return runCommand('rm', ['-rf', `${folderName}/.git`]);
    }).then(() => {
        console.log('Done creating API.');
        console.log('To get started');
        console.log('cd', folderName);
        console.log('npm install');
    });