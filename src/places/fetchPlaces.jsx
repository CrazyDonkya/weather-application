export const fetchPlace = async (text) => {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=${process.env.REACT_APP_MAP_API_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`
  );
  return res.json();
    
  };