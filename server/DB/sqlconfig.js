const config = {
    user: 'Exam',
    password: 'pass',
    server: 'MSI',
    database: 'Examen',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'MARTENSQL_EXPRES'
    },
    port: 1433
}

module.exports = config;
