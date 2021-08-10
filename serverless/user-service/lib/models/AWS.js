
const AwsSdk = require('aws-sdk');


let instance = null;
class AWS {
  static getInstance() {
    if (instance === null) instance = new AWS();
    return instance;
  }

  get documentClient() {
    if (!this.docClient)
      this.docClient = new AwsSdk.DynamoDB.DocumentClient({region:"ap-south-1", endpoint: 'http://localhost:8000'});

    return this.docClient;
  }
}


module.exports=new AWS()