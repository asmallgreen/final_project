// 資料庫查詢處理函式
import {
  find,
  count,
  findOneById,
  insertOne,
  insertMany,
  remove,
  updateById,
  cleanTable,
  findOne,
} from "./base.js";

const table = "rating_course";
// const ratingCourseMember = SELECT * FROM member WHERE id IN (SELECT member_id FROM rating_course)

const getAllRatingCourse = async () => {
  const { rows } = await find(table);
  return rows;
};

const getRatingCourseById = async (id) => await findOneById(table, id);

const getRatingCourseByCourseId = async (courseId) => {
  const where = { course_id: courseId };
  const { rows } = await find(table, where);
  return rows;
};

const addRatingCourse = async (
  order_id,
  member_id,
  course_id,
  score,
  comment
) => {
  const  rows  = await insertOne(table, {
    order_id,
    member_id,
    course_id,
    score,
    comment,
  });
  return rows;
};

export { getAllRatingCourse, getRatingCourseById, getRatingCourseByCourseId, addRatingCourse };
