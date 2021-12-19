# master-piece-project

## User Stories

- **register:** As an anon I can register to the website
- **Login:** As a user I can login to the website
- **Logout:** As a user I can logout from the website
- **Create course** As a user I can create new course
- **Add lesson** As a user I can add a new lesson to my course
- **Edit Course** As a user I can edit my course
- **Enrole** As a user I can enrole to a course
- **Comment** As a user I can give a comment to a course or lesson
- **Like** As a user I can give a like to a course
- **Follow** As a user I follow other user to watch his future course

## Admin Stories

- **Block user** As an admin I can give a user a block from the website
- **Block comment** As an admin I can block a comment
- **Block course** As an admin I can block a cource

## React Router Routes (React App)

| Path                              | Component    | Permissions             | Behavior                                                             |
| --------------------------------- | ------------ | ----------------------- | -------------------------------------------------------------------- |
| `/`                               | n/a          | public `<Route>`        | Home page                                                            |
| `/register`                       | Register     | anon only `<AnonRoute>` | Register form, link to login, navigate to log in page after register |
| `/login`                          | Login        | anon only `<AnonRoute>` | Login form, link to register, navigate to homepage after login       |
| `/search/:term`                   |              | public `<Route>`        |                                                                      |
| `/setting`                        | Setting      | user only `<Route>`     | Setting form,                                                        |
| `/userIndo`                       | UserInfo     | user only `<Route>`     | show other user info                                                 |
| `/create/course`                  | CreateCourse | user only `<Route>`     | create new course                                                    |
| `/course/:courseTittle`           | Course       | public `<Route>`        | show course                                                          |
| `/courses/:category`              | CoursesPage  | public `<Route>`        | show courses by category                                             |
| `/courses/:category/:subCategory` | CoursesPage  | public `<Route>`        | show courses subcategory                                             |

## Components

- Header
- Home
- Register
- Login
- Setting
- UserInfo
- CreateCourse
- UserInfo
- Course
- coursesPage

## Diagrams

### UML Diagrams

 <img src="./client-UML.drawio.png" alt="UML Diagram" />

## wireframes

### home page

 <img src=".\wireframes\home.drawio.png" alt="home page" />

### register page

 <img src=".\wireframes\register.drawio.png" alt="register page" />

### login page

 <img src=".\wireframes\login.drawio.png" alt="login page" />

### setting info page

 <img src=".\wireframes\setting-info.drawio.png" alt="setting info page" />

### setting avatar page

 <img src=".\wireframes\setting-avatar.drawio.png" alt="setting avatar page" />

### setting password page

 <img src=".\wireframes\setting-password.drawio.png" alt="setting-password page" />

### setting close account page

 <img src=".\wireframes\setting-closeAccount.drawio.png" alt="setting-closeAccount page" />

## Links

### Trello

[Link to trello board](https://trello.com/mbprojectmohammedalmuziny)
