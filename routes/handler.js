const express = require("express");
const router = express.Router();

let idCounter = 0;

let newUser = {
  id: 0,
  name: "NA",
  email: "NA",
  psw: "NA",
  lastLogin: "NA",
};

router.get("/profile", (req, res) => {
    console.log(req)
  res.end(JSON.stringify(newUser));
});

router.get("/profile/random", (req, res) => {
    let keys = Object.keys(newUser);
    let randomDataKey = keys[Math.floor(Math.random() * keys.length)];
    res.end(JSON.stringify(randomDataKey));
  });

router.post("/login", (req, res) => {
  idCounter++;
  newUser.id = idCounter + "";
  newUser.name = req.body.inputValues.name;
  newUser.email = req.body.inputValues.email;
  newUser.psw = req.body.inputValues.psw;
  const timeOfLogin = Date.now();
  newUser.lastLogin = new Date(timeOfLogin);
  idCounter = 0;
});

const getScript = (url) => {
  return new Promise((resolve, reject) => {
    const http = require("http"),
      https = require("https");

    let client = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client
      .get(url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

let cities = [];
const countries = [
  { id: 1, name: "Bács-Kiskun megye", value: "Bács-Kiskun megye", label: "Bács-Kiskun megye"},
  { id: 2, name: "Baranya megye", value: "Baranya megye", label: "Baranya megye"},
  { id: 3, name: "Békés megye", value: "Békés megye", label: "Békés megye"},
  { id: 4, name: "Borsod-Abaúj-Zemplén megye", value: "Borsod-Abaúj-Zemplén megye", label: "Borsod-Abaúj-Zemplén megye"},
  { id: 5, name: "Budapest", value: "Budapest", label: "Budapest"},
  { id: 6, name: "Csongrád-Csanád megye", value: "Csongrád-Csanád megye", label: "Csongrád-Csanád megye"},
  { id: 7, name: "Fejér megye", value: "Fejér megye", label: "Fejér megye"},
  { id: 9, name: "Győr-Moson-Sopron megye", value: "Győr-Moson-Sopron megye", label: "Győr-Moson-Sopron megye"},
  { id: 10, name: "Hajdú-Bihar megye", value: "Hajdú-Bihar megye", label: "Hajdú-Bihar megye"},
  { id: 11, name: "Heves megye", value: "Heves megye", label: "Heves megye"},
  { id: 12, name: "Jász-Nagykun-Szolnok megye", value: "Jász-Nagykun-Szolnok megye", label: "Jász-Nagykun-Szolnok megye"},
  { id: 13, name: "Komárom-Esztergom megye", value: "Komárom-Esztergom megye", label: "Komárom-Esztergom megye"},
  { id: 14, name: "Nógrád megye", value: "Nógrád megye", label: "Nógrád megye"},
  { id: 15, name: "Pest megye", value: "Pest megye", label: "Pest megye"},
  { id: 16, name: "Somogy megye", value: "Somogy megye", label: "Somogy megye"},
  { id: 17, name: "Szabolcs-Szatmár-Bereg megye", value: "Szabolcs-Szatmár-Bereg megye", label: "Szabolcs-Szatmár-Bereg megye"},
  { id: 18, name: "Tolna megye", value: "Tolna megye", label: "Tolna megye"},
  { id: 19, name: "Vas megye", value: "Vas megye", label: "Vas megye"},
  { id: 20, name: "Veszprém megye", value: "Veszprém megye", label: "Veszprém megye"},
  { id: 21, name: "Zala megye", value: "Zala megye", label: "Zala megye"},
];

const setCountryNames = (cities) => {
    if (cities.length > 1) {
        let cityArr = JSON.parse(cities);
        cityArr.forEach(function(city) {
            countries.forEach(function(country) {
                city.megyeid == country.id ? city.megyenev=country.name : city
        })
    });
    return JSON.stringify(cityArr);
    }
}

const selectCitiesByCountry= (citiesWithCountries, countryId) => {
    let citiesByCountry = JSON.parse(citiesWithCountries);
    let filtered;
    if (citiesWithCountries.length >= 1) {
        filtered = citiesByCountry.filter(city => city.megyeid === countryId + '');
    }
    return JSON.stringify(filtered);
}

// router.get("/cities?megye=:id", (req, res) => {
//     (async (url) => {
//       cities = await getScript(url);
//     })("https://majorbence.hu/GmEn2AZwoD/?cities=true");
//     const citiesWithCountries = setCountryNames(cities);
//     console.log(cities);
//     console.log(countryId);
//     countryId = req.params.megye;
//     res.end(selectCitiesByCountry(citiesWithCountries, countryId));
//   });

router.get("/cities", (req, res) => {
  (async (url) => {
    cities = await getScript(url);
  })("https://majorbence.hu/GmEn2AZwoD/?cities=true");
  const citiesWithCountries = setCountryNames(cities);
  if(req.query.megye) {
    const countryId = req.query.megye;
    return res.end(selectCitiesByCountry(citiesWithCountries, countryId));
  } else {
    return res.end(citiesWithCountries);
  }
});

router.get("/countries", (req, res) => {
    res.end(JSON.stringify(countries));
  });

module.exports = router;
