function updateMap() {
    
    fetch('/data.json')
        .then(response => response.json())
        .then(result => {
            console.log(result.data);

            result.data.forEach(element => {
                lat = element.latitude;
                log = element.longitude;

                //mark on the map
                var cases = element.infected;

                if (cases > 255) {
                    color = "rgb(255, 0, 0)";
                }
                else {
                    // color = 'rgb(${cases}, 0, 0)';    wrong with '' and  replace with `` 
                    color = `rgb(${cases}, 0, 0)`;
                }

                var popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });
                //map.getCanvas().style.cursor = 'pointer';

                new mapboxgl.Marker({
                    color: color,
                    draggable: false
                })
                    .setLngLat([log, lat])
                    //.setPopup(new mapboxgl.Popup().setText(`Infected : ${cases}  recover : ${element.recovered}`))
                    .setPopup(popup.setHTML(`Infected : ${cases}  recover : ${element.recovered}`))
                    .addTo(map);

                map.getCanvas().style.cursor = 'pointer';

                

            });
            
        })
}

updateMap();
let interval = 200;
// setInterval( updateMap, interval);  or
//setInterval(()=>{
 //   updateMap(),interval })
