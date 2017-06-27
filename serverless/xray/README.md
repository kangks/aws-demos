# AWS serverless demo

Quick setup of a API gateway with Lambda, exposing GET/PUT/DELETE with DynamoDB backed. The flow will be captured in AWS X-Ray to show latency from Lambda to DynamoDB

1. Clone or download
2. go into app/ folder
3. run `npm install --save`
4. go to parent folder where app.yml is located
5. create the stack
```
S3_BUCKET_NAME=<your s3 bucket to store the codes> aws s3 mb s3://${S3_BUCKET_NAME} && \
aws cloudformation package --template-file ./app.yml --s3-bucket ${S3_BUCKET_NAME} --output-template-file app-postPackage.yml && \
aws cloudformation deploy --template-file app-postPackage.yml --stack-name xray-test --capabilities CAPABILITY_IAM
```
6. Activate the TracingConfig with this command
`aws lambda invoke --function-name EnableXrayFunction`

7. Access the Restful endpoint. You need a AWS Signature clients such as [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
