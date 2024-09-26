## 0.1: HTML

_This exercise is not submitted to GitHub, it's enough to just read the tutorial_

## 0.2: CSS

_This exercise is not submitted to GitHub, it's enough to just read the tutorial_

## 0.3: HTML forms

_This exercise is not submitted to GitHub, it's enough to just read the tutorial_

## 0.4: New note diagram

Here is a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the `Save` button.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server creates a new note object and adds it to an array called 'notes'.
    Note left of server: The date for new note object is set to the current date and time in server's timezone.
    server-->>browser: redirect to /notes page
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.5: Single page app

Here a diagram depicting the situation where the user goes to the _single-page_ app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET	https://studies.cs.helsinki.fi/favicon.ico
    activate server
    Note left of server: The server does not have a favicon.ico file
    server-->>browser: 404 Not Found
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.6: New note in Single page app diagram

Here is a diagram depicting the situation where the user creates a new note on the _single-page_ app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa by writing something into the text field and clicking the `Save` button.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes the JavaScript code that sends the new note to the server
    Note right of browser: The date for new note object is set to the current date and time in browser's timezone
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server receives the json object e.g. { content: "new note", date: "2023-1-1" }
    Note left of server: The server creates a new note object and adds it to an array called 'notes'.
    server-->>browser: 201 Created
    deactivate server
    Note right of browser: Important! The browser stays on the same page, and it no further HTTP requests.
```
