import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { Cred, Property, Target } from "./types";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const get = async (key: string, keyValue: string, tableName: string) => {
  console.log("get", key, keyValue, tableName);
  let res;
  try {
    res = await client.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          [key]: keyValue,
        },
      })
    );
  } catch (error) {
    console.log("Error", error);
  }
  console.log("Item", res);
  return res?.Item;
};

const getItem = async <T extends Record<string, any>>(
  tableName: string,
  idObj: T
) => {
  // console.log("getItem", tableName, idObj);

  const command = new GetCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("getItem", command);

  const data = await client.send(command);
  // // console.log("getItem data", data);

  if (!data.Item) return null;
  return data.Item;
};

const createItem = async (
  tableName: string,
  item: any
): Promise<responseType> => {
  // console.log("createItem...");
  const command = new PutCommand({
    TableName: tableName,
    Item: item,
  });

  try {
    await client.send(command);
  } catch (error) {
    console.log("createItem error", error);
    return { isSuccess: false, msg: "error" };
  }

  return { isSuccess: true, msg: "ok" };
};

const deleteItem = async (
  tableName: string,
  idObj: any
): Promise<responseType> => {
  // console.log("deleteItem", tableName, idObj);

  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("deleteItem", command);
  try {
    await client.send(command);
  } catch (error) {
    return { isSuccess: false, msg: "error" };
  }
  // console.log("geleteItem data", data);

  return { isSuccess: true, msg: "deleted" };
};

const queryItems = async (
  tableName: string,
  indexName: string,
  valueKey: string,
  value: string | number | boolean,
  limit?: number,
  lastEvaluatedKey?: any
): Promise<{ items: any[] | null; lastEvaluatedKey?: any }> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: `${valueKey} = :valueKey`,
      ExpressionAttributeValues: {
        ":valueKey": value,
      },
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    });
    // console.log("queryItems command", command);
    const data = await client.send(command);

    if (!data.Items) return { items: null };
    return { items: data.Items, lastEvaluatedKey: data.LastEvaluatedKey };
  } catch (error) {
    console.log("getNItems error", error);
    return { items: null };
  }
};

type createType = Cred;
type returnCreateType =
  | { data: createType; status: "ok" }
  | { error: string; status: "error" };
const create = async (
  data: createType,
  tableName: string
): Promise<returnCreateType> => {
  try {
    await client.send(
      new PutCommand({
        TableName: tableName,
        Item: data,
      })
    );
    return { data, status: "ok" };
  } catch (error) {
    console.log("Error", error);
    return { error: JSON.stringify(error) || "Error", status: "error" };
  }
};
type responseType = {
  isSuccess: boolean;
  msg: string;
};

const db = {
  cred: {
    get: async (email: string): Promise<Cred | undefined> => {
      return get("email", email, Resource.Credentials.name) as Promise<Cred>;
    },
    create: async (data: Cred) => {
      return create(data, Resource.Credentials.name);
    },
  },
  target: {
    getAll: async (userId: string): Promise<Target[]> => {
      const rep = (await queryItems(
        Resource.Targets.name,
        "UserIndex",
        "userId",
        userId
      )) as {
        items: Target[];
      };
      return rep.items;
    },
    create: async (rep: Target): Promise<responseType> => {
      const response = await createItem(Resource.Targets.name, rep);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (targetId: string): Promise<Target | null> => {
      const rep = (await getItem(Resource.Targets.name, {
        targetId,
      })) as Target;
      return rep;
    },
    delete: async (targetId: string) => {
      await deleteItem(Resource.Targets.name, {
        targetId,
      });
    },
  },
  props: {
    getAll: async (region: string): Promise<Property[]> => {
      const rep = (await queryItems(
        Resource.Properties.name,
        "RegionIndex",
        "region",
        region
      )) as {
        items: Property[];
      };
      return rep.items;
    },
    create: async (rep: Property): Promise<responseType> => {
      const response = await createItem(Resource.Properties.name, rep);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (propertyId: string): Promise<Property | null> => {
      const rep = (await getItem(Resource.Properties.name, {
        propertyId,
      })) as Property;
      return rep;
    },
    delete: async (propertyId: string) => {
      await deleteItem(Resource.Properties.name, {
        propertyId,
      });
    },
  },
};

export default db;
