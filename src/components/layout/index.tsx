// MainLayout.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/NavBar';
import icon from '@/assets/icon.png';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import L from 'leaflet';
import {
    Trash2,
    SaveAll,
    Search
} from 'lucide-react';
import './style.css'


function SetViewOnClick({ coords }) {
    const map = useMap();
    map.flyTo(coords);

    return null;
}

function AreaSelector({ active, setDevices }) {
    const map = useMapEvents({
        click: e => {
            if (active) {
                const newDevice = e.latlng;
                setDevices(devices => [...devices, newDevice]);
            }
        }
    });

    return null;
}

function orderCoordinates(points) {
    // Calcular o centroide
    let centroid = points.reduce((acc, point) => {
        return [acc[0] + point[0], acc[1] + point[1]];
    }, [0, 0]).map(coord => coord / points.length);

    // Ordenar os pontos pelo ângulo em relação ao centroide
    return points.sort((a, b) => {
        return Math.atan2(a[1] - centroid[1], a[0] - centroid[0]) - Math.atan2(b[1] - centroid[1], b[0] - centroid[0]);
    });
}

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [currentPosition, setCurrentPosition] = useState<[number, number]>(); // Coordenadas padrão
    const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });
    const [locationInput, setLocationInput] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectMode, setSelectMode] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentPosition([position.coords.latitude, position.coords.longitude]);
                setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
            }, (error) => {
                console.error("Error fetching location", error);
            });
        }
    }, []);

    const handleSearch = async () => {
        // const map = useMap();
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationInput}`);
        const data = await response.json();
        if (data[0]) {
            const newCenter = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
            setCenter(newCenter);

            alert(newCenter.lat + ' ' + newCenter.lng);
            // map.flyTo(newCenter, map.getZoom());
        } else {
            alert('Location not found');
        }
    };


    return (
        <div>
            <Navbar />
            <div className="flex-1 space-y p-20 pt-6 flex flex-row">
                <div className="basis-1/2">{children}</div>
                <div className="basis-2/3">
                    <Tabs defaultValue="view">
                        <TabsList>
                            <TabsTrigger value="view">Gráficos</TabsTrigger>
                            <TabsTrigger value="map">Mapa</TabsTrigger>
                        </TabsList>
                        <TabsContent value="view">
                            <img src={icon} alt="placeholder" />
                        </TabsContent>
                        <TabsContent value="map">
                            <div className="flex space-x-2 mb-2">
                                <Input
                                    type="text"
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                    value={locationInput}
                                    onChange={e => setLocationInput(e.target.value)}
                                    placeholder="Search for locations"
                                />
                                <Button
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
                                    onClick={handleSearch}
                                >
                                    <Search size={18} />
                                </Button>
                                <Button
                                    // className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
                                    onClick={() => setSelectMode(!selectMode)}
                                >
                                    {selectMode ? 'Stop Selecting' : 'Select Area'}
                                </Button>
                                <Button
                                    // className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700"
                                    onClick={() => setSelectMode(!selectMode)}
                                >
                                    {selectMode ? 'Stop Selecting' : 'Select Devices'}
                                </Button>
                                <Button
                                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-red-700"
                                    onClick={() => setDevices([])}
                                >
                                    <SaveAll size={18} />
                                </Button>
                                <Button
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                                    onClick={() => setDevices([])}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>

                            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '75vh', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <SetViewOnClick coords={center} />
                                <AreaSelector active={selectMode} setDevices={setDevices} />
                                {devices.map((device, index) => (
                                    <Marker key={index} position={device} draggable={true} eventHandlers={
                                        {
                                            dragend: (e) => {
                                                const newDevices = [...devices];
                                                newDevices[index] = e.target.getLatLng();
                                                setDevices(newDevices);
                                            }
                                        }

                                    }>
                                        <Popup>Device {index + 1}</Popup>
                                    </Marker>
                                ))}
                                {
                                    devices.length > 3 && (
                                        <Polygon positions={orderCoordinates(devices)} />
                                    )
                                }
                                {/* <Marker position={currentPosition}>
                                    <Popup>You are here!</Popup>
                                </Marker> */}
                            </MapContainer>

                        </TabsContent>
                    </Tabs>
                    <Button>
                        Fechar
                    </Button>
                    <pre>
                        {JSON.stringify(devices, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};
function setSelectMode(arg0: boolean) {
    throw new Error('Function not implemented.');
}

