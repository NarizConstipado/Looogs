import {fetchAPI} from './api';
//gets
export const getUser = async (page, pageSize) => {
  return fetchAPI(`
  query GetMe($page: Int!, $pageSize: Int!) {
    getMe {
      address
      notes(page: $page, pageSize: $pageSize) {
        trash
        title
      }
      phone
      name
      username
      image
      favorites {
        locations {
          title
        }
        notes {
          title
        }
      }
    }
  }`, {page: page, pageSize: pageSize});
};

export const getUserFavorites = async () => {
  return fetchAPI(`
  query {
    getMe {
      id
      name
      favorites {
        notes {
          id
          title
          icon
          trash
          createdAt
        }
        locations {
          id
          title
        }
      }
    }
  }`)
};

export const editMe = async (input) => {
  return fetchAPI(`
  mutation Mutation($input: UserInput!) {
    editMe(input: $input)
  }
  `, {input: input})
}

export const login = async (username, password) => {
  return fetchAPI(`
  query Query($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
  `, {username: username, password: password})
}

export const register = async (input) => {
  return fetchAPI(`
  mutation Register($input: UserInput!) {
    register(input: $input)
  }`, {input: input})
}