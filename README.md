# php-date-format

A node package for formatting dates in JavaScript using PHP syntax.

- No dependencies package
- No TypeScript support (yet)
- Use CommonJS import syntax

## Installation

```sh
npm install @etugbeh/php-date-format
```

## Usage
```javascript
const date_format = require("@etugbeh/php-date-format");

// Jan 7, 2024 (current date)
console.log(date_format());

// Tue, Sep 15, 1992
console.log(date_format("1992-09-15", "D, M j, Y"));

// 1970/01/01 12:00 AM
console.log(date_format("1970-01-01T00:00:00.000Z", "Y/m/d h:i A"));
```

## Documentation

https://www.w3schools.com/php/func_date_date_format.asp

The `date_format()` function returns a date formatted according to the specified format.

**Note**: This function does not use locales (all output is in English).

**Tip**: Also look at the `date()` function, which formats a local date/time.
