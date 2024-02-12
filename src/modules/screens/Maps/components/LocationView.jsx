import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Linking, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import stylesGlobal from '../../../../css/style'
import { Reply, Star, WalkieTalkie, Reservation, Compass, Globe, Check, CheckBox } from '../../../components/Svg'
import ButtonAction from './ButtonAction'
import CommentBox from './CommentBox'
import InfoLine from './InfoLine'

import { favoriteLocation, createComment } from '../../../../../api/maps'

import { user } from '../../../../utilities/utilities'

export default function LocationView({ location, setLocation, setDestination, directionInfo }) {
    const [toogleRoute, setToogleRoute] = useState(false)
    const [favorites, setFavorites] = useState(user.favorites.locations)
    const [direction, setDirection] = useState(null)

    const [comments, setComments] = useState(location.comments)

    const [createCommentState, setCreateComment] = useState('')

    const handleSubmit = () => {
        if (createCommentState) {
            setComments(prev => [{
                creator: {
                    id: user.id,
                    image: user.image,
                    username: user.username
                },
                description: createCommentState,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                likes: [],
                dontShow: true,
            }, ...prev])
            createComment(location.id, createCommentState)
            setCreateComment('')
        }
            }

    useEffect(() => {
        setDirection(directionInfo)
    }, [directionInfo])


    if (toogleRoute) {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    setDestination(undefined);
                    setToogleRoute(false)
                }}>
                <View
                    style={[styles.container, stylesGlobal.bg_b3, { paddingHorizontal: 20, paddingBottom: 70 }]}
                >
                    <View style={[{ width: 106, height: 5, alignSelf: 'center', marginBottom: 30, borderRadius: 5 }, stylesGlobal.bg_b5]}></View>
                    <Text style={[stylesGlobal.font_h3, stylesGlobal.color_w1]}>{location.title}</Text>
                    <Text style={[stylesGlobal.font_subtitle, stylesGlobal.color_w4]}>{location.category}</Text>
                    {direction ? <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'space-between' }}>
                        <Text style={stylesGlobal.font_bodyLarge}>{direction.distance.text}</Text>
                        <Text style={stylesGlobal.font_bodyLarge}>{direction.duration.text}</Text>
                    </View>
                        : undefined
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (

            <View style={{ position: 'absolute', height: '100%', bottom: 0, width: '100%' }}>
                <TouchableOpacity style={{ flexGrow: 1 }} onPress={() => setLocation(undefined)}></TouchableOpacity>
                                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={[styles.container, stylesGlobal.bg_b3]}
                    >
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <View style={[{ width: 106, height: 5, alignSelf: 'center', marginBottom: 30, borderRadius: 5 }, stylesGlobal.bg_b5]}></View>
                            <Text style={[stylesGlobal.font_h3, stylesGlobal.color_w1]}>{location.title}</Text>
                            <Text style={[stylesGlobal.font_subtitle, stylesGlobal.color_w4]}>{location.category}</Text>
                            <ScrollView style={{
                                overflow: 'visible',
                                marginTop: 10
                            }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                <ButtonAction text={'Get Directions'} action={() => {
                                    setDestination({ latitude: location.latitude, longitude: location.longitude });
                                    setToogleRoute(true);
                                }}><Reply color={stylesGlobal.color_w1} /></ButtonAction>
                                {favorites.some((userLocation) => userLocation.id == location.id) ?
                                    <ButtonAction text={'Favorite'} action={() => {
                                        setFavorites((prevArray) => prevArray.map(prev => prev.id == location.id ? { id: undefined } : prev));
                                        favoriteLocation(location.id);
                                    }}>
                                        <Star color={stylesGlobal.color_w1} color2={stylesGlobal.color_w2} fill={true} /></ButtonAction>
                                    : <ButtonAction text={'Favorite'} action={() => {
                                        setFavorites((prev) => [...prev, { id: location.id }]);
                                        favoriteLocation(location.id);
                                    }}>
                                        <Star color={stylesGlobal.color_w1} /></ButtonAction>
                                }
                                <ButtonAction text={'Make Phone Call'} action={() => {
                                    Linking.openURL(`tel:${location.phone}`)
                                }}>
                                    <WalkieTalkie color={stylesGlobal.color_w1} /></ButtonAction>
                                {!location.reservationIsPossible ? <ButtonAction text={'Make Reservation'}><Reservation color={stylesGlobal.color_w1} /></ButtonAction> : undefined}
                            </ScrollView>
                            <Image style={{ height: 160, width: 160, marginTop: 15, marginBottom: 15 }} source={{ uri: location.images[0] }} />
                            <View>
                                <InfoLine text={`${location.address}, ${location.zone} \n ${location.postalCode}`}>
                                    <Reply color={stylesGlobal.color_bg2} />
                                </InfoLine>
                                <InfoLine text={`${location.latitude}, ${location.longitude}`}>
                                    <Compass color={stylesGlobal.color_bg2} />
                                </InfoLine>
                                <InfoLine text={location.site}>
                                    <Globe color={stylesGlobal.color_bg2} />
                                </InfoLine>
                                <InfoLine text={location.phone}>
                                    <WalkieTalkie color={stylesGlobal.color_bg2} />
                                </InfoLine>
                            </View>
                            <Text style={[stylesGlobal.font_h3, stylesGlobal.color_w1]}>Comments</Text>
                            <View style={styles.createComment}>
                                <View style={[stylesGlobal.bg_w2, { borderRadius: 50, width: 32, height: 32, justifyContent: 'center', alignItems: 'center', marginRight: 5 }]}>
                                    <Image style={[styles.icon, stylesGlobal.border_bg4]}
                                        source={{
                                            uri: user.image
                                        }} />
                                </View>
                                <TextInput
                                    multiline={true}
                                    value={createCommentState}
                                    onChangeText={setCreateComment}
                                    onSubmitEditing={handleSubmit}
                                    blurOnSubmit={true}
                                    style={[styles.commentText, stylesGlobal.bg_w4]}
                                />
                                <TouchableWithoutFeedback onPress={handleSubmit}>
                                    <View style={[stylesGlobal.bg_bg6,
                                    { marginLeft: 5, width: 35, height: 35, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }
                                    ]}>
                                        <Check color={stylesGlobal.color_bg1} /></View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ marginBottom: 50, rowGap: 15 }}>
                                {comments.length ? comments.map(comment => (<CommentBox key={`comment${comment.id}`} {...comment} />)).reverse() : <Text> No comments yet!</Text>}
                            </View>
                        </View>
                    </ScrollView>
                            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '80%',
        paddingTop: 15,
        paddingBottom: 40,
        position: 'absolute',
        bottom: 0,
        width: "100%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    gallery: {
        marginTop: 15,
        marginBottom: 15,
    },
    infoLine: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: 'center',

    },
    infoText: {
        marginLeft: 12
    },
    createComment: {
        height: "400",
        flexDirection: "row",
        alignItems: 'center',
        overflow: 'visible',
        marginVertical: 15,
    },
    commentText: {
        width: "75%",
        flexGrow: 1,
        borderRadius: 20,
        padding: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    icon: {
        top: 0,
        height: 30,
        width: 30,
        borderRadius: 500,
    }
})