# deployazurewebjobs-js
Script to deploy azure webjobs via node.js

Setup:
- Create a folder in your project (name it e.g. webjobs)
- Download the script deploy.js an put it in the webjobs dir
- Put all your webjobs in the webjobs dir
- Install all requirements:
      
npm install adm-zip --save
npm install request --save

- Edit the debug.js headers var:

/** Connection Configurations */
var domain = '<WEBSITENAME>.scm.azurewebsites.net';
var username = '<DEPLOYUSER>';
var password = '<DEPLOYUSERPASSWORD>';

/** WebJobConfigurations */
var jobConfigurations = [
    {name : '<WEBJOBNAME>', // this is the same name as the folder and as the final zip
        type: '<triggered/continuous>',
        main: '<WEBJOB ENTRY POINT e.g. "run.js">'        // file to be executed
    },
............
];

Note:
<DEPLOYUSER> && <DEPLOYUSERPASSWORD> are the credential you use for git deployment
The first time the webjob zip need to be uploaded using the azure portal.

Feel free to edit and improve the script.
Cheers from digitalx.
