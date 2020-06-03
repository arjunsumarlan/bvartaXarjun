if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // Get current lat and long
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        // setup map
        const mymap = L.map('mapid');
        mymap.on('load', () => {
            document.getElementById("loader").style.display = "none";
        });
        // zoom to current lat and long
        mymap.setView([lat, long], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGluZ2thdC1pZCIsImEiOiJja2F1Y2Fuam0xZWhiMnhteDVtNGxxZXV5In0.y2D_V7JhW2mw3iYUz_xjtw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidGluZ2thdC1pZCIsImEiOiJja2F1Y2Fuam0xZWhiMnhteDVtNGxxZXV5In0.y2D_V7JhW2mw3iYUz_xjtw'
        }).addTo(mymap);

        // setup marker just for starter
        const marker = L.marker([lat, long], { icon: icon }).addTo(mymap);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

        // focus on the marker
        focusOnMarker(marker);

        // setup search control
        var searchControl = new L.Control.Search({
            url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
            jsonpParam: 'json_callback',
            propertyName: 'display_name',
            propertyLoc: ['lat', 'lon'],
            marker: L.marker([0, 0]),
            autoCollapse: false,
            hideMarkerOnCollapse: true,
            autoType: false,
            minLength: 2
        });

        // add search control to map
        mymap.addControl(searchControl);

        // init current marker
        var currentMarker;

        // remove current marker by shortcut pressing ESC key
        document.addEventListener('keydown', (e) => {
            if (currentMarker) {
                if (e.keyCode === 27) {
                    mymap.removeLayer(currentMarker);
                }
            }
        });

        // listening to search control event for locationfound
        searchControl.on('search:locationfound', e => {
            if (currentMarker) {
                mymap.removeLayer(currentMarker); // remove previous selected marker
            }

            document.getElementById('lat').value = e.latlng.lat;
            document.getElementById('long').value = e.latlng.lng;
            modal.style.display = "block";
        });

        // element for modal
        const modal = document.getElementById("modal");
        const span = document.getElementsByClassName("close")[0];

        // listening clicking on map for marking the point
        mymap.on('click', e => {
            if (currentMarker) {
                mymap.removeLayer(currentMarker); // remove previous selected marker
            }

            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            document.getElementById('lat').value = lat;
            document.getElementById('long').value = lng;

            currentMarker = L.marker([lat, lng], { icon: newIcon }).addTo(mymap);
            mymap.setView([lat, lng], 18); // set max zoom

            document.getElementById('marker-text').innerHTML = `${Number(lat).toFixed(3)}, ${Number(lng).toFixed(3)}`;

            currentMarker.on('click', () => {
                let currentPopup = currentMarker.getPopup();
                if (!currentPopup) {
                    mymap.setView([lat - 0.02, lng + 0.05], 13);
                    modal.style.display = "block";
                }
            })
        })

        // Handling to close modal from x button
        span.onclick = function () {
            closeModal();
        }

        // Handling to close modal from outside modal content
        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal();
            }
        }

        // button for add new marker
        const submitBtn = document.getElementById("submit-btn");

        // Handling to add new marker
        submitBtn.onclick = function (e) {
            e.preventDefault();
            addNewPoint();
        };

        // Handling focusing layer to added marker
        function focusOnMarker(marker) {
            let currentPosition = marker.getLatLng();
            marker.on('click', function () {
                mymap.setView([currentPosition.lat, currentPosition.lng], 13);
            })
        }

        function addNewPoint() {
            let latVal = document.getElementById('lat').value;
            let longVal = document.getElementById('long').value;
            let popupTitle = document.getElementById('popup-title').value;
            let popupMessage = document.getElementById('popup-message').value;

            // make sure that all field are filled
            if (popupTitle.trim() === '' || popupMessage.trim() === '') {
                return alert('Please complete the form.')
            }

            // make sure that lat and long are number only with negative and decimal are possible
            if (!isNumber(latVal) || !isNumber(longVal)) return alert('Please provide number only for latitude and longitude.');

            let lat = Number(latVal);
            let long = Number(longVal);

            let marker = L.marker([lat, long], { icon: icon }).addTo(mymap);
            marker.bindPopup(`<b>${popupTitle}</b><br>${popupMessage}`).openPopup();
            focusOnMarker(marker);
            mymap.setView([lat, long], 13);

            // reset the form
            document.getElementById('lat').value = '';
            document.getElementById('long').value = '';
            document.getElementById('popup-title').value = '';
            document.getElementById('popup-message').value = '';

            // close modal
            closeModal();
        }

        function closeModal() {
            $(".modal-content").css({
                'left': "0px",
                'top': "0px"
            });

            mymap.removeLayer(currentMarker);

            const modal = document.getElementById("modal");
            modal.style.display = "none";
        }
    });
} else {
    let title = document.getElementById('title');
    title.innerHTML = "Geolocation is not supported by this browser.";
}

$(function () {
    $(".modal-content").draggable();
});