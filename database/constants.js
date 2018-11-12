'use strict';

const constants = {
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
    LIST_USERID : "userId",
    LIST_NAME : "listname"
  },

  task: {
    TASK_TABLE : "task",
    TASK_NAME : "taskname",
    TASK_LISTID : "listId",
    TASK_USERID : "userId",
    TASK_REMINDER : "reminderDate",
    TASK_DEADLINE : "deadline",
    TASK_REQUIRRENCE : "requirrence",
    TASK_PRIORITY : "priority",
    TASK_FINISHED : "finished"
  }
};
module.exports =
        Object.freeze(constants);
