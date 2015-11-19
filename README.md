# deployazurewebjobs-js
<h1>Script to deploy azure webjobs via node.js</h1>

<h2>Setup:</h2>
- Create a folder in your project (name it e.g. webjobs)
- Download the script deploy.js an put it in the webjobs dir
- Put all your webjobs in the webjobs dir
- Install all requirements:
      
<p><i>npm install adm-zip --save</i></p>
<p><i>npm install request --save</i></p>

- Edit the debug.js headers var:

/** Connection Configurations */
var domain = '<b><WEBSITENAME></b>.scm.azurewebsites.net';
var username = '<b><DEPLOYUSER></b>';
var password = '<b><DEPLOYUSERPASSWORD></b>';

/** WebJobConfigurations */
var jobConfigurations = [
    {name : '<b><WEBJOBNAME></b>', // this is the same name as the folder and as the final zip
        type: '<b><triggered/continuous></b>',
        main: '<b><WEBJOB ENTRY POINT e.g. "run.js"></b>'        // file to be executed
    },
............
];

Note:
<DEPLOYUSER> && <DEPLOYUSERPASSWORD> are the credential you use for git deployment
The first time the webjob zip need to be uploaded using the azure portal.

Feel free to edit and improve the script.
<i>Cheers from digitalx.</i>
