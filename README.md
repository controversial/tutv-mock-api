# tutv-mock-api
Mock API for use in development of https://github.com/jumbocode/tutv

This is a nonfunctional "dummy" API that will provide "fake" API responses appropriate for use
during front-end development.

## Instructions
Inside this folder, run `npm install`. Then, run `npm start`. The server will listen on port 8000.


TODO: Routes that require authentication will return 'authenticated: false' if no authenitcation is
provided, but will not fail. This will allow for smoother development
