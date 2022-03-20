# AWS Typescripted Lambda Boilerplate

![GitHub](https://img.shields.io/github/license/zishanneno/aws-typescript-lambda-boilerplate) ![CircleCI](https://img.shields.io/circleci/build/github/zishanneno/aws-typescript-lambda-boilerplate/main) ![Codecov branch](https://img.shields.io/codecov/c/github/zishanneno/aws-typescript-lambda-boilerplate/main?token=VMXEW5DBRN)

## :information_desk_person: What is this?

This repository contains boilerplate code for quickly getting started with developing and testing an AWS lambda locally using TypeScript, transpiling and bundling your source and modules into a single file, and performing a guided deployment using [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) (Serverless Application Model).

## :rocket: Getting Started

- Install [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Install the dependencies by running `yarn`
- If you prefer using `npm` instead, make sure to update `package.json` scripts.

Once set up, make sure that you have Docker running. You do not need to run any containers manually.

## :computer: Commands

- `yarn dev`

  - Creates a local HTTP server in Docker to run your serverless application locally
  - Cleans `dist` and `.aws-sam` directory (if either exist)
  - Bundles your code in `src` and outputs to `dist`
  - Starts watching for changes in
  - In your browser or any REST API client, a GET request to http://localhost:3000/ping will invoke the lambda.

- `yarn build`

  - Cleans `dist` and `.aws-sam` directory (if either exist)
  - Bundles and minifies your code in `src` and outputs to `dist`
  - At this point you may zip and upload the contents of the `dist` directory to your lambda manually.

- `yarn sam:build`

  - Performs `yarn build` and then also builds the lambda function into `.aws-sam` directory along with CloudFormation template that can be used for manual deployment.

- `yarn deploy`

  - Builds the lambda and CloudFormation template using `sam:build` script, and and walks you through a guided deployment.

- `yarn test`
  - Runs testing of code, compares snapshots, and outputs test coverage.

## :information_source: Further Info

The `template.yaml` file in the `config` directory can be configured to modify your lambda handler, path etc, and is used to build the CloudFormation template when performing a guided deployment using `yarn deploy`.

In order to get readable stack traces in CloudWatch, add `NODE_OPTIONS=--enable-source-maps` to your lambda function's environment variables.

For going into production, you may want to use `--sources-content=false` option in the `build` script so that source map output to CloudWatch is minimal and only shows references your source code (for example `src/index.ts:8:9`) instead of throwing complete stack traces.

Why or what is `rimraf` package? Because everybody ain't using \*nix. :smile:

## :sparkles: Coming up

- Boilerplate code for other resources such as AWS Secrets Manager, S3, DynamoDB etc.
