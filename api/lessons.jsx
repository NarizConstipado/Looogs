import { fetchAPI } from "./api";

export const getLessons = async (page, pageSize, pagesPage2, pagesPageSize2) => {
    return fetchAPI(`
    query Query($page: Int!, $pageSize: Int!, $pagesPage2: Int!, $pagesPageSize2: Int!) {
        getCourses(page: $page, pageSize: $pageSize) {
          pages(page: $pagesPage2, pageSize: $pagesPageSize2) {
            id
            image
            description
          }
          id
          title
        }
      }
    `, {page: page, pageSize: pageSize, pagesPage2: pagesPage2, pagesPageSize2: pagesPageSize2})
}

export const getProgress = async (courseId) => {
    return fetchAPI(`
    query GetProgressByCourseID($courseId: ID!) {
        getProgressByCourseID(courseID: $courseId) {
          progressValue
        }
      }
    `, {courseId: courseId})
}