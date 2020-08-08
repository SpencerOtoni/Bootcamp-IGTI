import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

const FileNameArchive = "./grades.json";

class GradeController {
  async store(req, res) {
    try {
      let grade = req.body;

      const data = JSON.parse(await readFile(FileNameArchive));
      let { grades } = data;

      grade = { id: data.nextId++, ...grade, timestamp: new Date() };

      grades.push(grade);
      await writeFile(FileNameArchive, JSON.stringify(data, null, 2));

      res.send(grade);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const gradeBody = req.body;

      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;

      const indexStudent = grades.findIndex((grade) => {
        return grade.id === parseInt(id);
      });

      if (indexStudent !== -1) {
        const { id, student, subject, type, value, timestamp } = grades[
          indexStudent
        ];

        const grade = {
          id,
          student: gradeBody.student,
          subject: gradeBody.subject,
          type: gradeBody.type,
          value: gradeBody.value,
          timestamp,
        };

        grades[indexStudent] = grade;
        await writeFile(FileNameArchive, JSON.stringify(data, null, 2));

        res.send(grade);
      } else {
        res.status(400).send({ error: "Usuário não cadastrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const data = JSON.parse(await readFile(FileNameArchive));
      let { grades } = data;

      const indexStudent = grades.findIndex((grade) => {
        return grade.id === parseInt(id);
      });

      if (indexStudent !== -1) {
        const { student } = grades[indexStudent];
        data.grades = grades.filter((student) => {
          return student.id !== parseInt(id);
        });
        await writeFile(FileNameArchive, JSON.stringify(data, null, 2));

        res.send({ Msg: `Usuário ${student}, foi excluido com sucesso!` });
      } else {
        res.status(400).send({ error: "Usuário não cadastrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;

      const student = grades.find((student) => {
        return student.id === parseInt(id);
      });

      if (student) {
        res.send(student);
      } else {
        res.status(400).send({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showNotaTotal(req, res) {
    try {
      const { student, subject } = req.body;
      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;
      const grade = grades.filter((students) => {
        return students.student === student && students.subject === subject;
      });

      console.log(grade);

      const totalValue = grade.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

      if (grade.length > 0) {
        res.send({ value: totalValue });
      } else {
        res.status(400).send({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showNotaAverage(req, res) {
    try {
      const { subject, type } = req.body;
      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;
      const grade = grades.filter((student) => {
        return student.subject === subject && student.type === type;
      });
      console.log(grade);
      const totalValue = grade.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);

      const average = totalValue / grade.length;
      if (grade.length > 0) {
        res.send({ value: average.toFixed(2) });
      } else {
        res.status(400).send({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async showTopGrades(req, res) {
    try {
      const { subject, type } = req.body;
      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;
      const grade = grades.filter((student) => {
        return student.subject === subject && student.type === type;
      }).sort((a,b) =>{
        return b.value - a.value
      })

      console.log(grade)
      
      if (grade.length > 0) {
        res.send(grade.slice(0,3));
      } else {
        res.status(400).send({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async index(req, res) {
    try {
      const data = JSON.parse(await readFile(FileNameArchive));
      const { grades } = data;
      res.send(grades);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new GradeController();
