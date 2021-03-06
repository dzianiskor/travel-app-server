# Server for travel-app
## Requests
* GET: https://dzianiskor-travel-app-server.herokuapp.com/api/countries?lang=en
    * Need param: lang = ru || en || gr
    * Return all countries in the current language
* GET: https://dzianiskor-travel-app-server.herokuapp.com/api/countries/604a0e51ed41106a6e20f454?lang=gr
    * Need params: lang = ru || en || gr and id from DB
    * Return one country in the current language
* GET: https://dzianiskor-travel-app-server.herokuapp.com/api/countries/getAllDataCountries
  * Return all data in all languages
* POST: https://dzianiskor-travel-app-server.herokuapp.com/api/auth/register
  * А new user is created in the database
* POST: https://dzianiskor-travel-app-server.herokuapp.com/api/auth/login
  * Authorizes the user. Returns jwt-token and user id.
* POST: https://dzianiskor-travel-app-server.herokuapp.com/api/uploads/avatar
  * Need send file: image/png || image/jpg || image/jpeg
  * Need send jwtToken: `headers: {'Authorization': Bearer {token}}`  
  * Upload avatar image. Return link to this image.
* POST: https://dzianiskor-travel-app-server.herokuapp.com/api/ratings/set-rating
  * Saves the rating that the user has put attractions from the gallery
  * Need send data: `galleryId, rating`
  * Need send jwtToken: `headers: {'Authorization': Bearer {token}}`

## Run project locally
1. git clone
2. npm install
3. cp config/default.example.json config/default.json
4. setting the required parameters in config/default.json
5. npm run dev

