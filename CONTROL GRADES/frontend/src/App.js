import React, { useState, useEffect } from "react";

import * as api from "./api/apiService";
import Spinner from "./components/Spinner";
import GradesControl from "./components/GradesControl";
import ModalGrade from "./components/ModalGrade";

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  let copyGrades = [];
  const [selectGrade, setSelectGrade] = useState({});
  const [isModealopen, setIsModealopen] = useState(false);

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await api.getAllGrades();
      setAllGrades(result);
    }

    fetchMyAPI();
  }, []);

  async function handleDelete(gradeTodelete) {
    const isDelete = await api.deleteGrade(gradeTodelete);

    if (isDelete) {
      const deleteGradeIndex = allGrades.findIndex((grade) => {
        return grade.id === gradeTodelete.id;
      });

      copyGrades = Object.assign([], allGrades);
      copyGrades[deleteGradeIndex].isDeleted = true;
      copyGrades[deleteGradeIndex].value = 0;

      setAllGrades(copyGrades);
    }
  }

  function handlePersist(grade) {
    setSelectGrade(grade);
    setIsModealopen(true);
  }

  async function handlePersistData(id, gradeValue) {
    const newGrades = Object.assign([], allGrades);

    const gradeUpdate = newGrades.find((grade) => {
      return grade.id === id;
    });

    gradeUpdate.value = parseInt(gradeValue);

    if (gradeUpdate.isDeleted) {
      gradeUpdate.isDeleted = false;
      await api.insertGrades(gradeUpdate);
    } else {
      await api.updateGrade(gradeUpdate);
    }
    setIsModealopen(false);
  }

  function handleClose() {
    console.log(isModealopen);
    setIsModealopen(false);
  }

  return (
    <div>
      <h1 className="center">Controle de notas</h1>
      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModealopen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectGrade={selectGrade}
        />
      )}
    </div>
  );
}
