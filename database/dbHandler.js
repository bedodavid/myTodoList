//var User = require('../models/user');
//var List = require('../models/list');
let Task = require('../models/task');
let constants = require('../database/constants')

let mysql = require('mysql'),
  async = require('async');

const con = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Ram4szesz26",
  database: "todolist"
});

function addUser(user) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "INSERT INTO " + constants.user.USERS_TABLE +
           " (" + constants.user.USERS_NAME + ", " +
           constants.user.USERS_EMAIL + ", " +
           constants.user.USERS_PASSWORD + ", " +
           constants.user.USERS_REGISTER + ") VALUES ('" +
           user.getName + "', '" + user.getEmail + "', '" +
           user.getPassword + "', " + "now()" + ")";

        tempCont.query(sql, function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};


 function findUser(user) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "SELECT * FROM " +
          constants.user.USERS_TABLE +
          " WHERE " + constants.user.USERS_EMAIL + " =? ";

        tempCont.query(sql, [user.getEmail], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};


function addList(list) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "INSERT INTO " +
          constants.list.LIST_TABLE + " (" +
          constants.list.LIST_USERID + ", " +
          constants.list.LIST_NAME + ") VALUES ?"

        tempCont.query(sql, [list], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);

          }
        });
      }
      tempCont.release();
    });
  });
};

function getList(userID) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "SELECT * FROM " +
          constants.list.LIST_TABLE + " WHERE " +
          constants.list.LIST_USERID + " =? ";

        tempCont.query(sql, [userID], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};

function updateList(updateObj) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = `UPDATE ${constants.list.LIST_TABLE} SET ${constants.list.LIST_NAME} = "${updateObj.listName}" WHERE ${constants.list.LIST_ID} = ${updateObj.listId}`;
        tempCont.query(sql,function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};

function deleteList(listID) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = `DELETE FROM ${constants.list.LIST_TABLE} WHERE ${constants.list.LIST_ID} = ${listID}`;
        tempCont.query(sql,function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};

 function getTask(userID) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "SELECT * FROM " +
          constants.task.TASK_TABLE + " WHERE " +
          constants.task.TASK_USERID + " =? ";
        tempCont.query(sql, [userID], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};

 function addTask(task) {
  return new Promise(function(resolve, reject) {
    con.getConnection(function(err, tempCont) {
      if (err) {
        tempCont.release();
        throw err;
      } else {
        let sql = "INSERT INTO " +
          constants.task.TASK_TABLE + " (" +
          constants.task.TASK_NAME + ", " +
          constants.task.TASK_LISTID + ", " +
          constants.task.TASK_USERID + ", " +
          constants.task.TASK_REMINDER + ", " +
          constants.task.TASK_DEADLINE + ", " +
          constants.task.TASK_REQUIRRENCE + ", " +
          constants.task.TASK_PRIORITY + ", " +
          constants.task.TASK_FINISHED + ") VALUES ?"
        tempCont.query(sql,[task], function(err, res) {
          if (err) {
            return reject(err);
          } else {
            resolve(res);
          }
        });
      }
      tempCont.release();
    });
  });
};

module.exports={
  addUser,
  findUser,
  addList,
  getList,
  updateList,
  deleteList,
  addTask,
  getTask
}
