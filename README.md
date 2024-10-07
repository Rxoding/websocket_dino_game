<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Websocket_game" />

&#xa0;

</div>

<h1 align="center">Websocket_game</h1>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-기획내용">기획내용</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#tree-filetree">File Tree</a> &#xa0; | &#xa0;
</p>

<br>

## :dart: About

웹소켓을 사용해 크롬다이노 공룡게임 만들기

## :sparkles: 기획내용

:heavy_check_mark: 시간에 따른 점수 획득\
:heavy_check_mark: 스테이지 구분\
:heavy_check_mark: 스테이지에 따른 점수 획득 구분\
:heavy_check_mark: 아이템 획득 시 점수 획득\
:heavy_check_mark: 스테이지 별 아이템 생성 구분\
:heavy_check_mark: 아이템 별 획득 점수 구분

## :rocket: Technologies

The following tools were used in this project:

- [JavaScript]

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting

```bash
# Clone this project
$ git clone https://github.com/{{YOUR_GITHUB_USERNAME}}/websocket_dino_game

# Access
$ cd websocket_dino_game

# Install dependencies
$ yarn

# Run the project
$ yarn start

# The server will initialize in the <http://localhost:3000>
```

## :tree: File Tree

```
websocket_game
├─ .gitattributes
├─ .gitignore
├─ .prettierrc
├─ assets
│  ├─ item.json
│  ├─ item_unlock.json
│  └─ stage.json
├─ package.json
├─ public
│  ├─ .DS_Store
│  ├─ CactiController.js
│  ├─ Cactus.js
│  ├─ Constants.js
│  ├─ Ground.js
│  ├─ images
│  │  ├─ cactus_1.png
│  │  ├─ cactus_2.png
│  │  ├─ cactus_3.png
│  │  ├─ dino_run1.png
│  │  ├─ dino_run2.png
│  │  ├─ ground.png
│  │  ├─ happy_rtan.gif
│  │  ├─ items
│  │  │  ├─ pokeball_cyan.png
│  │  │  ├─ pokeball_orange.png
│  │  │  ├─ pokeball_pink.png
│  │  │  ├─ pokeball_purple.png
│  │  │  ├─ pokeball_red.png
│  │  │  └─ pokeball_yellow.png
│  │  ├─ sprite_sheet.png
│  │  ├─ standing_still.png
│  │  └─ standing_still_eye_closed.png
│  ├─ index.html
│  ├─ index.js
│  ├─ Item.js
│  ├─ ItemController.js
│  ├─ Player.js
│  ├─ Score.js
│  ├─ Socket.js
│  └─ style.css
├─ README.md
├─ src
│  ├─ app.js
│  ├─ constansts.js
│  ├─ handlers
│  │  ├─ game.handler.js
│  │  ├─ handlerMapping.js
│  │  ├─ helper.js
│  │  ├─ item.handler.js
│  │  ├─ register.handler.js
│  │  └─ stage.handler.js
│  ├─ init
│  │  ├─ assets.js
│  │  └─ socket.js
│  └─ models
│     ├─ item.model.js
│     ├─ stage.model.js
│     └─ user.model.js
└─ yarn.lock

```

<a href="#top">Back to top</a>
