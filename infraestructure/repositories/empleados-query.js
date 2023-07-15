const { db } = require("./connection");
const TableName = "empleados";

const data = [
  {
    id: 1,
    primer_nombre: "José",
    segundo_nombre: "Felix",
    primer_apellido: "Ribas",
    segundo_apellido: "Caldera",
    fecha_nacimiento: new Date("2000-01-20"),
    tipo_identificacion: "cc",
    numero_identificacion: "3131588",
    sueldo: 2000.0,
  },
  {
    id: 2,
    primer_nombre: "Kelvin",
    segundo_nombre: "Rafael",
    primer_apellido: "Mosquera",
    segundo_apellido: "Betancourt",
    fecha_nacimiento: new Date("197-06-20"),
    tipo_identificacion: "nit",
    numero_identificacion: "66654847",
    sueldo: 3000.0,
  },
];

const findEmpleados = async () => {
  return db.select().from(TableName);
};

const findOneEmpleado = async (id) => {
  return await db.select().from(TableName).where({ id: id });
};

const createEmpleado = async ({
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  fecha_nacimiento,
  tipo_identificacion,
  numero_identificacion,
  sueldo,
}) => {
  await db(TableName).insert({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    tipo_identificacion,
    numero_identificacion,
    sueldo,
  });
};

const updateEmpleado = async (
  {
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    tipo_identificacion,
    numero_identificacion,
    sueldo,
  },
  id
) => {
  return db(TableName).where({ id: id }).update({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    tipo_identificacion,
    numero_identificacion,
    sueldo,
  });
};

const deleteEmpleado = async (id) => {
  return db(TableName).where({ id: id }).del();
};

module.exports = {
  findEmpleados,
  findOneEmpleado,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
};
