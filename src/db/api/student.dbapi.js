const path = require('path');

const modelsPath = path.join(process.env.PWD, 'src', 'db', 'models');

const { Op } = require('sequelize');

const {
  Sequelize,
  sequelize,
  User, Country, Course, Week, Phase, AdditionalFile, Video, UsersVideosStat,
} = require(modelsPath);

const attributes = {
  week: ['number', 'goals', 'notes'],
  course: ['title', 'startDate'],
  phase: ['number'],
  country: ['flagUrl', 'name'],
  video: ['url', 'thumbUrl', 'title', 'subtitle', 'duration'],
};

function getNecessaryPropsOfCourse({
  id, title, startDate, 'Country.flagUrl': flagUrl, 'Country.name': countryName,
}) {
  return {
    id, title, startDate, flagUrl, countryName,
  };
}

const api = {
  async getUsersCourseBrief(userId) {
    const course = await Course.findOne({
      attributes: [...attributes.course, 'id'],
      include: [{
        model: User,
        where: { id: userId },
        attributes: [],
        through: { attributes: [] },
      }, {
        model: Country,
        attributes: attributes.country,
        nested: false,
      }],
      raw: true,
    });
    const result = getNecessaryPropsOfCourse(course);
    return result;
  },

  async getAllAccessibleWeeks(courseId) {
    const result = await Course.findOne({
      attributes: attributes.course,
      where: {
        id: courseId,
        '$Weeks.number$': {
          [Op.lte]: sequelize.fn(
            'TRUNC',
            sequelize.literal('DATE_PART(\'day\', NOW()::timestamp - "Course"."startDate"::timestamp)/7'),
          ),
        },
      },
      include: {
        model: Week,
        attributes: attributes.week,
        include: {
          model: Phase,
          attributes: attributes.phase,
        },
      },
    });
    return result;
  },

  async getAllWeeks(courseId) {
    const result = await Course.findByPk(courseId, {
      attributes: attributes.course,
      include: {
        model: Week,
        attributes: attributes.week,
        include: {
          model: Phase,
          attributes: attributes.phase,
        },
      },
    });
    return result;
  },

  async getCourseInfo(courseId) {
    const result = await Course.findByPk(courseId, {
      attributes: {
        include: [[
          Sequelize.fn(
            'MAX',
            Sequelize.col('Weeks.number'),
          ),
          'weeksCount',
        ]],
      },
      include: {
        require: true,
        model: Week,
        attributes: [],
      },
      where: { id: courseId },
      group: ['Course.id'],
    });
    return result;
  },

  async getCourseWeek(courseId, number) {
    const result = await Week.findOne({
      attributes: attributes.week,
      where: { courseId, number },
      include: {
        model: Video,
        attributes: attributes.video,
      },
    });
    return result;
  },

  async getAccessileWeekOfCourse(courseId, number) {
    const result = await Week.findOne({
      where: {
        courseId,
        [Op.and]: [
          { number },
          {
            number: {
              [Op.lte]: sequelize.fn(
                'TRUNC',
                sequelize.literal('DATE_PART(\'day\', NOW()::timestamp - "Course"."startDate"::timestamp)/7'),
              ),
            },
          },
        ],
      },
      include: {
        model: Course,
        attributes: [],
      },
    });
    return result;
  },

  async getViewedVideos(userId) {
    const result = await User.findAll({
      include: [{
        model: Video,
        through: {
          model: UsersVideosStat,
          attributes: [],
        },
      }],
      where: { id: userId },
    });
    return result;
  },
};

module.exports = api;
