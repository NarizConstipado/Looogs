import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getNotes,
  getFavoriteNotes,
  getUserChapters,
  getUserTags,
  createNote,
  favoriteNote,
  editNote,
  trashNote,
  createChapter,
  editChapter,
  removeChapter,
  deleteChapter,
  addChapter,
  createTag,
  editTag,
  removeTag,
  deleteTag,
  addTag,
  createComponent,
  editComponent,
  deleteComponent,
} from '../../api/notes.jsx';

export const storeData = async (path, items) => {
  try {
    const jsonValue = JSON.stringify(items);
    await AsyncStorage.setItem(path, jsonValue);
  } catch (e) {
    console.error(e);
  }
};
export const getData = async path => {
  try {
    const value = await AsyncStorage.getItem(path);
    if (value !== null) return JSON.parse(value);
    else return 'no data';
  } catch (e) {
    console.error(e);
  }
};
export const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};
import {getMe} from '../../api/home';

let user = new Promise((resolver, reject) => {
  resolver(
    getMe().then(res => {
      user = res.getMe;
    }),
  );
});

export const checkForUpdates = async (
  setChapters,
  setTags,
  setFavoriteNotes,
  setNotes,
) => {
  let notesResponse = await getNotes(0, 20);
  const fetchedNotes = notesResponse.getNotes;
  let favResponse = await getFavoriteNotes(0, 20);
  const fetchedFavoriteNotes = favResponse.getFavoriteNotes;
  let chapterResponse = await getUserChapters(0, 20);
  const fetchedChapters = chapterResponse.getUserChapters;
  let tagResponse = await getUserTags();
  const fetchedTags = tagResponse.getUserTags;

  const updateOnlineChapters = async (storedChapters, onlineChapters) => {
    const storedChapterIds = storedChapters.map(chapter => chapter.id);
    const onlineChapterIds = onlineChapters.map(chapter => chapter.id);

    for (const chapterID of storedChapterIds) {
      const storedChapter = storedChapters.find(c => c.id === chapterID);
      const onlineChapter = onlineChapters.find(c => c.id === chapterID);

      if (
        onlineChapterIds.includes(chapterID) &&
        JSON.stringify(storedChapter) !== JSON.stringify(onlineChapter)
      ) {
        // update chapter
        await editChapter(storedChapter.id, {
          title: storedChapter.title,
          color: storedChapter.color,
        });
      } else if (!onlineChapterIds.includes(chapterID)) {
        const storedChapter = storedChapters.find(
          chapter => chapter.id === chapterID,
        );
        // create chapter
        await createChapter({
          color: storedChapter.color,
          title: storedChapter.title,
        });
      }
    }

    for (const chapterID of onlineChapterIds) {
      if (!storedChapterIds.includes(chapterID)) {
        // delete chapter
        await deleteChapter(chapterID);
      }
    }

    const response = await getUserChapters(0, 20);
    const newFetch = response.getUserChapters;
    setChapters(newFetch);
    await storeData('userChapters', newFetch);
  };
  const updateOnlineTags = async (storedTags, onlineTags) => {
    const storedTagIds = storedTags.map(tag => tag.id);
    const onlineTagIds = onlineTags.map(tag => tag.id);

    for (const id of storedTagIds) {
      let storedTag = storedTags.find(tag => tag.id === id);
      let onlineTag = onlineTags.find(tag => tag.id === id);
      if (
        onlineTagIds.includes(id) &&
        JSON.stringify(storedTag) !== JSON.stringify(onlineTag)
      ) {
        // update tag
        await editTag(storedTag.id, {
          text: storedTag.text,
          color: storedTag.color,
        });
      }
    }

    for (const id of onlineTagIds) {
      if (!storedTagIds.includes(id)) {
        // delete tag
        await deleteTag(id);
      }
    }

    const response = await getUserTags(0, 20);
    const newTagFetch = response.getUserTags;
    setTags(newTagFetch);
    await storeData('userTags', newTagFetch);
  };
  const updateOnlineNotes = async (
    storedNotes,
    onlineNotes,
    storedFavNotes,
    onlineFavNotes,
  ) => {
    const allStoredNotes = storedNotes.concat(storedFavNotes);
    const allOnlineNotes = onlineNotes.concat(onlineFavNotes);

    const allStoredNotesIds = allStoredNotes.map(note => note.id);
    const allOnlineNotesIds = allOnlineNotes.map(note => note.id);

    for (const noteID of allStoredNotesIds) {
      // compare note localy and online on if allow to update or not
      const currentStoredNote = allStoredNotes.find(note => note.id === noteID);
      const currentOnlineNote = allOnlineNotes.find(note => note.id === noteID);
      if (
        allOnlineNotesIds.includes(noteID) &&
        JSON.stringify(currentStoredNote) !== JSON.stringify(currentOnlineNote)
      ) {
        console.log('updating note');
        //get note object
        const storedNote = allStoredNotes.find(note => note.id === noteID);
        const onlineNote = allOnlineNotes.find(note => note.id === noteID);
        // update note
        if (
          storedNote.title !== onlineNote.title ||
          storedNote.color !== onlineNote.color
        ) {
          await editNote(storedNote.id, {
            title: storedNote.title,
            icon: storedNote.icon,
          });
        }
        // update trash
        if (storedNote.trash !== onlineNote.trash) {
          await trashNote(storedNote.id);
        }
        // add/change chapter - update/create is done in updateOnlineChapters
        if (
          (storedNote.chapter !== null && onlineNote.chapter === null) ||
          (storedNote.chapter !== null && onlineNote.chapter !== null)
        ) {
          // procurar pelo nome igual
          let response = await getUserChapters(0, 20);
          let fetchChapters = response.getUserChapters;
          let newChapter = fetchChapters.find(
            chapter => chapter.title == storedNote.chapter.title,
          );
          if (newChapter === undefined)
            newChapter = fetchChapters.find(
              chapter => chapter.id == storedNote.chapter.id,
            );
          if (newChapter !== undefined)
            await addChapter(storedNote.id, newChapter.id);
        } else if (storedNote.chapter === null && onlineNote.chapter !== null) {
          await removeChapter(storedNote.id, onlineNote.chapter.id);
        }
        //connect tags
        if (
          JSON.stringify(storedNote.tags) !== JSON.stringify(onlineNote.tags)
        ) {
          let response = await getUserTags();
          let fetchTags = response.getUserTags;
          const fetchTagsIds = fetchTags.map(tag => tag.id);
          const noteTagsIds = storedNote.tags.map(tag => tag.id);
          for (const tagID of noteTagsIds) {
            if (fetchTagsIds.includes(tagID)) {
              //if online has it, connect to it
              await addTag(storedNote.id, tagID);
            } else {
              //if online dont have create
              let newTag = storedNote.tags.find(tag => tag.id === tagID);
              await createTag(storedNote.id, {
                text: newTag.text,
                color: newTag.color,
              });
            }
          }
          const onlineNoteTagsIds = onlineNote.tags.map(tag => tag.id);
          //apenas faz sentido na questão do editar
          for (const tagID of onlineNoteTagsIds) {
            if (!noteTagsIds.includes(tagID)) {
              //remove tag
              await removeTag(storedNote.id, tagID);
            }
          }
        }
        //add favorite note
        const favoriteIds = storedFavNotes.map(note => note.id);
        const onlineFavIds = onlineFavNotes.map(note => note.id);
        if (
          favoriteIds.includes(storedNote.id) !=
          onlineFavIds.includes(storedNote.id)
        ) {
          await favoriteNote(storedNote.id);
        }

        //components
        if (
          JSON.stringify(storedNote.components) !==
          JSON.stringify(onlineNote.components)
        ) {
          const storedComponents = storedNote.components.map(
            component => component.id,
          );
          const onlineComponents = onlineNote.components.map(
            component => component.id,
          );

          for (const componentID of onlineComponents) {
            if (!storedComponents.includes(componentID)) {
              console.log('deleting component');
              //remove component
              await deleteComponent(componentID);
            }
          }

          for (const componentID of storedComponents) {
            let currentComponent = storedNote.components.find(
              component => component.id === componentID,
            );
            const onlineComponent = onlineNote.components.find(
              component => component.id === componentID,
            );
            if (
              onlineComponents.includes(componentID) &&
              JSON.stringify(currentComponent) !==
                JSON.stringify(onlineComponent)
            ) {
              // update component
              await editComponent(currentComponent.id, {
                type: currentComponent.type,
                description: currentComponent.description,
                value: currentComponent.value,
              });
            } else if (!onlineComponents.includes(componentID)) {
              // create component
              console.log(onlineNote.id, currentComponent)
              let response = await createComponent(onlineNote.id, {
                type: currentComponent.type,
                description: currentComponent.description,
                value: currentComponent.value,
              });
              console.log(response)
            }
          }
        }
      } else if (!allOnlineNotesIds.includes(noteID)) {
        console.log('creating note');
        const newStoredNote = allStoredNotes.find(note => note.id === noteID);
        // create note
        let response = await createNote();
        const pattern = /Note (\d+) created successfully./;
        const match = pattern.exec(response.createNote);
        const newNoteId = match[1];
        // edit note
        await editNote(newNoteId, {
          title: newStoredNote.title,
          icon: newStoredNote.icon,
        });
        // update trashed note
        if (newStoredNote.trash) await trashNote(newStoredNote.id);
        // connect chapter
        if (newStoredNote.chapter !== null) {
          // procurar pelo nome igual e pronto
          let response = await getUserChapters(0, 20);
          let fetchChapters = response.getUserChapters;
          let newChapter = fetchChapters.find(
            chapter => chapter.title == newStoredNote.chapter.title,
          );
          await addChapter(newNoteId, newChapter.id);
        }
        // connect tags
        if (newStoredNote.tags.length > 0) {
          let response = await getUserTags();
          let fetchTags = response.getUserTags;
          const fetchTagsIds = fetchTags.map(tag => tag.id);
          const storedTagsIds = newStoredNote.tags.map(tag => tag.id);

          for (const tagID of storedTagsIds) {
            if (fetchTagsIds.includes(tagID)) {
              //if online has it connect to it
              await addTag(newNoteId, tagID);
            } else {
              //find tag
              let newTag = newStoredNote.tags.find(tag => tag.id === tagID);
              //if online dont have create
              await createTag(newNoteId, {
                text: newTag.text,
                color: newTag.color,
              });
            }
          }

          //apenas faz sentido na questão do editar
          // for (const tagID of fetchTagsIds) {
          //   if(!storedTagsIds.includes(tagID)) {}
          //     //remove tag
          // }
        }
        //add favorite note
        const favoriteIds = storedFavNotes.map(note => note.id);
        if (favoriteIds.includes(noteID)) await favoriteNote(newNoteId);
        // components
        if (newStoredNote.components.length > 0)
          for (const component of newStoredNote.components)
            createComponent(newNoteId, {
              type: component.type,
              value: component.value,
              description: component.description,
            });
      }
    }

    let notesResponse = await getNotes(0, 20);
    const newNoteFetch = notesResponse.getNotes;
    await storeData('notes', newNoteFetch);
    setNotes(newNoteFetch);

    let favResponse = await getFavoriteNotes(0, 20);
    const newFavFetch = favResponse.getFavoriteNotes;
    await storeData('favoriteNotes', newFavFetch);
    setFavoriteNotes(newFavFetch);

    let tagResponse = await getUserTags(0, 20);
    const newTagFetch = tagResponse.getUserTags;
    setTags(newTagFetch);
    await storeData('userTags', newTagFetch);
  };

  const storedNotes = await getData('notes');
  setNotes(storedNotes);
  const storedFavoriteNotes = await getData('favoriteNotes');
  setFavoriteNotes(storedFavoriteNotes);
  const storedChapters = await getData('userChapters');
  setChapters(storedChapters);
  const storedTags = await getData('userTags');
  setTags(storedTags);

  //chapter update
  if (
    JSON.stringify(storedChapters) === JSON.stringify(fetchedChapters) ||
    storedChapters.length === 0
  ) {
    setChapters(fetchedChapters);
    storeData('userChapters', fetchedChapters);
  } else {
    updateOnlineChapters(storedChapters, fetchedChapters);
  }
  //notes update and create tags
  if (
    (JSON.stringify(storedNotes) === JSON.stringify(fetchedNotes) &&
      JSON.stringify(storedFavoriteNotes) ===
        JSON.stringify(fetchedFavoriteNotes)) ||
    (storedNotes.length === 0 && storedFavoriteNotes.length === 0)
  ) {
    setNotes(fetchedNotes);
    storeData('notes', fetchedNotes);
    setFavoriteNotes(fetchedFavoriteNotes);
    storeData('favoriteNotes', fetchedFavoriteNotes);
  } else {
    updateOnlineNotes(
      storedNotes,
      fetchedNotes,
      storedFavoriteNotes,
      fetchedFavoriteNotes,
    );
  }
  //tags update
  if (JSON.stringify(storedTags) === JSON.stringify(fetchedTags)) {
    setTags(fetchedTags);
    storeData('userTags', fetchedTags);
  } else {
    updateOnlineTags(storedTags, fetchedTags);
  }
};

export {user};
