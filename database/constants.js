'use strict';

let constants = {
  user: {
    USERS_TABLE : "user",
    USERS_ID : "id",
    USERS_NAME : "fullname",
    USERS_EMAIL : "email",
    USERS_PASSWORD : "password",
    USERS_REGISTER : "registeredtime"
  },

  list: {
    LIST_TABLE : "list",
    LIST_ID : "id",
    LIST_USERID : "user_id",
    LIST_NAME : "listname"
  },

  task: {
    TASK_TABLE : "task",
    TASK_TASKDESC : "task",
    TASK_LISTID : "list_id",
    TASK_USERID : "user_id",
    TASK_PLANEDTIME : "date",
    TASK_DEADLINE : "deadline",
    TASK_REQUIRRENCE : "requirrence",
    TASK_PRIORITY : "priority",
    TASK_FINISHED : "finished"
  }
};
module.exports =
        Object.freeze(constants);
