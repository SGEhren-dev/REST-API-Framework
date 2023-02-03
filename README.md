# REST-API-Framework
REST API Framework in Typescript with Express

## Usage
Get started by cloning the repository
```
git clone https://github.com/SGEhren-dev/REST-API-Framework.git
```

Then run
```
npm install
```

## Developing
Once the repository has been cloned, in the routes and models folders under 'src' is where your development process will start. There
is also a middleware folder for all of the middleware that you use in your project

## Contributing
If you would like to contribute and add to this repository, feel free to make a pull request and I will take a look at it. There is currently a linter installed
and all of the code that is contributed needs to follow those linting rules.

## Secrets and Salts
Currently under the scripts folder, there are two scripts for generating new secrets and salts. You can run each of these by running
```
node scripts/salt_generator.js
node scripts/secret_generator.js
```
Once the scripts are complete, you can find the generated data in the config file under *config/default.json*

## Licence
This framework is open-sourced software licensed under the MIT license.
