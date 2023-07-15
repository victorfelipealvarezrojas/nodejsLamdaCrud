const db = require("knex")({
  client: "mysql",
  connection: {
    host: "emp.chxyb2z5vekx.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin_dev",
    password: "BpVZ2WTV0T3cw+cWCxjcvPdX6iT/UYTI7S1tJTI4",
    database: "empleados_dev",
  },
});

module.exports = { db };
