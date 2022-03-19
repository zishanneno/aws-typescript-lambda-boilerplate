import { APIGatewayProxyResult } from "aws-lambda";
import { constants } from "http2";
import { buildResponse } from "./buildResponse";

describe("Response builder", () => {
  it("should build a response", async () => {
    const message = "Test";

    const response: APIGatewayProxyResult = buildResponse(
      constants.HTTP_STATUS_OK,
      message
    );

    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK);
    expect(response.body).toBe(
      JSON.stringify(
        {
          message: message,
        },
        null,
        2
      )
    );
    expect(response.isBase64Encoded).toBe(false);
    expect(response.headers).toEqual({ "Content-Type": "application/json" });
    expect(response).toMatchSnapshot();
  });
});
