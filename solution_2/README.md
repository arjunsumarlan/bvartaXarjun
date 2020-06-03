# Microservices with NodeJS & MongoDB

This is a simple microservice with NodeJS & MongoDB.

# How to Use

### Installing Dependencies

```
git clone https://github.com/arjunsumarlan/bvartaXarjun.git
cd solution_2/orchestrator && npm install && cd ..
cd solution_2/authService && npm install && cd ..
cd solution_2/instructorService && npm install && cd ..
cd solution_2/studentService && npm install && cd ..
```

### Running with Docker - orchestrator

create file .env on orchestrator root directory

```
ENDPOINT={YOUR PUBLIC IP ADDRESS}
```

change it with your ip address, example 100.5.50.135

```
git clone https://github.com/arjunsumarlan/bvartaXarjun.git
cd solution_2/orchestrator
docker-compose build
docker-compose up
```

### Running with Docker - auth service

```
git clone https://github.com/arjunsumarlan/bvartaXarjun.git
cd solution_2/authService
docker-compose build
docker-compose up
```

### Running with Docker - instructor service

```
git clone https://github.com/arjunsumarlan/bvartaXarjun.git
cd solution_2/instructorService
docker-compose build
docker-compose up
```

### Running with Docker - student service

```
git clone https://github.com/arjunsumarlan/bvartaXarjun.git
cd solution_2/studentService
docker-compose build
docker-compose up
```

# API List:

## Register

Register new user

POST: `http://localhost:8080/auth/register`

Body Request:

```Javascript
{
	"username": "arjunsumarlan",
	"password": "Arjun123!!",
	"isAdmin": true
}
```

Response:

```javascript
{
    "success": true
}
```

## Login

Login a new user

POST: `http://localhost:8080/auth/login`

Body Request:

```Javascript
{
	"username": "arjunsumarlan",
	"password": "Arjun123!!",
	"deviceId": "123"
}
```

Response:

```javascript
{
    "success": true,
    "message": "Enjoy your token!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhcmp1bnN1bWFybGFuIiwiaWF0IjoxNTkxMTYyNDYxLCJleHAiOjE1OTExNjM5MDF9.0BZ8zJpCkRzeCKxhMrVdYuvWx427hrt2R1fySGjYHeg"
}
```

## Get all students

Get all students

GET: `http://localhost:8080/student`

Header:

```Javascript
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhcmp1bnN1bWFybGFuIiwiaWF0IjoxNTkxMTYxNTE4LCJleHAiOjE1OTExNjI5NTh9.ssuY_P8idSMSYBK5R6qqES2E_UuGK0VBDRVWFAHm_Vo",
	"x-access-username": "arjunsumarlan",
	"x-access-device-id": "123"
}
```

Response:

```javascript
[
    {
        "_id": "5ed7364f3df7930013cfb987",
        "name": "Arjun"
    }
]
```

## Add new student

Add new student

POST: `http://localhost:8080/student`

Header:

```Javascript
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhcmp1bnN1bWFybGFuIiwiaWF0IjoxNTkxMTYxNTE4LCJleHAiOjE1OTExNjI5NTh9.ssuY_P8idSMSYBK5R6qqES2E_UuGK0VBDRVWFAHm_Vo",
	"x-access-username": "arjunsumarlan",
	"x-access-device-id": "123"
}
```

Body request:

```Javascript
{
	"name": "Arjun"
}
```

Response:

```javascript
{
    "result": {
        "n": 1,
        "ok": 1
    },
    "connection": {
        "_events": {},
        "_eventsCount": 4,
        "id": 3,
        "address": "172.27.0.2:27017",
        "bson": {},
        "socketTimeout": 360000,
        "monitorCommands": false,
        "closed": false,
        "destroyed": false,
        "lastIsMasterMS": 21
    },
    "ops": [
        {
            "name": "Arjun",
            "_id": "5ed73e193df7930013cfb988"
        }
    ],
    "insertedCount": 1,
    "insertedId": "5ed73e193df7930013cfb988",
    "n": 1,
    "ok": 1
}
```

## Get all students

Get all students

GET: `http://localhost:8080/student`

Header:

```Javascript
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhcmp1bnN1bWFybGFuIiwiaWF0IjoxNTkxMTYxNTE4LCJleHAiOjE1OTExNjI5NTh9.ssuY_P8idSMSYBK5R6qqES2E_UuGK0VBDRVWFAHm_Vo",
	"x-access-username": "arjunsumarlan",
	"x-access-device-id": "123"
}
```

Response:

```javascript
[
    {
        "_id": "5ed7364f3df7930013cfb987",
        "name": "Arjun"
    }
]
```

## Add new instructor

Add new instructor

POST: `http://localhost:8080/instructor`

Header:

```Javascript
{
	"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhcmp1bnN1bWFybGFuIiwiaWF0IjoxNTkxMTYxNTE4LCJleHAiOjE1OTExNjI5NTh9.ssuY_P8idSMSYBK5R6qqES2E_UuGK0VBDRVWFAHm_Vo",
	"x-access-username": "arjunsumarlan",
	"x-access-device-id": "123"
}
```

Body request:

```Javascript
{
	"name": "Arjun"
}
```

Response:

```javascript
{
    "result": {
        "n": 1,
        "ok": 1
    },
    "connection": {
        "_events": {},
        "_eventsCount": 4,
        "id": 1,
        "address": "172.28.0.2:27017",
        "bson": {},
        "socketTimeout": 360000,
        "monitorCommands": false,
        "closed": false,
        "destroyed": false,
        "lastIsMasterMS": 4
    },
    "ops": [
        {
            "name": "Arjun",
            "_id": "5ed73759fe38ad0013f12186"
        }
    ],
    "insertedCount": 1,
    "insertedId": "5ed73759fe38ad0013f12186",
    "n": 1,
    "ok": 1
}
```