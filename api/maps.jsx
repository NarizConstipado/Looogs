import { fetchAPI } from './api'


const getLocationsQuery = `query ($page: Int!, $pageSize: Int!, $commentsPage2: Int!, $commentsPageSize2: Int!) {
  getLocations(page: $page, pageSize: $pageSize) {
    id
    address
    postalCode
    zone
    title
    category
    images
    latitude
    longitude
    reservationIsPossible
    favorite
    phone
    site
    comments(page: $commentsPage2, pageSize: $commentsPageSize2) {
      id
      likes {
        id
      }
      createdAt
      updatedAt
      creator {
        image
        username
        id
      }
      description
      edited
    }
  }
}`

const addLikeQuery = `mutation ($commentId: ID!) {
  addLike(commentID: $commentId)
}`;

const removeLikeQuery = `mutation ($commentId: ID!) {
  removeLike(commentID: $commentId)
}`

const favoriteLocationQuery = `mutation ($locationId: ID!) {
  favoriteLocation(locationID: $locationId)
}`

const createCommentQuery = `mutation ($description: String!, $locationId: ID!) {
  createComment(description: $description, locationID: $locationId)
}`

const editCommentQuery = `mutation ($commentId: ID!, $description: String!) {
  editComment(commentID: $commentId, description: $description)
}`

const getLocationsByTitleQuery = `query ($title: String!, $page: Int!, $pageSize: Int!) {
  getLocationsByTitle(title: $title, page: $page, pageSize: $pageSize) {
    title
    zone
    postalCode
    images
    id
    category
    address
  }
}`

const getLocationsByCategoryQuery = `query ($tag: String!, $page: Int!, $pageSize: Int!) {
  getLocationsByCategory(tag: $tag, page: $page, pageSize: $pageSize) {
    title
    zone
    postalCode
    images
    id
    address
    category
  }
}`

const getLocationByIdQuery = `query ($locationId: ID!, $page: Int!, $pageSize: Int!) {
  getLocationById(locationID: $locationId) {
    id
    address
    postalCode
    zone
    title
    category
    images
    latitude
    longitude
    reservationIsPossible
    favorite
    phone
    site
    comments(page: $page, pageSize: $pageSize) {
      createdAt
      creator {
        image
        username
        id
      }
      id
      likes {
        id
      }
      locationId
      description
      updatedAt
    }
  }
}`


export const getLocations = async () => {
  return await fetchAPI(getLocationsQuery, {
    page: 0,
    pageSize: 5,
    commentsPage2: 0,
    commentsPageSize2: 5,
  });
};

export const addLike = async (commentID) => {
  return await fetchAPI(addLikeQuery, { commentId: commentID });
}

export const removeLike = async (commentID) => {
  return await fetchAPI(removeLikeQuery, { commentId: commentID });
};

export const favoriteLocation = async (locationID) => {
  return await fetchAPI(favoriteLocationQuery, { locationId: locationID });
}

export const createComment = async (locationID, description) => {
  return await fetchAPI(createCommentQuery, { locationId: locationID, description: description });
}

export const editComment = async (commentID, description) => {
  return await fetchAPI(editCommentQuery, { commentId: commentID, description: description });
}

export const getLocationsByTitle = async (title, page, pageSize) => {
  return await fetchAPI(getLocationsByTitleQuery, { title: title, page: page, pageSize: pageSize })
}

export const getLocationsByCategory = async (category, page, pageSize) => {
  return await fetchAPI(getLocationsByCategoryQuery, { tag: category, page: page, pageSize: pageSize })
}

export const getLocationById = async (locationID) => {
  return await fetchAPI(getLocationByIdQuery, { locationId: locationID, page: 0, pageSize: 5 })
}