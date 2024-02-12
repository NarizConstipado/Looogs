import { fetchAPI } from './api'


const getMeQuery = `
    query {
        getMe {
            id
            name
            username
            address
            phone
            image
            favorites {
                notes {
                  id
                  title
                  icon
                  createdAt
                }
                locations {
                  id
                  title
                }
            }
        }
    }
`;

const getSearchingQuery = `
  query ($title: String!, $page: Int!, $pageSize: Int!) {
  getNotesByTitle(title: $title, page: $page, pageSize: $pageSize) {
    id
    title
    icon
  }
  getLocationsByTitle(title: $title, page: $page, pageSize: $pageSize) {
    id
    title
  }
  getUserChaptersByTitle(title: $title, page: $page, pageSize: $pageSize) {
    id
    title
  }
}`;

const getNoteByIdQuery = `query ($noteId: ID!) {
  getNoteById(noteID: $noteId) {
    id
    icon
    title
    trash
    createdAt
    updatedAt
    creator {
      id
      username
    }
    chapter {
      id
      color
      title
    }
    shareWith {
      id
      username
    }
    components {
      id
      description
      type
      value
      noteId
    }
    tags {
      id
      text
      color
    }
  }
}`


export const getMe = async () => {
  return await fetchAPI(getMeQuery);
};

export const getSearching = async value => {
  return await fetchAPI(getSearchingQuery, {
    title: value,
    page: 0,
    pageSize: 5,
  });
};

export const getNoteById = async (id) => {
  return await fetchAPI(getNoteByIdQuery, { noteId: id });
}
