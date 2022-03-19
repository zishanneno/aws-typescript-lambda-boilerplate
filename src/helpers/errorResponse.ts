import { APIGatewayProxyResult } from "aws-lambda";
import { constants } from "http2";
import { GENERIC_INTERNAL_ERROR, UNKNOWN_ERROR } from "../constants";
import { buildResponse } from "./buildResponse";

export const errorResponse = (
  err: unknown,
  requestId: string
): APIGatewayProxyResult => {
  console.error(err);
  return buildResponse(
    constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    undefined,
    process.env.STAGE === "dev"
      ? err instanceof Error
        ? err
        : UNKNOWN_ERROR
      : GENERIC_INTERNAL_ERROR,
    requestId
  );
};
