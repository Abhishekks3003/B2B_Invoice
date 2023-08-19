const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: '127.0.0.1', // Replace with your MySQL server host
  user: 'host', // Replace with your MySQL username
  password: 'Soumyadip0@', // Replace with your MySQL password
  database: 'soumyadip', // Replace with your MySQL database name
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }

  console.log('Connected to the database');

  // Perform a SQL query
  const query = 'SELECT * FROM h2h_oap'; // Replace with your table name
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return;
    }

    console.log('Fetched data:');
    console.log(results);

    // Close the connection
    connection.end((error) => {
      if (error) {
        console.error('Error closing the database connection:', error);
      } else {
        console.log('Connection closed');
      }
    });
  });
});
