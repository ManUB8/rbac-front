import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IBranchItem } from '../../interface/Branch.interface';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box, Card, CardContent, debounce, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface IMapAddressProps {
    getValues: UseFormGetValues<IBranchItem>
    setValue: UseFormSetValue<IBranchItem>;
    errors: FieldErrors<IBranchItem>;
    watch: UseFormWatch<IBranchItem>;
    actype: string;
};


const mapStyles = {
    height: "400px",
    width: "100%",
};
const apiKey = "AIzaSyCMomhubUYVOJZccbjovdMcd1gEP6nHvWE";
const MapAddress: React.FunctionComponent<IMapAddressProps> = ({
    getValues,
    setValue,
    actype,
    watch
}) => {
    const [addressInput, setAddressInput] = useState("");
    const mapRef = useRef<google.maps.Map | null>(null);
    const [markerPosition, setMarkerPosition] = useState<
        { lat: number; lng: number } | undefined
    >();
    const [loading, setLoading] = useState(true);
    const lat = watch("address.latitude");
    const lng = watch("address.longitude");
    const lat2 = watch("branch_latitude");
    const lng2 = watch("branch_longitude");
    const getCurrentLocation = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setMarkerPosition({ lat, lng });
                    setValue("branch_latitude", lat);
                    setValue("branch_longitude", lng);
                    setValue("address.latitude", lat);
                    setValue("address.longitude", lng);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, [setValue]);

    const handleMapClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                setMarkerPosition({ lat, lng });
                setValue("branch_latitude", lat);
                setValue("branch_longitude", lng);
                setValue("address.latitude", lat);
                setValue("address.longitude", lng);
            }
        },
        [setValue]
    );

    const handleMarkerDragEnd = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                setMarkerPosition({ lat, lng });
                setValue("branch_latitude", lat);
                setValue("branch_longitude", lng);
                setValue("address.latitude", lat);
                setValue("address.longitude", lng);
            }
        },
        [setValue]
    );

    const handlePlacesChanged = useCallback(() => {
        if (mapRef.current) {
            const service = new google.maps.places.PlacesService(mapRef.current);
            const request = {
                query: addressInput,
                fields: ["name", "geometry"],
            };
            console.log("request", request);
            service.findPlaceFromQuery(request, (results, status) => {
                console.log("results", results);
                console.log("status", status);
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    results &&
                    results.length > 0
                ) {
                    const location = results[0].geometry?.location;
                    console.log("location", location);
                    if (location) {
                        const lat = location.lat();
                        const lng = location.lng();
                        setMarkerPosition({ lat, lng });
                        setValue("branch_latitude", lat);
                        setValue("branch_longitude", lng);
                        setValue("address.latitude", lat);
                        setValue("address.longitude", lng);
                        mapRef.current?.panTo({ lat, lng });
                    }
                } else {
                    console.error("Place search failed:", status);
                }
            });
        }
    }, [addressInput, setValue]);

    // ใช้ debounce เพื่อหน่วงการค้นหา
    const debouncedSearch = useCallback(
        debounce((query) => {
            console.log("Searching for:", query);
        }, 500), // หน่วง 300ms ก่อนเรียกฟังก์ชัน
        []
    );

    // handleChangeSearch: อัปเดตค่าและเรียก debounce
    const handleChangeSearch = (value: string) => {
        setAddressInput(value); // อัปเดตทันทีเพื่อแสดงผลใน UI
        debouncedSearch(value); // เรียกฟังก์ชัน debounce
    };

    useEffect(() => {
        if (addressInput) {
            handlePlacesChanged(); // อัปเดตเมื่อ branch_address เปลี่ยนแปลง
        }
    }, [addressInput, handlePlacesChanged]);

    useEffect(() => {
        if (actype === "create") {
            if (lat2 === null || lat2 === 0 || lat === 0) {
                console.log("map-create");
                getCurrentLocation();
                // setMarkerPosition({ lat: Number(lat2), lng: Number(lng2) });
            } else {
                console.log("create-mp-c2");
                if (addressInput !== "") {
                    handlePlacesChanged();
                }
                setMarkerPosition({ lat: Number(lat2), lng: Number(lng2) });
                setLoading(false);
            }
        } else if (actype === "edit") {
            if (lat === 0 || lat === null) {
                console.log("map-edit");
                getCurrentLocation();
            } else {
                if (addressInput !== "") {
                    handlePlacesChanged(); // อัปเดตเมื่อ branch_address เปลี่ยนแปลง
                }
                setMarkerPosition({ lat: Number(lat), lng: Number(lng) });
            }
            setLoading(false);
        }
    }, [
        actype,
        getCurrentLocation,
        watch("address.latitude"),
        addressInput,
        handlePlacesChanged,
        lat,
        lng,
        lat2,
        lat2,
    ]);

    return (
        <>
            <Card
                sx={{
                    p: '1px',
                    borderRadius: '10px',
                    boxShadow: 'lightgray 0px 3px 5px'
                }}
            >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid
                            size={{ xs: 12 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10
                            }}
                        >
                            <Typography
                                fontSize={20}
                                fontWeight={700}
                                color="#FBBF14"
                            >
                                {'แผนที่ร้านอาหาร'}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: addressInput && (
                                            <InputAdornment position="end">
                                                <ClearIcon
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setAddressInput(""); // รีเซ็ตค่า
                                                        debouncedSearch(""); // เคลียร์การค้นหา
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                                focused
                                type={"text"}
                                placeholder="ระบุคำที่ต้องการค้นหา"
                                size="small"
                                value={addressInput}
                                onChange={(e) => handleChangeSearch(e.target.value)}
                            />
                        </Grid>
                        {/* {loading ? (
                            <LoadingDisplayLast loading={loading} />
                        ) : ( */}
                            <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
                                <GoogleMap
                                    mapContainerStyle={mapStyles}
                                    zoom={18}
                                    center={markerPosition}
                                    onClick={handleMapClick}
                                    onLoad={(map) => {
                                        mapRef.current = map;
                                    }}
                                >
                                    {markerPosition && (
                                        <Marker
                                            position={markerPosition}
                                            draggable={true}
                                            onDragEnd={handleMarkerDragEnd}
                                        />
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        {/* )} */}
                    </Grid>
                </CardContent>
            </Card>

        </>
    );
};
export default MapAddress;