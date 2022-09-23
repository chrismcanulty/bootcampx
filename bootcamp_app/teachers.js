const { Pool } = require('pg');

const pool = new Pool({
  user: 'chrismcanulty',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
});

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort, COUNT(assistance_requests.id)
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${process.argv[2] || 'JUL02'}%'
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    })
  }).catch(err => console.error('query error', err.stack));
