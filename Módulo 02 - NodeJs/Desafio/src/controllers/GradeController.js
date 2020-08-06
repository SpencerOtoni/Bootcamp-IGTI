import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

const FileNameArchive = "./grades.json";

class GradeController{
 async index(req, res) {
   try {
    const data = JSON.parse(await readFile(FileNameArchive));
    const { grades } = data;
    res.send(grades);
   } catch (error) {
     console.log(error)
   }
 }
}

export default new GradeController()