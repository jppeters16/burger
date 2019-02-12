var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(tableInput, cb) {
    var userQuery = "SELECT * FROM " + tableInput + ";";
    connection.query(userQuery, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var userQuery = "INSERT INTO " + table;

    userQuery += " (";
    userQuery += cols.toString();
    userQuery += ") ";
    userQuery += "VALUES (";
    userQuery += printQuestionMarks(vals.length);
    userQuery += ") ";

    console.log(userQuery);

    connection.query(userQuery, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    var userQuery = "UPDATE " + table;

    userQuery += " SET ";
    userQuery += objToSql(objColVals);
    userQuery += " WHERE ";
    userQuery += condition;

    console.log(userQuery);
    connection.query(userQuery, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
