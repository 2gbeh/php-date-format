"use strict";
// https://www.w3schools.com/php/func_date_date_format.asp

const DAY = Object.freeze([
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]);

const MONTH = Object.freeze([
  null,
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const ordinalSuffix = (i) => {
  let res = "th";
  Object.entries({
    st: [1, 21, 31],
    nd: [2, 22],
    rd: [3, 23],
  }).map(([nth, arr]) => {
    if (arr.includes(i)) return (res = nth);
  });
  return res;
};

const internetTime = (d) => {
  let n = d.getUTCMilliseconds();
  let len = n.toString().length;
  return len < 2 ? `00${n}` : len < 3 ? `0${n}` : n;
};

// z - The day of the year (from 0 through 365)
// W - The ISO-8601 week number of year (weeks starting on Monday)
// t - The number of days in the given month
// L - Whether it's a leap year (1 if it is a leap year, 0 otherwise)
// o - The ISO-8601 year number
// I - (capital i) Whether the date is in daylights savings time (1 if Daylight Savings Time, 0 otherwise)
// T - Timezone abbreviations (Examples: EST, MDT)
// c - The ISO-8601 date (e.g. 2013-05-05T16:34:42+00:00)
// r - The RFC 2822 formatted date (e.g. Fri, 12 Apr 2013 12:01:05 +0200)

function phpDateFormat(datetime, format = "M j, Y") {
  // 1992-09-15T12:00:00.000Z
  const dt =
    datetime && datetime.toString().length >= 10
      ? datetime
      : new Date().toJSON();
  const date = new Date(dt);
  // ///////////////////////////////////////////////////////////
  const obj = {};
  obj.Y = dt.substr(0, 4); // YYYY
  obj.y = dt.substr(2, 2); // YY
  obj.m = dt.substr(5, 2); // 01-12
  obj.n = Number(obj.m); // 1-12
  obj.M = MONTH[obj.n].slice(0, 3); // Jan-Dec
  obj.F = MONTH[obj.n]; // January-December
  obj.d = dt.substr(8, 2); // 01-31
  obj.j = Number(obj.d); // 1-31
  obj.w = date.getDay(); // 0(Sun)-6(Sat)
  obj.N = obj.w < 1 ? 7 : obj.w; // 1(Mon)-7(Sun) .::ISO-8601
  obj.D = DAY[obj.w].slice(0, 3); // Sun-Sat
  obj.l = DAY[obj.w]; // Saturday-Saturday .::lowercase 'L'
  obj.S = ordinalSuffix(obj.j); // st, nd, rd or th
  // ///////////////////////////////////////////////////////////
  obj.H = dt.substr(11, 2) || "00"; // 24hours 00-23
  obj.G = Number(obj.H); // 0-23
  obj.g = date.toLocaleTimeString().split(":").shift(); // 1-12
  obj.h = obj.g < 10 ? "0" + obj.g : obj.g; // 12hours 01-12
  obj.i = dt.substr(14, 2) || "00"; // minutes 00-59
  obj.s = dt.substr(17, 2) || "00"; // seconds 00-59
  obj.A = date.toLocaleTimeString().slice(-2); // AM|PM
  obj.a = obj.A.toLowerCase(); // am|pm
  // ///////////////////////////////////////////////////////////
  obj.U = Date.now() / 1000; // seconds since 1970-01-01
  obj.u = Date.now() * 1000; // Microseconds (added in PHP 5.2.2)
  obj.B = internetTime(date); // Swatch Internet time (000 to 999)
  obj.P = date.getTimezoneOffset(); // Timezone offset in minutes
  obj.Z = date.getTimezoneOffset() * 60; // Timezone offset in seconds (-43200 to 50400)
  obj.O = date.getTimezoneOffset() / 60; // Timezone offset in hours (+0100)
  obj.e = date.toUTCString().split(" ").pop(); // UTC, GMT, Atlantic/Azores .::timezone identifier
  //
  let res = "";
  switch (format) {
    case "*":
      res = obj;
      break;
    case "/":
      res = date.toLocaleDateString(); // 9/15/1992
      break;
    case ", ":
      res = phpDateFormat(datetime, "D, M j, Y"); // Tue, Sep 15, 1992
      break;
    default:
      let arr = format.split("");
      arr.map((f) => (res += obj?.[f] || f));
  }
  return res;
}

module.exports = phpDateFormat