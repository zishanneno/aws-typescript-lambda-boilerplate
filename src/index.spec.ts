import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { constants } from "http2";
import { lambdaHandler } from ".";

const handler = jest.requireActual(".");
const buildResponse = jest.requireActual("./helpers/buildResponse.ts");
const errorResponse = jest.requireActual("./helpers/errorResponse.ts");

let mockEvent: APIGatewayProxyEvent;
let mockContext: Context;
let mockResponse: APIGatewayProxyResult;

describe("Lambda handler", () => {
  beforeEach(() => {
    mockResponse = {
      body: JSON.stringify({ message: "pong" }, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
      isBase64Encoded: false,
      statusCode: constants.HTTP_STATUS_OK,
    };
    jest.clearAllMocks();
  });

  it("should return a success response", async () => {
    const spy = jest.spyOn(handler, "lambdaHandler");
    const response: APIGatewayProxyResult = await lambdaHandler(
      mockEvent,
      mockContext
    );

    expect(spy).toBeCalledTimes(1);
    expect(response.body).toBe(mockResponse.body);
    expect(response.statusCode).toBe(mockResponse.statusCode);
    expect(response).toMatchSnapshot();
  });

  it("should return an error response", async () => {
    const spy = jest.spyOn(handler, "lambdaHandler");
    const buildResponseSpy = jest
      .spyOn(buildResponse, "buildResponse")
      .mockImplementationOnce(() => {
        throw Error("err");
      });
    const errorResponseSpy = jest
      .spyOn(errorResponse, "errorResponse")
      .mockImplementation(() => null);
    const response: APIGatewayProxyResult = await lambdaHandler(
      mockEvent,
      mockContext
    );

    expect(spy).toBeCalledTimes(1);
    expect(errorResponseSpy).toBeCalledTimes(1);
    expect(buildResponseSpy).toBeCalledTimes(1);
    expect(response).toMatchSnapshot();
  });
});
