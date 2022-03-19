import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { constants } from "http2";
import { buildResponse } from "./helpers/buildResponse";
import { errorResponse } from "./helpers/errorResponse";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    response = buildResponse(constants.HTTP_STATUS_OK, "pong");
  } catch (err: unknown) {
    response = errorResponse(err, context?.awsRequestId);
  }

  return response;
};
