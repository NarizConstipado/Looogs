import { View, Text, Image, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import stylesGlobal from '../../../../css/style'
import { Heart, Edit, ChevronUp, ChevronDown, Close, Check, CheckBox } from '../../../components/Svg'
import { user } from '../../../../utilities/utilities'

import { addLike, removeLike, editComment } from '../../../../../api/maps'

const convertDate = (timestamp) => {

    const date = new Date(parseInt(timestamp));
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short', // Abbreviated month name
        day: '2-digit', // Two-digit day
        year: '2-digit',
        hour: '2-digit', // Two-digit hour
        minute: '2-digit' // Two-digit minute
    });
    formattedDate.replace("/, /", "/")
    return formattedDate
}

export default function CommentBox({ creator, description, id, likes, edited, createdAt, updatedAt, dontShow }) {
    const [showMore, setShowMore] = useState(false)
    const [descriptionState, setDescription] = useState(description)
    const [likesArray, setLikesArray] = useState(likes)
    const [editedState, setEdited] = useState(edited)

    const [editing, setEditing] = useState(false)
    const [descriptionEditing, setDescriptionEditing] = useState(description)
    const [createdAtState, setCreatedAt] = useState(updatedAt)

    function handleEdit() {
        if (descriptionState != descriptionEditing) {
            setDescription(descriptionEditing);
            setEdited(true);
            editComment(id, descriptionEditing)
            setCreatedAt(new Date().getTime())
        }
        setEditing(false);
    }

    function handleCancel() {
        setEditing(false);
        setDescriptionEditing(descriptionState);
    }

    if (!editing) {
        return (
            <View style={[styles.container, stylesGlobal.bg_b5]}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={{
                                uri: creator.image
                            }} />
                        <View style={{ marginLeft: 6 }}>
                            <Text style={[stylesGlobal.color_w1, stylesGlobal.font_h4]}>{creator.username}</Text>
                            <Text style={[stylesGlobal.color_w1, stylesGlobal.font_detailTyne]}>{convertDate(createdAtState)}</Text>
                        </View>
                    </View>
                    {!dontShow ?

                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            {user.id == creator.id ?
                                <TouchableWithoutFeedback onPress={() => setEditing(true)}>
                                    <View>
                                        <Edit color={stylesGlobal.color_w1} />
                                    </View>
                                </TouchableWithoutFeedback>
                                : undefined
                            }
                            {likesArray.some((u) => u.id == user.id) ?
                                <TouchableWithoutFeedback onPress={() => {
                                    removeLike(id);
                                    setLikesArray(likesArray.map(like => like.id != user.id ? like : { id: undefined }))
                                }}>
                                    <View>
                                        <Heart color={stylesGlobal.color_r2} color2={stylesGlobal.color_r1} fill={true} />
                                    </View>
                                </TouchableWithoutFeedback>
                                :
                                <TouchableNativeFeedback onPress={() => {
                                    addLike(id);
                                    setLikesArray(prevArray => [...prevArray, { id: user.id }])
                                }}>
                                    <View>
                                        <Heart color={stylesGlobal.color_w1} color2={stylesGlobal.color_w1} />
                                    </View>
                                </TouchableNativeFeedback>
                            }
                        </View> : undefined
                    }
                </View>
                {editedState ?
                    < Text style={[stylesGlobal.font_bodySmall, { textAlign: 'right' }]}>edited</Text>
                    :
                    undefined
                }
                <Text numberOfLines={showMore ? 0 : 1} style={[stylesGlobal.color_w1, stylesGlobal.font_bodySmall, { marginTop: 4 }]}>{descriptionState}</Text>
                <View style={[styles.footer]}>
                    {showMore ?
                        <TouchableWithoutFeedback onPress={() => setShowMore(false)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[stylesGlobal.color_bg1, stylesGlobal.font_bodySmall]}>Less</Text>
                                <ChevronUp color={stylesGlobal.color_bg1} />
                            </View>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback onPress={() => setShowMore(true)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[stylesGlobal.color_bg1, stylesGlobal.font_bodySmall]}>More</Text>
                                <ChevronDown color={stylesGlobal.color_bg1} />
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>
            </View >
        )
    } else {
        return (
            <View style={[styles.container, stylesGlobal.bg_b5]}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={{
                                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
                            }} />
                        <View style={{ marginLeft: 6 }}>
                            <Text style={[stylesGlobal.color_w1, stylesGlobal.font_h4]}>{creator.username}</Text>
                            <Text style={[stylesGlobal.color_w1, stylesGlobal.font_detailTyne]}>{convertDate(createdAt)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                        <TouchableWithoutFeedback onPress={() => handleEdit()}>
                            <View>
                                <CheckBox color={stylesGlobal.color_w1} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => handleCancel()}>
                            <View>
                                <Close color={stylesGlobal.color_r1} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TextInput
                    multiline={true}
                    value={descriptionEditing}
                    onChangeText={setDescriptionEditing}
                    onSubmitEditing={handleEdit}
                    blurOnSubmit={true}
                    style={[stylesGlobal.color_w1, stylesGlobal.font_bodySmall, stylesGlobal.bg_b6, { marginTop: 4 }, styles.edit]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    icon: {
        height: 30,
        width: 30,
        borderRadius: 50
    },
    footer: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    edit: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
    }
})