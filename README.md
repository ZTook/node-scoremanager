# StudentScore Demo

- Summery
- Logic
- RESTful API
- Router
- Usage

## Summery

　　完成度　10% ...

　　采用Nodejs + Express +　Vue ＋ Mongodb, 页面使用Bootstrp栅格式设计, MD风格, 表格使用datatable.js, 图表表现使用highchat.js, 主要有以下特性:

1. 全套功能的成绩管理
2. 科学统计与图表显示
3. 后台管理与系统登陆
4. 信息录入与成绩查询
5. 关键性数据加密存储

## Logic

### powers

｜ Empty ｜ superadmin(0) ｜ majoradmin(1) ｜　courseadmin(2)　｜ student(3)　｜ unregist(4) ｜
｜:-----:｜:-------------:｜:-------------:｜:---------------:｜:-----------:｜:-----------:｜
｜ login ｜　　　　　　　　　｜　　　　　　　　　｜　　　　　　　　　　｜　　　　　　　　｜　　　　　　　　｜

### pages
| dir | (method) <show> 'path' / [description] | min_access |
-^index    (get)'www/index'    <5
 -^login    (get)'www/login'    <5
  -fn_login    (post)<button>[name pass verify]    <5
   -fn_forget    <link>[]    <5
  -^forget    (get)'www/forget'    <5
   -fn_forgetSend    (get)<button>'www/forget/id'    <4
 -^register    (get)'www/register'    <5
  -fn_register    (post)<button>[id name email pass confirmPass verify]    <5
 -^admin    (get)'www/admin/'    <5
  -fn_exit    (get)<nav-button>[confirm]    <3  
  -^major    (get)<button>'www/admin/major/id'    <2 && majorid
   -fn_majorSet    (post/update/delete)<tag>[majorid majorname majoradminid (label)delete (tag)add]    <1
    -fn_majorCourseSet    (post/update/delete)<tag>[courseid (label)delete (tag)add]    <2 && majorid
    -fn_majorStudentSet    (post/update/delete)<tag>[name number email major grade otherinfo{age..}]    <2 && majorid
    -fn_majorScoreAnalysis    (post)[query：]    <2 && majorid
  -^course    (get)'www/admin/course/id'    <3 && courseid
   -fn_courseSet    (post/update/delete)<tag>[courseid coursename courseadminid (menu)delete]    <3 && courseid
    -fn_scoreSet    (post/update/delete)<tag>[<filter>studentid studentname <filter>required]    <3 && courseid
    -fn_scoreAnalysis    (post)[query：]    <3 && course
  -^person    (get)'www/admin/person/'  
   -fn_usersList    (menu)[sublist]    <2
    -fn_superadminSet    (update)[superadminname pass email]    <1
    -fn_majoradminSet    (post/update/delete)<list>[teacherid studentname pass email regist]    <1
    -fn_courseadminSet    (post/update/delete)<list>[teacherid studentname pass email regist]    <2
    -fn_studentSet    (post/update/delete)<list>[studentid studentname pass email major regist]    <2
 -^users    (get)'www/users/id'    <4  
  -fn_exit    (get)[confirm]    <4
  -fn_usersSet    (update)[logo name pass email]    <4
  -fn_scoreGet    (post)[(choice/tag)date | (choice/tag)require ｜ (choice/tag)range]    =3

### scemas
var users = {
  "id" : idnum
  "name" : username
  "pass" : password
  "email" : email@xxx.com
  "major1" : major1name
  "major2" : major2name
  "logo" : logo.png
  "power" : [0:superadmin 1:majoradmin 2:courseadmin 3:student 4:unregist]
  ***对于教师, 需不需要说明其所属专业或课程，貌似不需要，如果需要，该怎么办***
}

var major = {
  "id" : idnum
  "name" : majorname
  "adminer" : majoradminid
  "course" : [Array类型]
  "logo" : logo.png
  ***如果用Redis如何解决course的问题***
}

var course = {
  "id" : idnum
  "name" : coursename
  "teacher" : teacherid
  "logo" : logo.png
}

var score = {
  "id" : scoreid
  "course" : corusename[按教材算，比如高数分为高数一，高数二]
  "student" : studentid
  "teacherid" : teacherid
  "teachername" : teachername
  "range" : nice/good/ok/die
  "required" : yes/no
  "date" : [20xx-上|20xx-下]
}

## RESTful API


### get(SELECT)
Test:
### post(CREATE)
Test:
### delete(DELETE)
Test:
### put(UPDATE)
Test:
### patch(UPDATE)

## Router

### "/"
- "/" : index (get/post)
- "/index" : index (get/post)
- "/login" : login (get/post)
- "/forget" : forget (get)
- "/forget/id" : (get)
- "/register" : register (get/post)

### "/admin":
- "/admin/major/id" : ***admin*** (get/post/update/delete)
- "/admin/course/id" : ***admin*** (get/post/update/delete)
- "/admin/person" : ***admin*** (get/post/update/delete)

### "/user"
- "/users/id" : users (get/update/post)

---

## Usage

### 说明
　　确保服务器上已安装Git,Node,MongoDB.

### 使用
git clone xxx.git
npm install
