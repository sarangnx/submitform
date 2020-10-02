# Submit Form

A google cloud function with http trigger, that is used
to recieve data from srng.dev contact form and send it to
my email using AWS SES.

```bash
# install dependencies
yarn

# run in local machine
yarn dev
# This exposes an api endpoint http://localhost:8080
```

I used `humao.rest-client` VSCode Extension for sending requests.

```bash
# Example Request
POST http://localhost:8080 HTTP/1.1
content-type: application/json

{
    "name": "Sarang N",
    "email": "me@srng.dev",
    "message": "Test Message"
}
```

## AWS Config

To use AWS SES, create a user with SES permissions, and generate
Access key.

There are multiple ways to authenticate AWS SDK. The one I chose
here uses environment variables and authenticates automatically.

```bash
# These two keys need to be available in process.env
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```
