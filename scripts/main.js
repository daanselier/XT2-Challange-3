mapboxgl.accessToken = 'pk.eyJ1IjoiZGFhbnNlbGllciIsImEiOiJja21rbDh2eDAweHJiMm9tazNtNTRwb214In0.gL0rpyToa29vbx9DLjRXjQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [4.324574814824895, 52.145408],
    zoom: 8,
});

map.on('load', function () {
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        // Add an image to use as a custom marker
        function (error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);

            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<h2>Noorderkroon, Lisse</h2><p>Een landingsplaats met ruimte, veel bollenvelden om een raket kwijt te kunnen. Gelieve voor landing contact op te nemen met boer.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.564760, 52.266710]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<h2>Prinsenweg, Voorhout</h2><p>Afvoerputje van Sassenheim, de Lissenaren hebben liever dat jullie hier landen met de raket. Hier zijn ook veel bollenvelden waar de raket kan landen. Raket kan na de landing worden weeggesleept met de trekker. Gelieve voor landing contact op te nemen met boer.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.508440, 52.234820]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<h2>Peursumstraat, Zoetermeer</h2><p>Ligt middenin de stad Zoetermeer. Door een lange doorgaande straat met een groot grasveld voor de deur kan er hier met een beetje precisie een raket laden. Er valt ook de keuze te maken om op het dak van nummer 25 te landen.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.540290, 52.067000]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<h2>Evertsenstraat, Zoetermeer</h2><p>Locatie met de minste ruimte van de vier gegeven locaties. Desondanks dat er weinig ruimte is kan er toch geland worden in de riante achtertuin van hoekhuis. Er valt ook de keuze te maken om op het dak van nummer 1 te landen.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.499314532261242, 52.05167340948468]
                            }
                        },
                        {
                            'type': 'Feature',
                            'properties': {
                                'description':
                                    '<h2>Oude-Tonge</h2><p>Klein dorp met maar 5500 inwoners. Rondom de het dorp zijn verschillende opties om te landen met een raket. Gelieve voor landing contact op te nemen met de dijkbeheerder.</p>'
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.213380, 51.690940]
                            }
                        }
                    ]
                }
            });

            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true
                }
            });
        }
    );

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'places', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});
