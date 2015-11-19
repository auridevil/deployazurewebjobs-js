'use strict';

/** Connection Configurations */
var domain = '<WEBSITENAME>.scm.azurewebsites.net';
var password = '<DEPLOYUSER>';
var username = '<DEPLOYUSERPASSWORD>';

/** WebJobConfigurations */
var jobConfigurations = [
    {name : '<WEBJOBNAME>', // this is the same name as the folder and as the final zip
        type: '<triggered/continuous>',
        main: '<WEBJOB ENTRY POINT>'        // file to be executed
    },
    {name : 'fake-webjob',
        type: 'continuous',
        main: 'execute.js'
    }
];

/** Global vars */
var protocol = 'https://';
var PLACEHOLDER = 'REPLACE';
var route = '/api/' + PLACEHOLDER + 'webjobs/'
var contentDisposition = 'attachement; filename=' + PLACEHOLDER;


/** Requires */
var AdmZip = require('adm-zip');
var fs = require('fs');
var path = require('path');
var request = require('request');
var https = require('https');


/** Create The Zip-s */
var zip = new AdmZip();
var webjobs = getDirectories('.');

console.log('----------------');
console.log('Zip creation:')
console.log('All subdirs: ' + webjobs);

for(var i=0; i<webjobs.length; i++){
    zip.addLocalFolder('./' + webjobs[i]);
    zip.writeZip(webjobs[i] + '.zip');
    console.log(webjobs[i] + '.zip created');
}

/** Upload the zips */
console.log('----------------');
console.log('Zip upload:');

for(var i=0; i<webjobs.length; i++) {

    console.log(webjobs[i] + ' processing');

    var conf = getConfiguration(webjobs[i]);
    if(conf) {
        var finalRoute = route.replace(PLACEHOLDER, conf.type) + webjobs[i];
        var options = {
            uri: protocol + domain + finalRoute,
            host: domain,
            port: 443,
            path: finalRoute,
            headers: {
                'Content-Type': 'application/zip',
                'Host': domain,
                'Content-Disposition': contentDisposition.replace(PLACEHOLDER,conf.main)
            }
        };

        console.log('option :' + JSON.stringify(options))
        var readStream = fs.createReadStream('./' + webjobs[i] + '.zip');

        readStream.on('open', function () {
            readStream.pipe(request
                .put(options)
                .auth(username, password, true)
                .on('response', function (response) {
                    console.log('Server res: ' + response.statusCode);
                    console.log('Server res: ' + JSON.stringify(response));
                }));
        });
    }else{
        console.log(webjobs[i] + ' skipped');
    }
}

console.log('----------------');
console.log('Completed');

/**
 * get the configuration for the webjob
 * @param webjobName
 * @returns {{name, type, main}|*}
 */
function getConfiguration(webjobName){
    for(var i = 0; i<jobConfigurations.length; i++){
        if (jobConfigurations[i].name ===  webjobName){
            return jobConfigurations[i];
        }
    }
    console.log(webjobName + ' configuration not found');
}

/**
 * get the subdirs
 * @param srcpath
 * @returns {*}
 */
function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
