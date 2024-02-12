import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert} from 'react-native'

import Information from './components/Information.jsx';
import Settings from './components/Settings.jsx'
import stylesGlobal from '../../../css/style'
import { Select_Option, Edit, StarProfile, ChevronDown, ChevronUp, HeartProfile, Trash, Badge, Close, Check } from '../../components/Svg';
import { BlurView } from '@react-native-community/blur';
import { DarkModeContext } from '../../../App.jsx'
import DocumentPicker from 'react-native-document-picker'

import { getUser, editMe } from '../../../../api/user.jsx'

const dataTypeNames = [
        'Favorites',
        'Likes',
        'Trash',
        'Badges'
    ]

export default function ProfileScreen({navigation}) {
    
    const { darkMode, setDarkMode } = useContext(DarkModeContext)

    const [dataTypeColor, setDataTypeColor] = useState(
        [
        // 0 - Favorites
        // 1 - Likes
        // 2 - Trash
        // 3 - Badges
            {color: '#2199AB', color2: '#1A7A89', fill: true},
            {color: '#BF0D40', color2: '#990B33', fill: false},
            {color: '#5B5B5D', color2: stylesGlobal.color_b5, fill: false},
            {color: '#EBB700', color2: '#461D00', color3: '#ffffff', color4: '#097728', fill: false}
        ]
    )
    const [borderStyle, setBorderStyle] = useState(
        {
            top: 0,
            bot: 2,
            right: 0.1,
            left: 0.1
        }
    )
    const [dataTypeName, setDataTypeName] = useState(dataTypeNames[0])
    const [dataType, setDataType] = useState(0)
    const [moreInfo, setMoreInfo] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(null)
    const [phone, setPhone] = useState(null)
    const [address, setAddress] = useState(null)
    const [zip, setZip] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: darkMode ? stylesGlobal.bg_b2.backgroundColor : stylesGlobal.bg_w2.backgroundColor,
            height: 800
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 24,
        },
        text: {
            color: darkMode ? stylesGlobal.color_w1.color : stylesGlobal.color_b1.color
        },
        nameArea: {
            alignItems: 'center',
        },
        imageContainer: {
            alignItems: 'center',
            margin: 20
        },
        imageContainerMiddle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15
        },
        image: {
            width: 110,
            height: 110,
            margin: 10,
            borderRadius: 512,
            borderWidth: 2,
            borderColor: dataTypeColor[0].fill ? dataTypeColor[0].color2
                            : dataTypeColor[1].fill ? dataTypeColor[1].color2
                            : dataTypeColor[2].fill ? dataTypeColor[2].color
                            : dataTypeColor[3].color4,
        },
        infoContainer: {
            alignItems: 'center',
        },
        content: {
            flexDirection: 'column',
            height: 700,
            justifyContent: 'space-between',
        },
        item: {
            margin: 0,
        },
        outterBorder: {
            width: 120,
            height: 120,
            borderColor: dataTypeColor[0].fill ? dataTypeColor[0].color2
                            : dataTypeColor[1].fill ? dataTypeColor[1].color2
                            : dataTypeColor[2].fill ? dataTypeColor[2].color
                            : dataTypeColor[3].color4,
            borderTopWidth: borderStyle.top,
            borderBottomWidth: borderStyle.bot,
            borderRightWidth: borderStyle.right,
            borderLeftWidth: borderStyle.left,
            borderRadius: 512,
        },  
        absolute: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        editProfile: {
            width: 310,
            height: 400,
            backgroundColor: stylesGlobal.bg_bg7.backgroundColor,
            borderColor: stylesGlobal.bg_bg5.backgroundColor,
            borderWidth: 2,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 90
        },
        blur: {
            width: 310,
            height: 400,
            alignSelf: 'center',
            marginTop: 90,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        editInfo: {
            flexDirection: 'column',
            width: '90%',
            height: '50%',
            alignSelf: 'center',
            justifyContent: 'space-evenly'
        },
        editInfoContainer : {
            alignItems: 'flex-start',
        },
        editLabels: {
            alignSelf: 'flex-start',
            marginBottom: 5
        },
        inputs: {
            height: 36,
            backgroundColor: darkMode ? stylesGlobal.color_b3.color : stylesGlobal.color_w3.color,
            borderRadius: 8,
            borderColor: darkMode ? stylesGlobal.color_b6.color : stylesGlobal.color_w5.color,
            borderWidth: 2,
            padding: 10,
        },
        largeInputs: {
            width: 280,
        },
        smallInputs: {
            width: 135,
        }
    })

    const loadUserData = async () => {
        try {
            const res = await getUser(0, 10);
            setUser(res.getMe);
            setUsername(res.getMe.username);
            setPhone(res.getMe.phone);
            setAddress(res.getMe.address);
            setFavorites([])
            
            if (res.getMe.favorites.locations.length > 0) {
                res.getMe.favorites.locations.forEach((fav) => {
                    setFavorites((prevFavorites) => [...prevFavorites, fav.title]);
                })
            }
      
            if (res.getMe.favorites.notes.length > 0) {
                res.getMe.favorites.notes.forEach((fav) => {
                    setFavorites((prevFavorites) => [...prevFavorites, fav.title]);
                })
            }

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false); // Set loading to false when the data is loaded or an error occurs
        }
        
    }

    useEffect(() => {   

        loadUserData()

    }, [])

    const handleBack = () => {
        navigation.goBack()
    }

    const handleInfo = () => {
        if(moreInfo) {
            setMoreInfo(false)
        } else {
            setMoreInfo(true)
        }
    }
    
    const handleDataType = (type) => {
        // 0 - Favorites
        // 1 - Likes
        // 2 - Trash
        // 3 - Badges

        setDataType(type)
        setDataTypeName(dataTypeNames[type])
        let dataType
        switch (type) {
            case 0:
                dataType = [
                    {color: '#2199AB', color2: '#1A7A89', fill: true},
                    {color: '#BF0D40', color2: '#990B33', fill: false},
                    {color: '#5B5B5D', color2: stylesGlobal.color_b5, fill: false},
                    {color: '#EBB700', color2: '#461D00', color3: '#ffffff', fill: false}
                ]    
                setDataTypeColor(dataType)
                setBorderStyle(
                    {
                        top: 0,
                        bot: 2,
                        right: 0.1,
                        left: 0.1
                    }
                )
                break;
            case 1:
                dataType = [
                    {color: '#2199AB', color2: '#1A7A89', fill: false},
                    {color: '#BF0D40', color2: '#990B33', fill: true},
                    {color: '#5B5B5D', color2: stylesGlobal.color_b5, fill: false},
                    {color: '#EBB700', color2: '#461D00', color3: '#ffffff', fill: false}
                ]
                setDataTypeColor(dataType)
                setBorderStyle(
                    {
                        top: 0.1,
                        bot: 0.1,
                        right: 0,
                        left: 2
                    }
                )
                break;
            case 2:
                dataType = [
                    {color: '#2199AB', color2: '#1A7A89', fill: false},
                    {color: '#BF0D40', color2: '#990B33', fill: false},
                    {color: '#5B5B5D', color2: stylesGlobal.color_b5, fill: true},
                    {color: '#EBB700', color2: '#461D00', color3: '#ffffff', fill: false}
                ]
                setDataTypeColor(dataType)
                setBorderStyle(
                    {
                        top: 2,
                        bot: 0,
                        right: 0.1,
                        left: 0.1
                    }
                )
                break;
            case 3:
                dataType = [
                    {color: '#2199AB', color2: '#1A7A89', fill: false},
                    {color: '#BF0D40', color2: '#990B33', fill: false},
                    {color: '#5B5B5D', color2: stylesGlobal.color_b5, fill: false},
                    {color: '#EBB700', color2: '#461D00', color3: '#ffffff', color4: '#097728', fill: true}
                ]
                setDataTypeColor(dataType)
                setBorderStyle(
                    {
                        top: 0.1,
                        bot: 0.1,
                        right: 2,
                        left: 0
                    }
                )
                break;
            
            default:
                break;
        }

    }

    const handleEditProfile = () => {
        setIsEdit(true)
    }

    const editUser = async () => {
        //not working
        const input = {
            username: username,
            address: address,
            phone: phone
        }

        try{
            const result = await editMe(input)
            setIsEdit(!isEdit)
            Alert.alert('User credentials changed!')
        } catch (err) {
            console.log(err);
        }

    }

    const editImage = async () => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images],
            });
    
            if (doc) {
                uploadToCloudinary(doc);
            } else {
                console.log('User cancelled the upload');
            }
        } catch (err) {
            console.log('Error picking document:', err);
        }
    }

    const uploadToCloudinary = async (fileUri) => {

        console.log(Platform.OS === 'android' ? fileUri.uri : fileUri);
        const cloudinaryUploadUrl = 'https://api.cloudinary.com/v1_1/dlcernvoy/image/upload';
        const formData = new FormData();

        // Extracting the actual URI from the fileUri object
        const uri = Platform.OS === 'android' ? fileUri.uri : fileUri;

        formData.append('file', {
            uri: uri,
            type: 'image/jpeg',
            name: 'file',
        });
        formData.append('upload_preset', 'Profile_Image');
        formData.append('cloud_name', 'dlcernvoy');

        try {
            const response = await fetch(cloudinaryUploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Cloudinary upload response:', data);

            const input = {
                image: data.url,
            }
    
            try {
                const result = await editMe(input)
                Alert.alert('User image changed!')
                loadUserData();
            } catch (err) {
                console.log(err);
            }

        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
        }
      };

    const handleConfirmation = () => {
        editUser()
    }

    const handleImage = () => {
        editImage()
    }

    if(!isLoading){
    return (
        <View style={styles.mainContainer}>
            {/*Buttons Header*/}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <View style={{transform: [{scaleX: -1}]}}>
                        <Select_Option color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditProfile}>
                    <Edit color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} />
                </TouchableOpacity>

                {/* Modal View for Editing the Profile */}  
                <Modal animationType='fade' transparent={true} visible={isEdit} onRequestClose={() => {setIsEdit(false)}}>
                    <BlurView style={[styles.blur]} blurType="extraDark" blurRadius={10} reducedTransparencyFallbackColor="white">
                        <View style={styles.editProfile}>

                            {/* Edit Header */}
                            <View style={styles.headerContainer}>
                                <TouchableOpacity onPress={() => {
                                    setIsEdit(false)
                                    setUsername(user.username)}}>
                                    <View style={{transform: [{scaleX: -1}]}}>
                                        <Close color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleConfirmation}>
                                    <Check color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                </TouchableOpacity>
                            </View>
                            {/* Image Section */}
                            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%'}}>
                                <View>
                                    <Image style={[styles.image, {borderColor: 'white', opacity: 0.7}]} source={{uri: `${user.image}`}}/>
                                </View>
                                <View style={{zIndex: 1, position: 'absolute'}}>
                                    <TouchableOpacity onPress={handleImage}>
                                        <Edit color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* Edit Section */}
                            <View style={styles.editInfo}>
                                <View style={styles.editInfoContainer}>
                                    <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Username</Text>
                                    <TextInput style={[styles.largeInputs, styles.text, styles.inputs]} value={username} onChange={(e) => {setUsername(e.nativeEvent.text)}}/>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.editInfoContainer}>
                                        <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Phone Number</Text>
                                        <TextInput style={[styles.smallInputs, styles.text, styles.inputs]} value={phone.toString()} onChange={(e) => {setPhone(e.nativeEvent.text)}}/>
                                    </View>
                                    <View style={[styles.editInfoContainer, {marginLeft: 10}]}>
                                        <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Zip Code</Text>
                                        <TextInput style={[styles.smallInputs, styles.text, styles.inputs]} value={zip} onChange={(e) => {setZip(e.nativeEvent.text)}}/>
                                    </View>
                                </View>
                                    <View style={styles.editInfoContainer}>
                                        <Text style={[styles.text, stylesGlobal.font_bodySmall, styles.editLabels]}>Address</Text>
                                        <TextInput style={[styles.largeInputs, styles.text, styles.inputs]} value={address} onChange={(e) => {setAddress(e.nativeEvent.text)}}/>
                                    </View>
                            </View>
                        </View>
                    </BlurView>
                </Modal>
                
            </View>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {/* Name info + Image Area */}
                <View style={styles.content}>
                    <View>
                        {/* Names Info Area */}
                        <View style={styles.nameArea}>
                            <Text style={[stylesGlobal.font_h3, styles.text]}>{user.name}</Text>
                            <Text style={[stylesGlobal.font_bodySmall, styles.text]}>{username}</Text>
                        </View>
                        {/* Image */}
                        <View style={styles.imageContainer}>
                            <View style={[styles.item]}>
                                <TouchableOpacity onPress={() => {handleDataType(2)}}>
                                    <Trash fill={dataTypeColor[2].fill} 
                                    color2={ dataTypeColor[2].fill ? dataTypeColor[2].color2 : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)} 
                                    color={ dataTypeColor[2].fill ? dataTypeColor[2].color : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)}/>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.imageContainerMiddle, styles.item]}>
                                    <TouchableOpacity onPress={() => {handleDataType(1)}}>
                                        <HeartProfile fill={dataTypeColor[1].fill} 
                                        color2={ dataTypeColor[1].fill ? dataTypeColor[1].color2 : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)} 
                                        color={ dataTypeColor[1].fill ? dataTypeColor[1].color : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)}/>
                                    </TouchableOpacity>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Image style={styles.image} source={{uri: `${user.image}`}}/>
                                        <View style={[styles.outterBorder, {zIndex: 1, position: 'absolute'}]}/>
                                    </View>
                                    <TouchableOpacity onPress={() => {handleDataType(3)}}>
                                        <Badge fill={dataTypeColor[3].fill} 
                                        color2={ dataTypeColor[3].fill ? dataTypeColor[3].color2 : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)} 
                                        color={ dataTypeColor[3].fill ? dataTypeColor[3].color : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)}
                                        color3={ dataTypeColor[3].fill ? dataTypeColor[3].color3 : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)}/>
                                    
                                    </TouchableOpacity>
                            </View>
                            <View style={[styles.item]}>
                                <TouchableOpacity onPress={() => {handleDataType(0)}}>
                                    <StarProfile fill={dataTypeColor[0].fill} 
                                    color2={ dataTypeColor[0].fill ? dataTypeColor[0].color2 : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)} 
                                    color={ dataTypeColor[0].fill ? dataTypeColor[0].color : (darkMode ? stylesGlobal.color_b5 : stylesGlobal.color_w5)}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Selected Information */}
                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, stylesGlobal.font_h4, {textDecorationLine: 'underline'}]}>{dataTypeName}</Text>
                            <View>
                                <Information info={favorites} moreInfo={moreInfo} dataType={dataType}/>
                            </View>
                            <TouchableOpacity style={{marginBottom: 10}} onPress={handleInfo}>
                                {moreInfo ? (
                                    <ChevronUp color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                ) : (
                                    <ChevronDown color={darkMode ? stylesGlobal.color_w1 : stylesGlobal.color_b1}/>
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View>
                        <Settings />
                    </View>
                </View>
            </ScrollView>
            </View>
        )
    }
}
