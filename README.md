# CiCuLater


# Key Technologies

[Node JS](https://nodejs.org/en/)
[AWS](https://aws.amazon.com/)
[AUTH0](https://auth0.com/)

# Getting started

Clone the repository with `git clone http://endpoint....`

Run `npm i` from the root of the project

Run `sam deploy ./resources/CiCulater.yaml --parameter-overrides SSHKeyName = 'secureserverkey'` where the secureserverkey value should be replaced with whatever EC2 SSH key is setup.

After deployment ssh into the server, you can read about how to do this via the EC2 console. 

Fill in the secrets within the configuration these can be found on[ AUTH0](https://auth0.com/) under the API which needs to be created, (Search for `FILL ME`)

Run `node ./src/secureCIAPI/index.js` to start the server

The following HTTP verbs are configured

`GET`
`POST`
`PUT`
`DELETE`


By default the server starts on localhost:1336

# Documentation

I followed this [guild](https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/) while creating this endpoint, and did not configure the mongodb


# TODOS

Testing 