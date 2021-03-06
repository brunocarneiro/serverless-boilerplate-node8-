# Serverless Boilerplate Project with Node 8

ESLint Airbnb

Tests setup with one sample

Config setup

Coverage Setup

Build and Release scripts

Simple service example

serverless.yml (with stage support)

Local test support (Serverless Offline and DynamoDB)

### Requirements

- [Configure your AWS CLI](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

### Installation

Clone the project.

```bash
$ git clone --url https://github.com/civicteam/serverless-boilerplate-node8 --name my-project
```

Enter the new directory

```bash
$ cd my-project
```

Install the Node.js packages

```bash
$ npm install
```

If you haven't installed Serverless CLI before, do it by running:

```bash
$ npm install -g serverless
```

Install the DynamoDB Local

```bash
$ serverless dynamodb install
```

### Usage

To run unit tests on your local

```bash
$ npm run test
```

To run a function on your local

```bash
$ serverless invoke local --function hello
```

Add DynamoDB Resource definitions to your Serverless configuration, as defined [here](https://serverless.com/framework/docs/providers/aws/guide/resources/#configuration) 

### AWS::DynamoDB::Table Resource Template for serverless.yml
```yml
resources:
  Resources:
    usersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: usersTable
        AttributeDefinitions:
          - AttributeName: email
            AttributeType: S
        KeySchema:
          - AttributeName: email
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
```

You can either start DynamoDB locally yourself:

```bash
$ sls dynamodb start
```

Or configure to start it by serverless

```yaml
custom:
  dynamodb:
    start:
      port: 8000
      inMemory: true
      migrate: true
      seed: true
    # Uncomment only if you already have a DynamoDB running locally
    # noStart: true
```


To simulate API Gateway locally using [serverless-offline](https://github.com/dherault/serverless-offline)

```bash
$ serverless offline start
```

Run your tests

```bash
$ npm test
```

We use Jest to run our tests. You can read more about setting up your tests [here](https://facebook.github.io/jest/docs/en/getting-started.html#content).

Deploy your project

```bash
$ sls deploy
```

Deploy a single function

```bash
$ sls deploy function --function hello
```

To add another function as a new file to your project, simply add the new file and add the reference to `serverless.yml`. The `webpack.config.js` automatically handles functions in different files.

To add environment variables to your project

1. Rename `env.example` to `env.yml`.
2. Add environment variables for the various stages to `env.yml`.
3. Uncomment `environment: ${file(env.yml):${self:provider.stage}}` in the `serverless.yml`.
4. Make sure to not commit your `env.yml`.

### Configuring your permissions in AWS

[Policy Generator](https://github.com/dancrumb/generator-serverless-policy)

Remember the best practice on production enviroment:
[IAM Permissions](https://serverless.com/blog/abcs-of-iam-permissions/)

```
Fast but risky (aka YOLO): The fastest way to get started with Serverless 
is to create an IAM user with Administrator Access. This IAM user will have 
full access to your AWS account and should not be used for your 
company's production"
```

