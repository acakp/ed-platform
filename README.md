# Ed-Platform

Учебная платформа: React-приложение со списком лекторов, карточками партнёров и формой заявки на связь.

## Стек и версии

Приложение собирается Vite и работает в браузере.

| Пакет | Версия |
| --- | --- |
| Node.js | 26.11.1 |
| npm | 12.2.0 |
| React | 19.3.0 |
| React DOM | 19.3.0 |
| Vite | 8.3.1 |
| @vitejs/plugin-react | 6.1.1 |
| ESLint | 10.11.0 |
| eslint-plugin-react-hooks | 7.1.1 |
| eslint-plugin-react-refresh | 0.5.7 |

Диапазоны зависимостей записаны в `package.json`, точные версии — в `package-lock.json`.

Шрифт Inter подключается в `index.html` с Google Fonts. Стили — обычный CSS без препроцессора: общие токены в `src/styles`, стили компонента лежат рядом с ним.

## Установка и запуск

Нужны Node.js и npm.

```bash
npm install
npm run dev
```

Dev-сервер Vite по умолчанию открывается на `http://localhost:5173`.

Остальные команды:

```bash
npm run build    # сборка в dist/
npm run preview  # локальный просмотр собранной версии
npm run lint     # проверка ESLint
```

## Структура папок

```text
ed-platform/
├── index.html              # точка входа HTML, шрифт и <div id="root">
├── vite.config.js
├── eslint.config.js
├── package.json
├── public/                 # статика, отдаётся как есть: favicon, логотипы партнёров
├── lectors/                # локальные фото лекторов (png)
└── src/
    ├── main.jsx            # монтирование React
    ├── App.jsx             # переключение разделов
    ├── assets/             # картинки, которые импортирует код
    ├── styles/             # общие токены, кнопки, карточки, layout
    └── components/
        ├── Navbar/         # верхнее меню
        ├── Main/           # главная
        ├── About/          # раздел «О нас»
        ├── Partners/       # партнёры
        └── Lectors/        # список, карточка лектора, форма заявки
```

`node_modules/` и `dist/` в репозиторий не входят: зависимости ставятся через `npm install`, сборка появляется после `npm run build`.

## Данные

- Лекторы - `src/components/Lectors/lectorsData.js`. У каждого лектора есть образование, стаж, дисциплины с темами и тарифы.
- Фото лекторов не лежат в бандле. `src/components/Lectors/LectorPhoto.jsx` берёт их по `photoKey` с GitHub (`lectors/<photoKey>.png`). Если картинка не загрузилась, показывается `src/assets/photo-placeholder.svg`.
- Партнёры - массив `PARTNERS` в `src/components/Partners/Partners.jsx`. Картинки - `public/icl.jpg` и `public/tatneft.jpg`.
- Форма «Связаться» (`src/components/Lectors/ContactForm.jsx`) только проверяет поля и показывает, что заявка собрана. На сервер она ничего не отправляет.

## Роутинг

React Router не используется, адрес в браузере не меняется.

Разделы переключает состояние `section` в `src/App.jsx`. Список разделов - константа `SECTIONS`:

| id | Раздел | Компонент |
| --- | --- | --- |
| `main` | Главная | `src/components/Main/Main.jsx` |
| `about` | О нас | `src/components/About/About.jsx` |
| `lectors` | Лекторы | `src/components/Lectors/Lectors.jsx` |
| `partners` | Партнеры | `src/components/Partners/Partners.jsx` |

`Navbar` получает этот список и вызывает `onNavigate`. `App` рисует только компонент текущего раздела.

Внутри «Лекторов» свой локальный переход: `selectedId` в `Lectors.jsx`. Если лектор не выбран, показывается список; если выбран — `LectorDetail`. Это тоже состояние, а не URL. Кнопка «Назад к списку лекторов» сбрасывает `selectedId`.
