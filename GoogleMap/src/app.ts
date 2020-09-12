import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyDk4OsQxCEb-KlBQ4uUqNZfj03ZApzf_ZE';

// declare var google: any;

type GoogleGeocodingResponse = { 
  results: {
    geometry: {
      location: { 
        lat: number, 
        lng: number 
      }
    }
  }[],
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandeler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // send this to google map api
  // https://developers.google.com/maps/documentation/geocoding/start
  // https://console.cloud.google.com/google/maps-apis/credentials?project=api-project-66053968669

  axios.get<GoogleGeocodingResponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
    )},+Mountain+View,+CA&key=${GOOGLE_API_KEY}`
  ).then(response => {
    if(response.data.status !== 'OK') {
      throw new Error("Could not fetch location");
    }
    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById("map")!, {
      center: coordinates,
      zoom: 16
    });

    new google.maps.Marker({position: coordinates, map: map})
    
  }).catch(err => {
    alert(err.message)
    console.log(err);
    
  });
}

form?.addEventListener('submit', searchAddressHandeler);