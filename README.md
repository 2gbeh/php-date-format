# php-date-format

`npm i @etugbeh/php-date-format`

const date = require('@etugbeh/php-date-format')

// https://www.w3schools.com/php/func_date_date_format.asp
console.log(
  // Jan 6, 2024 
  date(),  
  
  // Tue, Sep 15, 1992
  date("1992-09-15", "D, M j, Y")
);

 
 