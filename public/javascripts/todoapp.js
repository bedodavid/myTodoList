$(document).ready(function() {

  function getListID(string) {
    const pos = string.lastIndexOf("/");
    return parseInt(string.substring(pos + 1));
  }

  function getYesterday() {
    return (new Date().setHours(0, 0, 0, 0) - (86400 * 1000));
  }

  function getTomorrow() {
    return (new Date().setHours(0, 0, 0, 0) + (86400 * 1000));
  }

  function getWeekAhead() {
    return (new Date().setHours(0, 0, 0, 0) + (86400 * 1000 * 7));
  }

  function getMonthAhead() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear() + "-" +
      (today.getMonth() + 2) + "-" +
      today.getDate());
    return nextMonth.setHours(0, 0, 0, 0);
  }

  function applyFilter(filterName) {
    switch (filterName.trim()) {
      case "All tasks":
        {
          filterAllTask();
          break;
        }
      case "Today":
        {
          filterDate(0);
          break;
        }
      case "Tomorrow":
        {
          filterDate(1);
          break;
        }
      case "This week":
        {
          filterBeforeDate("week");
          break;
        }
      case "This month":
        {
          filterBeforeDate("month");
          break;
        }
      case "Critical importance":
        {
          filterPriority(4);
          break;
        }
      case "High importance":
        {
          filterPriority(3);
          break;
        }
      case "Medium importance":
        {
          filterPriority(2);
          break;
        }
      case "Low signinficance":
        {
          filterPriority(1);
          break;
        }
      case "No relevance":
        {
          filterPriority(0);
          break;
        }
      case "Clear all filters":
        {
          clearPriorityFilter();
          break;
        }
      case "Yesterday":
        {
          filterDate(-1);
          break;
        }
      case "Expired date":
        {
          filterBeforeDate("expired");
          break;
        }
      case "No due date":
        {
          filterBeforeDate("nodate");
          break;
        }
    }
  }

  function deleteList(listID) {
    let updateObj = {
      expired: 0,
      yesterday: 0,
      today: 0,
      tomorrow: 0,
      week: 0,
      month: 0,
      dateless: 0,
      crit: 0,
      high: 0,
      med: 0,
      low: 0,
      none: 0
    }
    $("#myList-ul").children().each(function() {
      if (getListID($(this).children().attr("href")) == listID) {
        $(this).remove();
        return true;
      }
    });
    $("#myTask-ul").children().each(function() {
      const taskListID=$(this).children().find(".taskListId").val();
      if (taskListID == listID) {
        const priority = $(this).find(".priority").val();
        const date = $(this).find(".task-datetime-holder").val();
        getTaskFilterObj(updateObj, date, priority);
        $(this).remove();
      }
    });
    for(var key in updateObj){
      console.log(key+":"+updateObj[key]);
      if(updateObj[key]>0){
        updateFilterCount(key, updateObj[key]);
      }
    }

    console.log(updateObj);
  }


  function filterAllTask() {
    $("#myTask-ul").children().each(function() {
      $(this).show();
    })
  }

  function filterDate(extraday) {
    $("#myTask-ul").children().each(function() {
      const date = $(this).find(".task-datetime-holder").val();
      $(this).hide();
      if (date != "0") {
        const today = new Date().setHours(0, 0, 0, 0) / 1000; //rounding the milliSec
        const filteredDay = today + (extraday * 86400); // 86400 is one day in sec 60*60*24, )
        (date == filteredDay) ? $(this).show(): $(this).hide(); // date is a String not number!!
      }
    });
  }

  function filterBeforeDate(filter) {
    $("#myTask-ul").children().each(function() {
      const date = $(this).find(".task-datetime-holder").val();
      const today = new Date().setHours(0, 0, 0, 0) / 1000;
      let nextDate;
      if (date != "0") {
        if (date >= today) {
          if (filter === "week") {
            nextDate = getWeekAhead() / 1000;
          } else if (filter === "month") {
            nextDate = getMonthAhead() / 1000;
          }
          (date <= nextDate) ? $(this).show(): $(this).hide();
        } else {
          (filter === "expired") ? $(this).show(): $(this).hide();
        }
      } else {
        (filter === "nodate") ? $(this).show(): $(this).hide();
      }
    });
  }

  function filterPriority(priorityNumber) {
    $("#myTask-ul").children().each(function() {
      const checkPriority = $(this).find(".priority").val();
      (priorityNumber == checkPriority) ? $(this).removeClass("filterDisplay-none"): $(this).addClass("filterDisplay-none");
    });
  }

  function clearPriorityFilter() {
    $("#myTask-ul").children().each(function() {
      $(this).removeClass("filterDisplay-none");
    });
  }

  function getListsTaskCount() {
    let listObjCount = {};
    $("#myTask-ul").children().each(function() {
      const id = $(this).find(".taskListId").val();
      (listObjCount.hasOwnProperty(id)) ? (listObjCount[id]++) : (listObjCount[id] = 1);
    });

    $("#myList-ul").children().each(function() {
      Object.keys(listObjCount).some((key) => {
        if (getListID($(this).children().attr("href")) == key) {
          $(this).find(".list-taskcount").text(listObjCount[key]);
          delete listObjCount[key];
          return true;
        }
      });
    });
  }

  function getTaskFilterObj(obj, date, priority) {
    // CHECK ALL PRIORITYS OF THE TASKS
    switch (priority) {
      case "4": {  obj.crit++;  break;}
      case "3": {  obj.high++;  break;}
      case "2": {  obj.med++;   break;}
      case "1": {  obj.low++;   break;}
      case "0": {  obj.none++;  break;  }
      default : {  console.log("Problem with creating priority of checkFiltersStart");
        }
    }

    // CHECKS ALL TIME of the task, also format the time we see;
    if (date > 0) {
      const yesterday = getYesterday() / 1000;
      const today = new Date().setHours(0, 0, 0, 0) / 1000;
      const tomorrow = getTomorrow() / 1000;
      const thisWeek = getWeekAhead() / 1000;
      const thisMonth = getMonthAhead() / 1000;

      if (date >= today) {
        if (date == today) {
          obj.today++;
        } else if (date == tomorrow) {
          obj.tomorrow++;
        }
        if (date < thisWeek) {
          obj.week++;
        }
        if (date < thisMonth) {
          obj.month++;
        }
      } else {
        obj.expired++;
        if (date == yesterday) {
          obj.yesterday++;
        }
      }
    } else {
      obj.dateless++;
    }
  }


  function checkFiltersStart() {
    let filterObj = {
      expired: 0,
      yesterday: 0,
      today: 0,
      tomorrow: 0,
      week: 0,
      month: 0,
      dateless: 0,
      crit: 0,
      high: 0,
      med: 0,
      low: 0,
      none: 0
    }

    $("#myTask-ul").children().each(function() {
      const taskCheckBox = $(this).find(".taskCheckBox").is(":checked");
      const priority = $(this).find(".priority").val();
      const date = $(this).find(".task-datetime-holder").val();
      const today = new Date().setHours(0, 0, 0, 0) / 1000;
      getTaskFilterObj(filterObj, date, priority);
      const returnDate= showDate(date);                  // this could be done by changing the function before, but then we have an extra return not just the filterObject changes

      $(this).find(".task-datetime").text(returnDate);

      if( date<today){
        $(this).find(".task-datetime").addClass("pastDateTimeTask");
      }
      if (taskCheckBox) {
        $(this).find(".task-name").addClass("taskFinished");
      }
    });
    return filterObj;
  }

  function listFocusRemove() {
    $("#date-filters-ul").find("a").removeClass("focusList");
    $("#myList-ul").find("a").removeClass("focusList");
    $("#list-filter-ul").find("a").removeClass("focusList");
    $("#allTaskFilter").removeClass("focusList");
  }

  function showDate(date) {
        const today = new Date().setHours(0, 0, 0, 0) / 1000;
    const tomorrow = getTomorrow() / 1000;
    const yesterday = getYesterday() / 1000;

    if (date > 0) {
      if (date == today) {
        dateFormat = "Today";
      } else if (date == tomorrow) {
        dateFormat = "Tomorrow";
      } else if (date == yesterday) {
        dateFormat = "Yesterday";
      } else {
        dateFormat = timeFormat(date)
      };
    } else {
      dateFormat = "";
    }
    return dateFormat;
  }


  function timeFormat(time) {
    const datetime = new Date(time * 1000);
    let date = datetime.getDate();
    let month = datetime.getMonth() + 1;
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return ("" + datetime.getFullYear() + "." + month + "." + date);
  }


  function showOnlyActiveFilters(obj) {
    //  today: 0, tomorrow: 0, week: 0,month: 0,
    //  crit: 0, high: 0, med: 0, low: 0, none: 0
    Object.keys(obj).forEach((key) => {
      if (obj[key] > 0) {
        const filterID = key + `TaskFilter`;
        $("#" + filterID).parent().show();
        $("#" + filterID).children(".list-taskcount").text(obj[key]);
      }
    })
  }

  function incrementCount(countString) {
    let count;
    if (countString !== "") {
      count = parseInt(countString) + 1;
    } else {
      count = 1;
    }
    return count;
  }

  function updateFilterCount(key, value) {
    const filterID = key + `TaskFilter`;
    //$("#" + filterID).parent().show();
    const taskcount = parseInt($("#" + filterID).find(".list-taskcount").text());
    const updatedCount = taskcount-value;
    if (updatedCount>0){
      $("#" + filterID).find(".list-taskcount").text(updatedCount);
    }else if(updatedCount==0){
      $("#" + filterID).find(".list-taskcount").text("");
      $("#" + filterID).parent().hide();
    }else{
      console.log("Problem with updating counts after deleteList")
    }
  }

  function incrFilterCount(key) {
    const filterID = key + `TaskFilter`;
    $("#" + filterID).parent().show();
    const taskcount = $("#" + filterID).find(".list-taskcount").text();
    const updatedCount = incrementCount(taskcount)
    $("#" + filterID).find(".list-taskcount").text(updatedCount);
  }

  function updateListbyID(listID, listname) {
    $("#myList-ul").children().each(function() {
      if (getListID($(this).children().attr("href")) == listID) {
        $(this).children().find(".list-name").text(listname);
        return true;
      }
    });
  }

  function incrListCount(listID) {
    $("#myList-ul").children().each(function() {
      if (getListID($(this).children().attr("href")) == listID) {
        const taskcount = $(this).find(".list-taskcount").text();
        const updatedCount = incrementCount(taskcount)
        $(this).find(".list-taskcount").text(updatedCount);
        return true;
      }
    });
  }

  function updateFilterListCountNewTask(obj) {
    //let showDateFormat=showDate(obj.deadline,obj.reminderDate);
    let date;
    (obj.deadline > 0) ? (date = obj.deadline) : (date = obj.reminderDate);
    if (date > 0) {
      const today = new Date().setHours(0, 0, 0, 0) / 1000;
      const tomorrow = getTomorrow() / 1000;
      const thisWeek = getWeekAhead() / 1000;
      const thisMonth = getMonthAhead() / 1000;
      if (date == today) {
        incrFilterCount("today");
      } else if (date == tomorrow) {
        incrFilterCount("tomorrow");
      }
      if (date > today) {
        if (date < thisWeek) {
          incrFilterCount("week");
        }
        if (date < thisMonth) {
          incrFilterCount("month");
        }
      }
    }

    const priority = obj.priority;
    switch (priority) {
      case 4:
        {
          incrFilterCount("crit");
          break;
        }
      case 3:
        {
          incrFilterCount("high");
          break;
        }
      case 2:
        {
          incrFilterCount("med");
          break;
        }
      case 1:
        {
          incrFilterCount("low");
          break;
        }
      case 0:
        {
          incrFilterCount("none");
          break;
        }
      default:
        {
          console.log("Problem with creating priority of checkFiltersStart");
        }
    }
    const listId = obj.listId;
    incrListCount(listId);
  }

  function startListName() {
    $("#allTaskFilter").addClass("focusList");
    $("#selectedList-name").text($("#allTaskFilter").text());
    $("#newTask-toolbar").hide();
    filterAllTask();
    let filterTaskObj = checkFiltersStart();
    showOnlyActiveFilters(filterTaskObj);
    getListsTaskCount();
  }


  //-----Initialize and Listen to events
  //........................................
  startListName();

  $("#myTask-ul").on("click", "input", function() {
    if ($(this).is(":checkbox")) {
      if ($(this).is(":checked")) {
        $(this).siblings(".task-name").addClass("taskFinished");
      } else {
        $(this).siblings(".task-name").removeClass("taskFinished");
      }
    }
  });


  $("#date-filters-ul").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    listFocusRemove();
    $(focused).addClass("focusList");
    const filterName = $(focused).find(".list-name").text();
    $("#selectedList-name").text(filterName);
    $("#newTask-toolbar").hide();
    applyFilter(filterName);
  });

  $("#allTaskFilter").on("click", function(event) {
    listFocusRemove();
    $(this).addClass("focusList");
    $("#selectedList-name").text("All tasks");
    $("#newTask-toolbar").hide();
    applyFilter("All tasks");
  })

  $("#list-collect").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    $("#selectedList-name").text($(focused).text());
    listFocusRemove();
    $(focused).addClass("focusList");
    $("#newTask-toolbar").show();
    $("#changeList-popup-container").hide();
    const id = getListID($(focused).attr("href"));
    $("#taskListIdForm").val(id);
    $("#myTask-ul").children().each(function() {
      const taskListId = $(this).find(".taskListId").val();
      (taskListId == id) ? $(this).show(): $(this).hide();
    })
    if (event.target.className === "list-options") {
      $("#changeList-popup-container").toggle();
      $("#confirmDeleteList-container").hide();
      $("#changelistId").val(id);
    }
  });

  $("#filter-priority-ul").on("click", "a", function(event) {
    let focused = document.activeElement;
    if (document.querySelector) {
      focused = document.querySelector(":focus");
    }
    const filterName = $(focused).find(".list-name").text().trim();
    applyFilter(filterName);
  });



  $("#newList-toolbar").click(function() {
    $("#newTask-popup-container").hide();
    $("#newList-popup-container").toggle();
  });

  $("#cancel-newlist").click(function() {
    $("#newList-popup-container").hide();
  });


  $("#newTask-toolbar").click(function() {
    $("#newList-popup-container").hide();
    $("#newTask-popup-container").toggle();
  });


  $("#cancel-newTask").click(function() {
    $("#newTask-popup-container").hide();
  });


  $("#standardViewTab").click(function() {
    $("#calendarView").hide();
    $("#calendarViewTab").removeClass("activeTaskTab");
    $("#standardViewTab").addClass("activeTaskTab");
    $("#standardView").show();
  });


  $("#calendarViewTab").click(function() {
    $("#standardView").hide();
    $("#standardViewTab").removeClass("activeTaskTab");
    $("#calendarViewTab").addClass("activeTaskTab");
    $("#calendarView").show();
    $("#newTask-popup-container").hide();
  });

  $("#deadlineViewTab").click(function() {
    $("#task-reminder").hide();
    $("#task-reminder").attr("disabled", "disabled");
    $("#reminderViewTab").removeClass("activeTaskTimeTab");
    $("#deadlineViewTab").addClass("activeTaskTimeTab");
    $("#task-deadline").show();
    $("#task-deadline").removeAttr("disabled");
  });

  $("#reminderViewTab").click(function() {
    $("#task-reminder").removeAttr("disabled");
    $("#task-reminder").show();
    $("#reminderViewTab").addClass("activeTaskTimeTab");
    $("#deadlineViewTab").removeClass("activeTaskTimeTab");
    $("#task-deadline").hide();
    $("#task-deadline").attr("disabled", "disabled");
  });


  $("#updateList-form").submit(function(e) {
    e.preventDefault();
    const updatedListName = $('#editListName').val().trim();
    if (updatedListName !== "") {
      const updatedList = $(this).serialize();
      const listID = $('#changelistId').val();
      $.ajax({
        type: 'PUT',
        url: "/lists/update",
        data: updatedList
      }).done(function() {
        updateListbyID(listID, updatedListName);
        $("#changeList-popup-container").hide();
      }).fail(function(err) {
        console.log("fail...........");
        console.log(err);
      })
    }
  });

  $('#addTask-form').submit(function(e) {
    e.preventDefault();
    const taskName = $('#taskName').val().trim();
    if (taskName !== "") {
      const taskData = $(this).serialize();
      $.post('tasks/create', taskData, function(data) {
        const lastPos = $("#myTask-ul").children().length;
        let date=(data.deadline > 0) ? data.deadline : data.reminderDate;
        const datetime = showDate(date);
        updateFilterListCountNewTask(data);
        $("#myTask-ul").append(
          `<li class="task-items-li">
            <a class="task-items" tabindex="${lastPos+100} " id="taskItem${lastPos}">
              <input type="checkbox" class="taskCheckBox" id="taskCheckBox${lastPos}">
              <span class="task-name priority${data.priority}">${data.taskname}</span>
              <span class="task-datetime">${datetime}</span>
              <span class="task-options" title="List options" style="visibility:hidden"></span>
              <input type="hidden" class="task-datetime-holder" value="${date}">
              <input type="hidden" class="taskId" value="${data.id}">
              <input type="hidden" class="taskListId" value="${data.listId}">
              <input type="hidden" class="priority" value="${data.priority}">
            </a>
         </li>`
        );
      }).fail(function(error) {
        alert(error)
      });

      $("#newTask-popup-container").hide();
    }
  });


  $('#addList-form').submit(function(e) {
    e.preventDefault();
    const listName = $('#newListName').val().trim();
    if (listName !== "") {
      const listData = $(this).serialize();
      $.post('lists/create', listData, function(data) {
        const lastPos = $("#myList-ul").children().length;
        $("#myList-ul").append(
          `<li role="menuitem" class="list-items-li">
            <a class="list-items" href="#lists/${data.id}" tabindex="${lastPos+15}" id="listItem${lastPos+15}">
              <span class="list-icon-container"><img class="list-icon" src="/images/listItem.png" /></span>
              <span class="list-name">${data.listname}</span>
              <span class="list-taskcount"></span>
              <span class="list-options" title="List options" style="visibility:hidden"></span>
            </a>
          </li>`
        )
      }).fail(function(error) {
        alert(error)
      });
      $("#newList-popup-container").hide();
    }
  });


  $("#deleteList").on("click", function() {
    $("#confirmDeleteList-container").show();
  });

  $("#no-confirmDeleteList").on("click", function() {
    $("#confirmDeleteList-container").hide();
  });
  $("#yes-confirmDeleteList").on("click", function() {
    const deleteListID = $("#changelistId").val();
    const deleteObj = JSON.parse(JSON.stringify({
      type: "list",
      id: deleteListID
    }));
    $.ajax({
      type: 'DELETE',
      url: "/lists/delete",
      data: deleteObj
    }).done(function() {
      //updateListbyID(listID,updatedListName);
      $("#changeList-popup-container").hide();
      deleteList(deleteListID);
      // get and delete all list/+task+updateFilter
    }).fail(function(err) {
      console.log("fail...........");
      console.log(err);
    })
  })



  $("#priorityfilter-wrapper").hover(
    function() {
      $("#priorityFilter-container").slideDown('medium');
    },
    function() {
      $("#priorityFilter-container").slideUp('medium');
    });

  $("#datetimefilter-wrapper").on("click", function() {
    $("#datetimefilter-container").slideDown('medium');
  });
  $("#datetimefilter-container").on("mouseleave", function() {
    $("#datetimefilter-container").slideUp('medium');
  });
  $("#datetimefilter-wrapper").on("mouseleave", function() {
    $("#datetimefilter-container").slideUp('medium');
  });


});
