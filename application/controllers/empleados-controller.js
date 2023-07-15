const { responseSuccess, responseFail } = require("../helpers/response");
const empleadoUseCase = require("../../domain/usecase/empleados-usecase");
const { StatusCodes } = require("http-status-codes");

function createDataClosure() {
  let data = {
    1: {
      id: 1,
      primerNombre: "José",
      segundoNombre: "Felix",
      primerApellido: "Ribas",
      segundoApellido: "Caldera",
      fechaNacimiento: new Date("2000-01-20"),
      tipoIdentificacion: "cc",
      numeroIdentificacion: "3131588",
      sueldo: 2000.0,
    },
    2: {
      id: 2,
      primerNombre: "Kelvin",
      segundoNombre: "Rafael",
      primerApellido: "Mosquera",
      segundoApellido: "Betancourt",
      fechaNacimiento: new Date("197-06-20"),
      tipoIdentificacion: "nit",
      numeroIdentificacion: "66654847",
      sueldo: 3000.0,
    },
  };

  return {
    getData: function () {
      return data;
    },
    getDataById: function (id) {
      if (!data[id]) throw new Error("Empleado no encontrado");
      return data[id];
    },
    addElement: function (newElement) {
      const id = Object.keys(data).length + 1;
      data[id] = newElement;
    },
    updateElement: function (newElement, id) {
      if (!data[id]) throw new Error("Empleado no encontrado");
      data[id] = newElement;
    },
    deleteElement: function (id) {
      if (!data[id]) throw new Error("Empleado no encontrado");
      delete data[id];
    },
  };
}

const dataClosure = createDataClosure();

const getEmpleadosController = async () => {
  try {
    const dataResult = await empleadoUseCase.getEmpleados();
    return responseSuccess({ data: dataResult }, StatusCodes.OK);
  } catch (error) {
    return responseFail(error.message);
  }
};

const getEmpleadosDetalleController = async (id) => {
  try {
    const empleado = await empleadoUseCase.getDetailEmpleado(id);
    response = responseSuccess({ data: empleado }, StatusCodes.OK);
  } catch (error) {
    response = responseFail(error);
  }
  return response;
};

/**
 * Crea un nuevo empleado.
 *
 * @param {Object} empleado - Objeto que contiene la información del empleado a crear.
 * @returns {Object} - Objeto de respuesta que indica el resultado de la operación.
 */
const postEmpleadosController = async (empleado) => {
  try {
    await empleadoUseCase.createEmpleado(empleado);
    return responseSuccess(
      { message: "Empleado creado exitosamente" },
      StatusCodes.CREATED
    );
  } catch (error) {
    return responseFail(error);
  }
};

const putEmpleadosController = async (empleado, id) => {
  try {
    const dataResult = await empleadoUseCase.updateEmpleado(empleado, id);
    return responseSuccess(
      {
        data: dataResult,
        message: "Empleado actualizado exitosamente",
      },
      StatusCodes.OK
    );
  } catch (error) {
    return responseFail(error);
  }
};

const deleteEmpleadosController = async (id) => {
  try {
    const dataResult = await empleadoUseCase.deleteEmpleado(id);
    return responseSuccess(
      {
        data: dataResult,
        message: "Empleado eliminado",
      },
      StatusCodes.OK
    );
  } catch (error) {
    return responseFail(error);
  }
};

module.exports = {
  getEmpleadosController,
  postEmpleadosController,
  putEmpleadosController,
  deleteEmpleadosController,
  getEmpleadosDetalleController,
};
