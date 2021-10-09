const bcrypt = require('bcrypt');
const db = require('./models');

function findIdByKeyValue(objs, key, value) {
  let i = 0;
  while (i < objs.length && objs[i][key] !== value) {
    i += 1;
  }

  return i < objs.length ? objs[i].id : null;
}

function randomFromRange(lo, hi) {
  return lo + Math.floor(Math.random() * (hi + 1 - lo));
}

async function seedUsers() {
  const types = await db.UserType.findAll();
  const counts = await db.Country.findAll();
  const unis = await db.University.findAll();

  await db.User.create({
    fullName: 'Bob',
    password: await bcrypt.hash('1234567', 10),
    email: 'bob@mail.com',
    userpicUrl: '/images/userpics/userpic.jpg',
    userTypeId: findIdByKeyValue(types, 'name', 'student'),
    universityId: findIdByKeyValue(unis, 'name', 'MSU'),
    countryId: findIdByKeyValue(counts, 'name', 'Russia'),
  });
  await db.User.create({
    fullName: 'Lola',
    password: await bcrypt.hash('1234567', 10),
    email: 'lola@mail.com',
    userpicUrl: '/images/userpics/userpic.jpg',
    userTypeId: findIdByKeyValue(types, 'name', 'student'),
    universityId: findIdByKeyValue(unis, 'name', 'MIT'),
    countryId: findIdByKeyValue(counts, 'name', 'USA'),
  });
  await db.User.create({
    fullName: 'Tom',
    password: await bcrypt.hash('qwertyu', 10),
    email: 'tom@gmail.com',
    userpicUrl: '/images/userpics/userpic.jpg',
    userTypeId: findIdByKeyValue(types, 'name', 'contributor'),
    universityId: findIdByKeyValue(unis, 'name', 'MIT'),
    countryId: findIdByKeyValue(counts, 'name', 'USA'),
  });
}

async function seedPhases(phasesCount) {
  for (let i = 1; i <= phasesCount; i += 1) {
    const phase = await db.Phase.create({
      number: i,
    });
  }
}

async function seedAdditionalFile(weekId) {
  await db.AdditionalFile.create({
    url: 'https://i.imgur.com/I86rTVl.jpg',
    title: 'sample image',
    weekId
  });
}

async function seedCourses() {
  const users = await db.User.findAll();
  const counts = await db.Country.findAll();
  const phases = await db.Phase.findAll(); // here we know that there are only 3 phases
  const categs = await db.Category.findAll();

  const thumbs = ['diving.jpg', 'horseride.jpg', 'scape.jpg', 'yacht.jpg'];

  let course = await db.Course.create({
    title: 'Greekseas Sailing',
    startDate: new Date('2021-10-01T00:00:00'),
    countryId: findIdByKeyValue(counts, 'name', 'Greece'),
  });

  let weeksCount = 6;

  for (let i = 1; i <= weeksCount; i += 1) {
    const week = await db.Week.create({
      goals: `Greekseas Sailing week ${i} goals`,
      notes: `Greekseas Sailing week ${i} notes`,
      courseId: course.id,
      number: i
    });
    await week.addPhase(phases[Math.ceil(i / 2) - 1]);
    if (i % 2 === 1) {
      await seedAdditionalFile(week.id);
    }

    for (let i = 1; i <= randomFromRange(1, 4); i += 1) {
      await db.Video.create({
        url: `/videos/${course.id}_${week.id}_${i}.jpg`,
        thumbUrl: `/images/${thumbs[randomFromRange(0, thumbs.length - 1)]}`,
        title: `GS title ${i}`,
        subtitle: `GS subtitle ${i}`,
        duration: 30e3 * i,
        categoryId: categs[randomFromRange(0, categs.length - 1)].id,
        weekId: week.id,
        authorId: 3
      });
    }
  }

  await course.addUser(users[0]);


  course = await db.Course.create({
    title: 'Russian Museums',
    startDate: new Date('2021-10-29T00:00:00'),
    countryId: findIdByKeyValue(counts, 'name', 'Russia'),
  });

  weeksCount = 3;

  for (let i = 1; i <= weeksCount; i += 1) {
    const week = await db.Week.create({
      goals: `Russian Museums week ${i} goals`,
      notes: `Russian Museums week ${i} notes`,
      courseId: course.id,
      number: i
    });
    await week.addPhase(phases[i - 1]);
    if (i % 2 === 1) {
      await seedAdditionalFile(week.id);
    }

    for (let i = 1; i <= randomFromRange(1, 4); i += 1) {
      await db.Video.create({
        url: `/videos/${course.id}_${week.id}_${i}.jpg`,
        thumbUrl: `/images/${thumbs[randomFromRange(0, thumbs.length - 1)]}`,
        title: `RM title ${i}`,
        subtitle: `RM subtitle ${i}`,
        duration: 30e3 * i,
        categoryId: categs[randomFromRange(0, categs.length - 1)].id,
        weekId: week.id,
        authorId: 3
      });
    }
  }

  await course.addUser(users[1]);
}

(async () => {
  await seedUsers();
  await seedPhases(3);
  await seedCourses();
})();
