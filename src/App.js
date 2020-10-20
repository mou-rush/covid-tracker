import React, {useState, useEffect} from 'react';
import {MenuItem,FormControl,Select, Card, CardContent} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import './App.css';

function App() {
  const[countries,setCountries] = useState([]);
  const [country, setcountry] = useState ('worldwide')
  const [countryInfo, setCountryInfo] = useState({});
  // https://disease.sh/v3/covid-19/countries
   // useEffect : Runs a piece of code based on given condition

   useEffect(() => {

 const getCountriesData = async () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) => { 
const countries = data.map((country) => 
   ({
    name: country.country,
    value: country.countryInfo.iso2// UK, USA
   }));
   setCountries(countries)
   });
 };

 getCountriesData();
   },[]);

   const onCountryChange = async (event) => {
     const countryCode= event.target.value;
   setcountry(countryCode);
    }

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
await fetch(url)
.then(response => response.json())
.then(data => {
  setCountryInfo(data);
})
  };

  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
     <h1>Covid-19 Tracker</h1> 
     <FormControl className="app_dropdown">
       <Select
         variant="outlined" onChange={onCountryChange}
         value={country}>
         <MenuItem value="worldwide">Worldwide</MenuItem>
         {countries.map(country => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
           ))
         }

       </Select>
     </FormControl>
     </div>
    <div className="app_stats">
<InfoBox title="corovirus cases" />

<InfoBox title="Recovered" />

<InfoBox title="Deaths" />
    </div>
  
     
    <Map />
        
    </div>
<Card className="app_right">
<CardContent>
  <h2> its working</h2>
</CardContent>

</Card>
    </div>
  );
}

export default App;
