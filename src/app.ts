let response;

export const lambdaHandler = async (event: any, context: any) => {
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "pong",
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
