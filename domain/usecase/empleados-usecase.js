const empleadoAdapter = require("../../application/model_adapters/empleado-adapter");
const { HttpError } = require("../../application/exceptions/http-error");
const { StatusCodes } = require("http-status-codes");

const getEmpleados = async () => {
  return await empleadoAdapter.findEmpleados();
};

const getDetailEmpleado = async (id) => {
  const emp = await empleadoAdapter.findOneEmpleado(id);

  if (emp == null)
    throw new HttpError("Empleado no encontrado", StatusCodes.NOT_FOUND);

  console.log("Empleado no encontrado", emp);

  return emp;
};

const createEmpleado = async (empleadoData) => {
  const fechaNacimiento = new Date(empleadoData.fechaNacimiento);
  const toDay = new Date();

  if (fechaNacimiento > toDay)
    throw new HttpError(
      "Fecha de nacimiento incorrecta",
      StatusCodes.BAD_REQUEST
    );

  await empleadoAdapter.createEmpleado(empleadoData);
};

const updateEmpleado = async (empleadoData, id) => {
  const fechaNacimiento = new Date(empleadoData.fechaNacimiento);
  const toDay = new Date();

  const emp = await empleadoAdapter.findOneEmpleado(id);
  if (emp === null)
    throw new HttpError("Empleado no encontrado", StatusCodes.NOT_FOUND);

  if (fechaNacimiento > toDay)
    throw new HttpError(
      "Fecha de nacimiento incorrecta",
      StatusCodes.BAD_REQUEST
    );

  await empleadoAdapter.updateEmpleado(empleadoData, id);
};

const deleteEmpleado = async (id) => {
  const emp = await empleadoAdapter.findOneEmpleado(id);
  if (emp === null)
    throw new HttpError("Empleado no encontrado", StatusCodes.NOT_FOUND);

  await empleadoAdapter.deleteEmpleado(id);
};

module.exports = {
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getDetailEmpleado,
};
