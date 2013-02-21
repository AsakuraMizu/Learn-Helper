var getURLParamters = window.getURLParamters;
function net_login(username, password){
	$.post("https://learn.tsinghua.edu.cn/MultiLanguage/lesson/teacher/loginteacher.jsp", 
		{
			'userid' : username,
			'userpass' : password,
		} , function(data){
		}
	);
}
function net_getCourseList(callback){
	var parser = new DOMParser();
	$.get('http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp', function(data) {
	//$.get('http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/MyCourse.jsp?typepage=2', function(data) {
			var courseDocument = parser.parseFromString(data, 'text/html');
			var courseList = courseDocument.querySelectorAll('#info_1 a');
			courseList = Array.prototype.slice.call(courseList);
			db_updateCourseList( courseList, callback)
			}).fail(netErrorHandler);
}

function db_updateCourseList(courseList, args){
	var db_courseList = [];
	for (var i = 0; i < courseList.length; i++){
		id = getURLParamters(courseList[i].getAttribute('href')).course_id;
		var name = $.trim(courseList[i].innerText);
		name = name.match(/^([^(]*)\(/)[1];
		var course = { 'id' : id,
			 'name' : name
		};
		db_courseList.push(course);
	}
	localStorage.course_list = JSON.stringify(db_courseList);
	if (args){
		args(db_courseList);
	}
}
function db_updateList(type, List, args){
	var choose = {
		'deadline' : 'deadline_list',
		'notification' : 'notification_list'
	};
	var _name = choose[type];
	if (!_name) return;
	if (type == 'notification' && (localStorage.getItem(_name))){
		var oldList = JSON.parse(localStorage.getItem(_name));
		List = mergeNotification(List, oldList);
	}
	localStorage.setItem(_name, JSON.stringify(List));
	if (args){
		args(List);
	}
}
function setNotificationState(id, state){	//allowed state = 'readed', 'unread', 'stared'
	var _name = 'notification_list';
	if (!(id && state)){
		return
	}
	var List = localStorage.getItem(_name);
	if (!List) return;
	var List = JSON.parse(List);
	List[id].state = state;
	localStorage[_name] = JSON.stringify(List);
}

function mergeNotification(newList, oldList){
	if (!oldList) return newList;
	temp = {};
	for (k in oldList){
		if (newList[k]){
			temp[k] = oldList[k];	//转移旧通知
		}
	}
	for (k in newList){
		if (!oldList[k]){
			temp[k] = newList[k];	//转移新通知
		}
	}
	return temp;
}

//operation = 'add', 'remove'
//type = 'deadline', 'notification'
function db_changeException(operation, courseId, type){
	var _name;
	var choose = {
		'deadline' : 'ignore_list_deadline',
		'notification' : 'ignore_list_notification'
	};
	var list = [];
	if (!type) return false;
	_name = choose[type];
	if (!_name) return false;
	if (localStorage.getItem(_name)){
		list = JSON.parse(localStorage.getItem(_name));	
	}
	for (var i = 0; i < list.length; i++){
		if (list[i] == courseId){
			if (op == 'remove'){
				list[i] = list[list.length - 1];
				list.pop();
				localStorage.setItem(_name, JSON.stringify(list));
				return true;
			}
			return false;
		}
	}
	list.push(id);
	localStorage.setItem(_name, JSON.stringify(list));
	return true;
}

function db_clearDatabase(type){
	var choose = {
		'deadline' : 'ignore_list_deadline',
		'notification' : 'ignore_list_notification'
	};
	localStorage.removeItem(choose[type]);
}

function gui_main_updateCourseList(courseList){
	var GUIlist= $('#course-list');
	GUIlist.children().remove();
	for (var i = 0; i < courseList.length; i++){
		var id = courseList[i].id;
		var name = courseList[i].name;
		var k = $('<li>' +
			'<a target="_blank" ' + 
			'href="http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/course_locate.jsp' + 
			'?course_id=' + id + '">' + name + '</a></li>');
		GUIlist.append(k);
	}
}
function gui_main_updatePopupNumber(type, number){
	$('#' + type + '-counter').text(number);
}

function gui_main_updateDeadlineList(deadlineList){
	deadlineList= deadlineList.sort(function(a, b) {
		if (a.state === '尚未提交' && a.end < new Date()) {
			return 1;
		}
		if (b.state === '尚未提交' && b.end < new Date()) {
			return -1;
		}
		if (a.state === b.state) {
			return a.end - b.end;
		}
		return (a.state === '尚未提交') ? -1 : 1;
	});

	var GUIlist = $('#nearby-deadline tr');
	GUIlist.slice(1).remove();
	var GUIlist = $('#nearby-deadline');
	var today = new Date();
	var counter = 0;
	for (var i = 0; i < deadlineList.length; i++){
		if (deadlineList[i].state === '尚未提交'){
			counter += 1;
		}
		dueDays = Math.floor((new Date(deadlineList[i].end) - today) / (60 * 60 * 1000 * 24));
		var line = '<tr>';
		line += '<td>' + deadlineList[i].state + '</td>';
		line += '<td>' + dueDays + '</td>';
		line += '<td>' + new Date(deadlineList[i].end).Format("yyyy.MM.dd") + '</td>';
		line += '<td><a target="_blank" href="http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_detail.jsp?id=' + deadlineList[i].deadlineId + '">' + deadlineList[i].name + '</a></td>';
		line += '<td><a target="_blank" href="http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_brw.jsp?course_id=' + deadlineList[i].courseId + '">' + deadlineList[i].courseName.replace(/\(\d+\)\(.*$/, '') + '</a></td>';
		line += '<td>none</td>';
		line += '<td> <a href="http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_submit.jsp?id=' + deadlineList[i].deadlineId + '&course_id=' + deadlineList[i].courseId + '">提交</a></td>';
		line += '</tr>';
		GUIlist.append($(line));
	}
	gui_main_updatePopupNumber('deadline', counter);
}

function gui_main_updateNotificationList(notificationList){
	temp = [];
	for (id in notificationList){
		temp.push(notificationList[id]);
	}
	var priority = {
		'readed' : 0,
		'unread' : 1,
		'stared' : 2,
	};
	notificationList= temp.sort(function(a, b) {
		if (a.state === b.state){
			return new Date(b.day) - new Date(a.day);
		}
		return priority[b.state] - priority[a.state];
	});
	var GUIlist = $('#unread-notification tr');
	GUIlist.slice(1).remove();
	var GUIlist = $('#unread-notification');
	var counter = 0;
	var today = new Date();
	for (var i = 0; i < notificationList.length; i++){
		var data = notificationList[i];
		var id = data.id;
		var line = '<tr>';
		if (data.state == 'unread'){
			line += '<td>' + '<a class="state-flag" data-args="'+ id + ',stared">未读</a>' + '</td>';
			counter += 1;
		} else if (data.state == 'readed'){
			line += '<td>' + '<a class="state-flag" data-args="'+ id + ',stared">已读</a>' + '</td>';
		} else if (data.state == 'stared'){
			line += '<td>' + '<a class="state-flag" data-args="'+ id + ',readed">加星</a>' + '</td>';
		}
		line += '<td><a target="_blank" class="noti-jump" data-args="' + id + ',readed" href="http://learn.tsinghua.edu.cn/MultiLanguage/public/bbs/'+data.href+'">' + data.name + '</a></td>';
		line += '<td><a target="_blank" href="http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_brw.jsp?course_id=' + data.courseId + '">' + data.courseName + '</a></td>';
		line += '<td>' + new Date(data.day).Format("yyyy.MM.dd") + '</td>';
		line += '</tr>';
		GUIlist.append($(line));
	}
	$('.state-flag, .noti-jump').click(function() {
		console.log(this.getAttribute('data-args'));
		var args = this.getAttribute('data-args').split(',');
		console.log(args);
		setNotificationState.apply(null, args);
		processNotificationList(false, gui_main_updateNotificationList);
	});
	gui_main_updatePopupNumber('notification', counter);
}

function processCourseList(update, callback){	// update list when var update = true or no cache, callback function called with a list.
	var courseList = localStorage.course_list;
	if (!courseList || update){
		net_getCourseList(callback);
		return;
	}
	courseList = JSON.parse(courseList);
	callback(courseList);
}

function processDeadlineList(update, callback){
	var deadlineList = localStorage.deadline_list;
	if (!deadlineList || update){
		traverseCourse('deadline', callback, print);
		return;
	}
	deadlineList = JSON.parse(deadlineList);
	callback(deadlineList);
}
function processNotificationList(update, callback){
	var notificationList = localStorage.notification_list;
	if (!notificationList || update){
		traverseCourse('notification', callback, print);
		return;
	}
	notificationList = JSON.parse(notificationList);
	callback(notificationList);
}

function filterCourse(list, type){	//type = 'deadline' / 'notification'
	var _name;
	var choose = {
		'deadline' : 'ignore_list_deadline',
		'notification' : 'ignore_list_notification'
	};
	if (!type) return list;
	_name = choose[type];
	if (!_name) return list;

	var courseFliter = [];
	if (localStorage.getItem(_name)){
		courseFliter = JSON.parse(localStorage.getItem(_name));
	}
	list = list.filter(function(x) { return courseFliter.indexOf(x.id) < 0; });
	return list;
}

// 完全完成时，调用successCallback(list)，list为总查询结构
// progressCallback为进度汇报，返回完成百分比，0~1的实数
// type = 'deadline' / 'notification'
function traverseCourse(type, successCallback, progressCallback){
	var prefix = {
		'deadline' : 'http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_brw.jsp',
		'notification' : 'http://learn.tsinghua.edu.cn/MultiLanguage/public/bbs/getnoteid_student.jsp'
	};
	var lists = [];
	if (type == 'notification'){
		lists = {};		//实在是太恶心了。。。
	}
	var unChecked;
	var totalWorker;
	var linkPrefix = prefix[type];
	if (!linkPrefix)
		successCallback([]);
	var parser = new DOMParser();
	processCourseList(true, function(courseList){
		courseList = filterCourse(courseList, type);
		unChecked = courseList.length;
		totalWorker = unChecked;
		if (!unChecked){
			successCallback(lists);
		}
		for (var i = 0; i < courseList.length; i++) {
			function worker(num){
				var courseId = courseList[num]['id'];
				var courseName = courseList[num]['name'];
				$.get(linkPrefix , { course_id: courseId }, function (data) {
					var homeworkDocument = parser.parseFromString(data, 'text/html');
					var homeworkList = homeworkDocument.querySelectorAll('#table_box .tr1, #table_box .tr2');
					for (var j = 0, attr; j < homeworkList.length; j++) {
						var attr = homeworkList[j].querySelectorAll('td');
						if (type == 'deadline'){
							var title = $(attr[0].querySelector('a')).attr('href');
							lists.push( {
								courseId: courseId,
								courseName: courseName,
								name: $.trim(attr[0].innerText),
								start: new Date($.trim(attr[1].innerText)),
								end: new Date($.trim(attr[2].innerText) + ' 23:59:59'),
								state: $.trim(attr[3].innerText),
								deadlineId : getURLParamters(title).id,	//goto http://learn.tsinghua.edu.cn/MultiLanguage/lesson/student/hom_wk_detail.jsp?id=
								//TODO resultState : ,
								//resultLink;
							});
						}
						else if(type == 'notification'){
							var title = $(attr[1].querySelector('a')).attr('href');
							var id = getURLParamters(title).id;
							lists[id] = {
								id : id,
								courseId: courseId,
								courseName: courseName,
								name: $.trim(attr[1].innerText),
								day: new Date($.trim(attr[3].innerText)),
								href: $.trim($(attr[1]).find("a").attr('href')),
								state: 'unread',
							};
						}
					}
					unChecked--;
					if (progressCallback){
						progressCallback(1 - unChecked / totalWorker);
					}
					if (unChecked === 0 && successCallback) {
						db_updateList(type, lists, successCallback);
					}
				}, 'html').fail(netErrorHandler);
			};
			worker(i);
		}
	});
}

function print(list){
	//console.log(list);
}

function netErrorHandler(){
	alert('net fail!');
}

//Start
$(function(){
	//net_login('xxr10', '');
	processCourseList(false, gui_main_updateCourseList);
	processDeadlineList(false, gui_main_updateDeadlineList);
	processNotificationList(false, gui_main_updateNotificationList);
});
