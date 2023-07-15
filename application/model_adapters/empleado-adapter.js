const empleadoQuery = require("../../infraestructure/repositories/empleados-query");
const empleadoDto = require("../helpers/empleado-dto");

const findEmpleados = async () => {
  const data = await empleadoQuery.findEmpleados();
  return empleadoDto.getEmpleadosFromDBArray(data);
};

const findOneEmpleado = async (id) => {
  const data = await empleadoQuery.findOneEmpleado(id);
  return data === null || data.length === 0
    ? null
    : empleadoDto.getEmpleadoFromDBDto(data[0]);
};

const createEmpleado = async ({
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  fechaNacimiento,
  tipoIdentificacion,
  numeroIdentificacion,
  sueldo,
}) => {
  await empleadoQuery.createEmpleado(
    empleadoDto.getDBFromEmpleadoDto({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      tipoIdentificacion,
      numeroIdentificacion,
      sueldo,
    })
  );
};

const updateEmpleado = async (
  {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    fechaNacimiento,
    tipoIdentificacion,
    numeroIdentificacion,
    sueldo,
  },
  id
) => {
  await empleadoQuery.updateEmpleado(
    empleadoDto.getDBFromEmpleadoDto({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      fechaNacimiento,
      tipoIdentificacion,
      numeroIdentificacion,
      sueldo,
    }),
    id
  );
};

const deleteEmpleado = async (id) => {
  await empleadoQuery.deleteEmpleado(id);
};

module.exports = {
  findEmpleados,
  findOneEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
