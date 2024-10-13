<h1 align="center"> ⭐ NestJS Template ⭐</h1>

<div align="center">
  <a href="https://mg-hp.com/" target="blank">
    <img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/519bfaf3-c242-431e-a269-876979f05574" width="200" alt="NestJS logo" />
  </a>

  <div align="center">
    <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" width="30" height="30"/>
    <img src="https://user-images.githubusercontent.com/25181517/187955008-981340e6-b4cc-441b-80cf-7a5e94d29e7e.png" width="30" height="30"/>
  </div>
</div>


## About this template 📕
This template includes a development setup and environment multi OS support ready-to-use outside the box, and has the config ready for:

<ul>
  <li>ESLint</li>
  <li>Prettier integration</li>
  <li>Docker hot reload feature (Windows supported)</li>
  <li>Husky integration</li>
  <li>Commit lint (Conventional commits standard)</li>
  <li>Joi .env validation schema</li>
</ul>

## Setup and installation 🚀 

Before using this template, ensure you have [Node.js](https://nodejs.org/en) installed (version 20.12.0 for this template) and [Docker](https://www.docker.com/) installed and running.

### Steps

 1 . Install dependencies using [yarn](https://yarnpkg.com/) as package manager:
```bash
  yarn
```

 2 . Replace .env.template variables and rename it as __.env file__

#### __Environment variables specification__ &nbsp;

|   |   |   |
|---|---|---|
|Variable|Type|Description|
|PORT | Integer (positive) | Port where app runs |

<hr>
 
 3 . __Development mode using Docker:__ Run Docker compose file in the branch directory:
```bash
  docker-compose -f docker-compose.dev.yml up --build
```


 4 . __Development mode without Docker:__ Start the development server:
```bash
  yarn start:dev
```
