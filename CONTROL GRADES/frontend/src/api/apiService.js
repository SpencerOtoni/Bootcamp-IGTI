import axios from "axios";

const API_URL = "http://localhost:3001/grade/";

const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: "Exercícios",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: "Trabalho Prático",
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: "Desafio",
    minValue: 0,
    maxValue: 50,
  },
];

async function getAllGrades() {
  const result = await axios.get(API_URL);
  const { grades } = await result.data;

  const allGrades = grades.map((grade) => {
    const { student, subject, type } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    };
  });

  let allStudents = new Set();
  allGrades.forEach((grade) => {
    allStudents.add(grade.student);
  });
  allStudents = Array.from(allStudents);

  let allSubject = new Set();
  allGrades.forEach((grade) => {
    allSubject.add(grade.subject);
  });
  allSubject = Array.from(allSubject);

  let allType = new Set();
  allGrades.forEach((grade) => {
    allType.add(grade.type);
  });
  allType = Array.from(allType);

  let maxId = -1;
  allGrades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id;
    }
  });
  let nextId = maxId + 1;
  const allCombinations = [];
  allStudents.forEach((student) => {
    allSubject.forEach((subject) => {
      allType.forEach((type) => {
        allCombinations.push({
          student,
          subject,
          type,
        });
      });
    });
  });

  allCombinations.forEach(({ student, subject, type }) => {
    const hastitem = allGrades.find((grade) => {
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type
      );
    });

    if (!hastitem) {
      allGrades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      });
    }
  });

  allGrades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  allGrades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  allGrades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return allGrades;
}

async function insertGrades(grade) {
  const response = await axios.post(API_URL, grade);
  const { id } = response.data;
  return id;
}

async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}
async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL}/${grade.id}`);
  return response.data;
}

async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  );

  const { minValue, maxValue } = gradeValidation;

  return {
    minValue,
    maxValue,
  };
}

export {
  getAllGrades,
  insertGrades,
  updateGrade,
  deleteGrade,
  getValidationFromGradeType,
};
