import React from 'react';
import { View, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const CameraScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('front');

  if (!hasPermission) {
    // Request permission or show an error message
    requestPermission();
    return <Text>No camera permission</Text>;
  }

  if (!device) {
    return <Text>No camera device found</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Wrap your component with CameraProvider */}
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive={true}
        />
    </View>
  );
};

export default CameraScreen;