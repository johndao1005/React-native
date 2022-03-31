import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function App() {
    const devices = useCameraDevices('wide-angle-camera')
    
    const device = devices.back

    const [hasMicrophonePermission, setHasMicrophonePermission] = useState('')
    const [hasCameraPermission, setHasCameraPermission] = useState('not-determined')
    const [type, setType] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.getCameraPermissionStatus()
            const microphonePermission = await Camera.getMicrophonePermissionStatus()
            setHasCameraPermission(cameraPermission);
            setHasMicrophonePermission(microphonePermission);
        })();
    }, []);

    if (hasCameraPermission === '' ) {
        return <View />;
    }
    if (hasCameraPermission === 'denied' || device == null) {
        console.log(device)
        return <Text>No access to camera</Text>;
    }
    return (
        <View >
            <Camera
                device={device}
                isActive={true}
            />
            <View >
                <TouchableOpacity
                    onPress={() => {
                    }}>
                    <Text > Flip </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}