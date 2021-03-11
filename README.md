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
## Run project locally
1. git clone
2. npm install
3. cp config/default.example.json config/default.json
4. setting the required parameters in config/default.json
5. npm run dev

