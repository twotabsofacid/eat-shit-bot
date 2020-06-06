# eat-shit-bot
> Lmao

This is a twitter bot to retweet people who use a certain phrase. Currently, that phrase is "eat shit". 

### How it works

You can adjust the phrase being searched for by changing the the variable `phrase`

Arrays of `disallowedLeadWords` and `disallowedFollowWords` can be passed as options which can prevent unwanted retweets of the phrase (for example, to prevent <em>"eat shit out there"</em> from being retweeted, you could add the string "out" to `options.disallowedFollowWords`)

These variables are located in `app.js`

To run, you need to create a `credentials.js` file, similar to the `credentials.example.js` file but with actual twitter credentials in it. Then, just:


```
$ node app.js
```

and your twitter bot should run.

### In the wild

[Check it out on Twitter](https://twitter.com/chug_soylent)


### On a server

To run this on a server (I'm running on digital ocean), there's two ways you can do this. You can daemonize the process manually, or you can use `pm2` to do this for you.

#### pm2

Install pm2 with

```
npm install -g pm2
```

Then `cd` to the directory where you've placed this app, and run `pm2 start app.js`. You can find more details for how to use `pm2` [here](http://pm2.keymetrics.io/).

#### Manually daemonize

To manually daemonize the process, do `$ cd /etc/systemd/system`. You'll be using `systemd`. Create a `.service` file, like `eatshitbot.service`. This should look something like this:

```
[Unit]
Description=Job that runs the twitter eat shit bot

[Service]
Type=simple
ExecStart=/usr/bin/nodejs /root/whatever/eat-shit-bot/app.js

[Install]
WantedBy=network-online.target
```

After creating that file, you'll need to reload, `$ systemctl daemon-reload`, and then start the daemon: `$ systemctl start eatshitbot` (or enable it, which will have it always run even if you exit out of ssh: `$ systemctl enable eatshitbot.service`).

To make sure this is working, do `$ systemctl status eatshitbot.service`. You can restart the service by doing `$ systemctl restart eatshitbot.service`.

Here's [a cheatsheet](http://www.ethicalhackx.com/systemd-cheat-sheet-linux/).
