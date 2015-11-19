# deployazurewebjobs-js
<h1>Script to deploy azure webjobs via node.js</h1>

<h2>Setup:</h2>
- Create a folder in your project (name it e.g. webjobs)
- Download the script deploy.js an put it in the webjobs folder
- Put all your webjobs (folders) in the webjobs folder
- Install all requirements:
      
<p><i>npm install adm-zip --save</i></p>
<p><i>npm install request --save</i></p>

- Edit the debug.js headers var:

<pre>
/** Connection Configurations */
var domain = '&lt;WEBSITENAME&gt;.scm.azurewebsites.net';
var username = '&lt;DEPLOYUSER&gt;';
var password = '&lt;DEPLOYUSERPASSWORD&gt;';


/** WebJobConfigurations */

var jobConfigurations = [
    {name : '&lt;WEBJOBNAME&gt;', // this is the same name as the folder and as the final zip
        type: '&lt;triggered/continuous&gt;',
        main: '&lt;WEBJOB ENTRY POINT e.g. "run.js"&gt;'        // file to be executed
    },
............
];
</pre>
Note:
&lt;DEPLOYUSER&gt; && &lt;DEPLOYUSERPASSWORD&gt; are the credential you use for git deployment
The first time the webjob zip need to be uploaded using the azure portal.

Feel free to edit and improve the script.
<i>Cheers from digitalx.</i>
