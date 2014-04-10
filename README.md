#Lumosity                                                                                                               
> Lumosity demo done in famo.us.

##Dependencies
First make sure you have node.js, grunt-cli, and bower installed.

```
brew install node
npm install -g grunt-cli bower
```

If you are installing node for the fist time you will most likely need to add npm to your path

```
$ export PATH="/usr/local/share/npm/bin:$PATH"
```

You will probably want to add that to you .bash_profile.  I'll assume if you are using any other shell that you know what you are doing already :P

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve --force``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

The use of the ```--force``` flag is just to bypass the linting - for the moment, until I get around to cleaning things up. 

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

