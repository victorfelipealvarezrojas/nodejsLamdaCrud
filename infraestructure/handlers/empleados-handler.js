"use strict";
const responseHttp = require("../helpers/response");
const {
  getEmpleadosController,
  getEmpleadosDetalleController,
  postEmpleadosController,
  putEmpleadosController,
  deleteEmpleadosController,
} = require("../../application/controllers/empleados-controller");

module.exports.getEmpleados = async (event) => {
  const response = await getEmpleadosController();
  return responseHttp({ ...response });
};

module.exports.postEmpleados = async (event) => {
  try {
    const response = await postEmpleadosController(JSON.parse(event.body));
    return responseHttp({ ...response });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

module.exports.putEmpleado = async (event) => {
  console.log("data", event);
  const response = await putEmpleadosController(
    JSON.parse(event.body),
    event.pathParameters.id
  );
  return responseHttp({ ...response });
};

module.exports.deleteEmpleado = async (event) => {
  const response = await deleteEmpleadosController(event.pathParameters.id);
  return responseHttp({ ...response });
};

module.exports.getEmpleadoDetalle = async (event) => {
  const response = await getEmpleadosDetalleController(event.pathParameters.id);
  return responseHttp({ ...response });
};
