import {fetchAPI} from './api';
//querys
export const getNotes = async (page, pageSize) => {
  return fetchAPI(`
  query ($page: Int!, $pageSize: Int!) {
    getNotes(page: $page, pageSize: $pageSize) {
      chapter {
        id
        color
        title
      }
      components {
        id
        description
        type
        value
        noteId
      }
      createdAt
      creator {
        username
        id
      }
      icon
      id
      shareWith {
        username
        id
      }
      tags {
        id
        text
        color
      }
      title
      trash
      updatedAt
    }
  }`,
    {page: page, pageSize: pageSize},
  );
};
export const getFavoriteNotes = async (page, pageSize) => {
  return fetchAPI(`
  query ($page: Int!, $pageSize: Int!) {
    getFavoriteNotes(page: $page, pageSize: $pageSize) {
      id
      icon
      title
      trash
      createdAt
      updatedAt
      creator {
        username
        id
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
  }`,
    {page: page, pageSize: pageSize},
  );
};

export const getUserChapters = async (page, pageSize) => {
  return fetchAPI(`
  query ($page: Int!, $pageSize: Int!) {
    getUserChapters(page: $page, pageSize: $pageSize) {
      id
      color
      title
    }
  }`,
    {page: page, pageSize: pageSize},
  );
};
export const getUserTags = async () => {
  return fetchAPI(`
  query {
    getUserTags {
      id
      text
      color
    }
  }`);
};

//mutations
export const createNote = async () => {
  return fetchAPI(`
  mutation {
    createNote
  }`);
};
export const editNote = async (noteId, input) => {
  return fetchAPI(`
  mutation ($noteId: ID!, $input: NoteInput){
    editNote(noteID: $noteId, input: $input)
  }`, {noteId: noteId, input: input});
};
export const trashNote = async noteId => {
  return fetchAPI(`
  mutation ($noteId: ID!){
    trashNote(noteID: $noteId)
  }`, {noteId: noteId});
};
export const favoriteNote = async noteId => {
  return fetchAPI(`
  mutation ($noteId: ID!){
    favoriteNote(noteID: $noteId)
  }`, {noteId: noteId});
};

export const createComponent = async (noteId, input) => {
  return fetchAPI(`
  mutation ($input: ComponentInput!, $noteId: ID!) {
    createComponent(input: $input, noteID: $noteId)
  }`, {noteId: noteId, input: input});
};
export const editComponent = async (componentId, input) => {
  return fetchAPI(`
  mutation ($componentId: ID!, $input: EditComponentInput) {
    editComponent(componentID: $componentId, input: $input)
  }`, {componentId: componentId, input: input});
};
export const deleteComponent = async componentId => {
  return fetchAPI(`
  mutation ($componentId: ID!) {
    deleteComponent(componentID: $componentId)
  }`, {componentId: componentId});
};

export const createChapter = async input => {
  return fetchAPI(`
  mutation ($input: ChapterInput) {
    createChapter(input: $input)
  }`, {input: input});
};
export const editChapter = async (chapterId, input) => {
  return fetchAPI(`
  mutation ($input: EditChapterInput!, $chapterId: ID!) {
    editChapter(input: $input, chapterID: $chapterId)
  }`, {input: input, chapterId: chapterId});
};
export const deleteChapter = async chapterId => {
  return fetchAPI(`
  mutation ($chapterId: ID!) {
    deleteChapter(chapterID: $chapterId)
  }`, {chapterId: chapterId});
};
export const addChapter = async (noteId, chapterId) => {
  return fetchAPI(`
  mutation ($noteId: ID!, $chapterId: ID!) {
    addChapter(noteID: $noteId, chapterID: $chapterId)
  }`, {noteId: noteId, chapterId: chapterId});
};
export const removeChapter = async (noteId, chapterId) => {
  return fetchAPI(`
  mutation ($noteId: ID!, $chapterId: ID!) {
    removeChapter(noteID: $noteId, chapterID: $chapterId)
  }`, {noteId: noteId, chapterId: chapterId});
};

export const createTag = async (noteId, input) => {
  return fetchAPI(`
  mutation ($noteId: ID!, $input: TagInput!) {
    createTag(noteID: $noteId, input: $input)
  }`, {noteId: noteId, input: input});
};
export const editTag = async (tagId, input) => {
  return fetchAPI(`
  mutation ($tagId: ID!, $input: TagInput) {
    editTag(tagID: $tagId, input: $input)
  }`, {tagId: tagId, input: input});
};
export const deleteTag = async tagId => {
  return fetchAPI(`
  mutation ($tagId: ID!) {
    deleteTag(tagID: $tagId)
  }`, {tagId: tagId});
};
export const addTag = async (noteId, tagId) => {
  return fetchAPI(`
  mutation ($tagId: ID!, $noteId: ID!) {
    addTag(tagID: $tagId, noteID: $noteId)
  }`, {noteId: noteId, tagId: tagId});
};
export const removeTag = async (noteId, tagId) => {
  return fetchAPI(`
  mutation ($tagId: ID!, $noteId: ID!) {
    removeTag(tagID: $tagId, noteID: $noteId)
  }`, {noteId: noteId, tagId: tagId,});
};
