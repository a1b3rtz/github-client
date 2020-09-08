[![LinkedIn][linkedin-shield]][linkedin-url]

<h3 align="center">Github Client</h3>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
  * [Feature](#feature)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Demo](#demo)
* [Contact](#contact)

## About The Project
A github client developed with Next.js

### Built With
* [Nextjs](https://https://nextjs.org/)
* [Antd](https://https://ant.design/)

### Feature
* Allow user to login via Github OAuth
* Use cache to reduce number of request
* Format markdown document with Github-markdown-css & markdown-it
* Async actions in Redux with Thunk

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Get a free CLIENT_ID and CLIENT_SECRET Key at [https://github.com/settings/developers](https://github.com/settings/developers)
2. Clone the repo
```sh
git clone https://github.com/YuhaoZhang-tirsky/github-client.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `.env`
```JS
GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
SCOPE = 'user'
CLIENT_ID = 'ENTER YOUR CLIENT_ID'
CLIENT_SECRET = 'ENTER YOUR CLIENT_SECRET'
REQUEST_TOKEN_URL = 'https://github.com/login/oauth/access_token'
```
5. Install Redis

## Demo
![Product Login Screen Shot][login-screenshot]
![Product Search Screen Shot][search-screenshot]
![Product Sort Search Screen Shot][search-sort-screenshot]
![Product Readme Issue Screen Shot][readme-issue-screenshot]
![Product Sort Issue Screen Shot][issue-search-screenshot]

## Contact
yuhao.zhang@outlook.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/yuhao-zhang-fullstack
[product-screenshot]: images/screenshot.png
[login-screenshot]: readmeImage/login.gif
[search-screenshot]: readmeImage/search.gif
[search-sort-screenshot]: readmeImage/search-sort.gif
[readme-issue-screenshot]: readmeImage/readme-issue.gif
[issue-search-screenshot]: readmeImage/issue-search.gif
