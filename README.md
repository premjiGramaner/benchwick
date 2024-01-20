## Install dependencies

yarn install

## Run dev server

yarn start

## Build

yarn build


*** To generate Google SSO Client ID follow this ***
Consent: https://console.cloud.google.com/apis/credentials/oauthclient/602906571575-hcktqd924j1nm22r9ihj49j6jv73tfeb.apps.googleusercontent.com?project=testsmtp-409312
DOC: https://www.dhiwise.com/post/react-google-oauth-the-key-to-secure-and-quick-logins
Youtube: https://www.youtube.com/watch?v=HtJKUQXmtok
Steps:
```
Go to the Google Cloud Console.

Select or create a new project where your React app will be registered.

Navigate to "APIs & Services" > "Credentials".

Click on "Create credentials" and choose "OAuth client ID" from the dropdown menu.

Select "Web application" as the application type.


We need to get from client:
Provide users a link to your home page
Provide users a link to your public privacy policy
Provide users a link to your public Terms of Service


To run tunnel - Development
D:\Gramener\Softwares>ngrok http 8080 --host-header="localhost:8080"
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'envision@123';
```