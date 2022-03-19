import { APIGatewayProxyResult } from "aws-lambda";
import { constants } from "http2";
import { GENERIC_INTERNAL_ERROR, UNKNOWN_ERROR } from "../constants";
import { errorResponse } from "./errorResponse";

const TEST_ERROR = new Error("Test error message");
const TEST_REQ_ID = "00000000-0000-0000-0000-000000000000";

describe("Error response", () => {
  it("should return detailed error", async () => {
    process.env.STAGE = "dev";

    const response: APIGatewayProxyResult = errorResponse(
      TEST_ERROR,
      TEST_REQ_ID
    );

    expect(response.statusCode).toBe(
      constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    );
    expect(response.body).toBe(
      JSON.stringify(
        {
          error: TEST_ERROR.name,
          errorMessage: TEST_ERROR.message,
          requestId: TEST_REQ_ID,
        },
        null,
        2
      )
    );
    expect(response).toMatchSnapshot();
  });

  it("should handle undefined error", async () => {
    process.env.STAGE = "dev";

    const response: APIGatewayProxyResult = errorResponse(
      undefined,
      TEST_REQ_ID
    );

    expect(response.statusCode).toBe(
      constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    );
    expect(response.body).toBe(
      JSON.stringify(
        {
          error: UNKNOWN_ERROR.name,
          errorMessage: UNKNOWN_ERROR.message,
          requestId: TEST_REQ_ID,
        },
        null,
        2
      )
    );
    expect(response).toMatchSnapshot();
  });

  it("should obfuscate error details in production", async () => {
    process.env.STAGE = "prod";

    const response: APIGatewayProxyResult = errorResponse(
      TEST_ERROR,
      TEST_REQ_ID
    );

    expect(response.statusCode).toBe(
      constants.HTTP_STATUS_INTERNAL_SERVER_ERROR
    );
    expect(response.body).toBe(
      JSON.stringify(
        {
          error: GENERIC_INTERNAL_ERROR.name,
          errorMessage: GENERIC_INTERNAL_ERROR.message,
          requestId: TEST_REQ_ID,
        },
        null,
        2
      )
    );
    expect(response).toMatchSnapshot();
  });
});
