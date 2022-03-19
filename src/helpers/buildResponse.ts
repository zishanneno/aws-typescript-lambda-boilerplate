import { APIGatewayProxyResult } from "aws-lambda";

export const buildResponse = (
  statusCode: number,
  message?: string,
  error?: Error,
  requestId?: string
): APIGatewayProxyResult => {
  return {
    isBase64Encoded: false,
    statusCode: statusCode,
    body: JSON.stringify(
      {
        ...(message && { message: message }),
        ...(error && { error: error.name, errorMessage: error.message }),
        ...(requestId && { requestId: requestId }),
      },
      null,
      2
    ),
    headers: { "Content-Type": "application/json" },
  };
};
