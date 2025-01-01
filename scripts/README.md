# Helper scripts to help with Building a Backend Application for Epic

## Generating Private and Public Keys for Epic using openSSL:

Generate the Private Key:

```
openssl genrsa -out ./privatekey.pem 2048
```

Generate the Public Key from the Private Key:

```
openssl req -new -x509 -key ./privatekey.pem -out ./publickey509.pem -subj '/CN=myapp'
```

You can also Reference `1_manual_keys.sh`. Upload the `publickey509.pem` to Epic while creating an app.

### Generating Private and Public Keys using NodeJS

```
npm install
```

```
node 2_generate_keys.js     //PS C:\Users\mshlc\Documents\MshlBackEndApp\scripts>
This will generate a `keys.json` file. Keep it safe and secure. This will be needed for the next step.


### SGenerate Public Keys to localhost:3000
node 3_serve_keys.js      //PS C:\Users\mshlc\Documents\MshlBackEndApp\scripts>   


Expose to the public using Ngrok or Cloudflare Tunnels
ngrok tunnel --label edge=edghts_2qufkE1obnI9MR9ncFzwTOBh1dt http://localhost:3000  ///MshlBackEndApp```

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


### Run a Development SMTP Server

```
docker run -p 1080:1080 -p 1025:1025 maildev/maildev
```

Browse the Web UI on 1080.


### Send a test email

Use the SMTP server on localhost:1025

```
node scripts\5_send_test_email.js
```

Check the email show up on http://localhost:1080


