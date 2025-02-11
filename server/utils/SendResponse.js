
const sendRespone = (res, data) => {
  res.status(data?.statusCode).json({
    succcess: data?.success,
    message: data?.message,
    data: data?.data,
    statusCode: data?.statusCode,
  });
};

export default sendRespone;
