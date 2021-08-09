import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

type SingleTableGlobalSecondaryIndex = Omit<
  dynamodb.GlobalSecondaryIndexProps,
  "indexName" | "partitionKey" | "sortKey"
>;

export interface ConstructSingleTableDynamoProps extends cdk.StackProps {
  tableProps: Omit<dynamodb.TableProps, "partitionKey" | "sortKey">;
  GSI1Props?: SingleTableGlobalSecondaryIndex;
  GSI2Props?: SingleTableGlobalSecondaryIndex;
}

export class ConstructSingleTableDynamo extends cdk.Construct {
  public readonly dynamoTable: dynamodb.Table;

  constructor(
    scope: cdk.Construct,
    id: string,
    props?: ConstructSingleTableDynamoProps
  ) {
    super(scope, id);

    this.dynamoTable = new dynamodb.Table(this, `SingleTable`, {
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.tableProps,
    });

    this.dynamoTable.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: {
        name: "GSI1PK",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "GSI1SK",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.GSI1Props,
    });

    this.dynamoTable.addGlobalSecondaryIndex({
      indexName: "GSI2",
      partitionKey: {
        name: "GSI2PK",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "GSI2SK",
        type: dynamodb.AttributeType.STRING,
      },
      readCapacity: 1,
      writeCapacity: 1,
      ...props?.GSI2Props,
    });
  }
}
