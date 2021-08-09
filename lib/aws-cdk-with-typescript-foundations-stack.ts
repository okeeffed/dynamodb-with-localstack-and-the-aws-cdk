import * as cdk from "@aws-cdk/core";
import { ConstructSingleTableDynamo } from "./construct-single-table-dynamo";

export class AwsCdkWithTypescriptFoundationsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new ConstructSingleTableDynamo(this, "MyFirstTable", {
      tableProps: {
        tableName: "my-first-table",
      },
    });
  }
}
