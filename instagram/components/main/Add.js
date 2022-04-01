import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null)
    const [image, setImage] = useState(null)
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () =>{
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri)
        }
    }
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.cameraContainer}>
                
            <Camera 
            style={styles.fixedRatio} 
            type={type} 
            ratio={'1:1'} 
            ref={ref=>setCamera(ref)}/>

            </View>
            <Button
            title='Flip Image'
                style={styles.button}
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );}}/>
            <Button
            title="Take picture"
            onPress={()=>takePicture()}/>
            {image && <Image source={{uri:image}} style={{flex:1}}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer :{
        flex : 1,
        flexDirection: 'row',
    },
    fixedRatio:{
        flex:1,
        aspectRatio:1
    }
})