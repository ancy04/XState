import React, { useState , useEffect} from 'react';
import axios from "axios";

export default function State(){

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [isCountrySet, setCountryStatus]=useState(false)
    const [isStateSet, setStateStatus]=useState(false)
    const [countryList, setCountryList]=useState([])
    const [stateList, setStateList]=useState([])
    const [cityList, setCityList]=useState([])


    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
        setCountryStatus(true)
        setState('');
        setCity('');
        setStateStatus(false);
      };

      const handleChangeState = (event) => {
        setState(event.target.value);
        setStateStatus(true)
        setCity('');
      };

      const handleChangeCity = (event) => {
        setCity(event.target.value);
      };

      const getCountryApi = () => {
        return axios.get(`https://crio-location-selector.onrender.com/countries`)
          .then(jsondata => {
            console.log("printing api data", jsondata.data);
            setCountryList(jsondata.data);
          })
          .catch(e => console.error(e));
      };

      const getStateApi = () => {
        if (country){axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`)
          .then(jsondata => {
            console.log("printing api data", jsondata.data);
            setStateList(jsondata.data);
          })
          .catch(e => console.error(e));
      }};

      const getCityApi = () => {
        if (country && state) {
         axios.get(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
          .then(jsondata => {
            console.log("printing api data", jsondata.data);
            setCityList(jsondata.data);
          })
          .catch(e => console.error(e));
      }};

      useEffect(() => {
        getCountryApi();
      }, []);

      useEffect(()=>{
        getStateApi();
      },[country])

      useEffect(()=>{
        getCityApi();
      },[state])
    

    // let countries=["Australia","India","America","China","Korea"];
    //   let states=["Mumbai","Delhi","Jaipur","Kerala"];
    //   let cities=["Chennai","Ooty","Tuty"];

    return(
    <div style={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
        <h1>Select Location</h1>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <select id="CountrySelector" value={country} onChange={handleChangeCountry}>
        <option value="default">Select Country</option>
        {countryList.map((c)=>{
            return (<option key={c} value={c}>{c}</option>)
        })}        
        </select>


        
        <select id="StateSelector" value={state} disabled={!isCountrySet} onChange={handleChangeState}>
        <option value="default">Select State</option>
        {stateList.map((s)=>{
            return (<option key={s} value={s}>{s}</option>)
        })}        
        </select>

        
        <select id="CitySelector" value={city} disabled={!isStateSet} onChange={handleChangeCity}>
                <option value="default">Select City</option>
                {cityList.map((i)=>{
                    return (<option key={i} value={i}>{i}</option>)
                })}        
        </select>
             
        </div>   

        {country && state && city && (
        <h3 style={{ marginTop: '20px' }}>
          You selected {city}, {state}, {country}
        </h3>
      )}     

    </div>
    );
}