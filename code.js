

let fallbackLocation = { latitude: 48.8575, longitude: 2.2982 }
let url
let photosArray=[]
let currentPhoto=0
let firstPhoto

document.getElementById("nextPhoto").onclick =function(){nextPhoto()}

function nextPhoto(data) {
  for (index in photosArray){
  currentPhoto+=1
 photosArray
 .filter(photo =>photo.id)
 .forEach(displayPhoto)
}
}


function assembleImageSourceURL (photoObj) {
  return "https://farm" + photoObj.farm +
  ".staticflickr.com/" + photoObj.server +
  "/" + photoObj.id + "_" + photoObj.secret + ".jpg"
}

function displayPhoto(photoObj) {
  let imageUrl = assembleImageSourceURL(photoObj)
  let image = document.createElement(`img`)
  image.src = imageUrl
  let container = document.getElementById(`photosContainer`)
  container.innerHTML =""
  container.append(image)
}



function showPhotos(data){
  console.log(data)
  photosArray= data.photos.photo
  console.log(assembleImageSourceURL(photosArray[2]))
  firstPhoto=data.photos.photo[currentPhoto]
  console.log(firstPhoto)
  displayPhoto(firstPhoto)
}

function confirmResponse(response) {
  let getresponse = response.json()
  getresponse.then(showPhotos)
}

function getPhotos(location){
  console.log(location.latitude)
  console.log(location.longitude)
  url= `https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/`+
        `?api_key=3f930d0733d74b3c1ec6020a7ead4eb5`+
        `&format=json`+
        `&format=json` +
        `&nojsoncallback=1`+
        `&method=flickr.photos.search`+
        `&safe_search=1`+
        `&per_page=5`+
        `&lat=`+ location.latitude+
        `&lon=`+ location.longitude+
        `&text=random`

        console.log(url)

        let fetchUrl=fetch(url)
        fetchUrl.then(confirmResponse)
}



function locationSuccess(position){
  console.log(position)
  getPhotos(position.coords)
   console.log(position.coords)
}

function locationError(){
  console.log("Something went wrong")
  getPhotos(fallbackLocation)

}
navigator.geolocation.getCurrentPosition(locationSuccess,locationError)