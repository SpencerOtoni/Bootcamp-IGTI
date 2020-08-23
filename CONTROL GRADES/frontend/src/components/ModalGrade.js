import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as api from "./../api/apiService";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectGrade }) {
  const [gradeValue, setGradeValue] = useState(selectGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const { id, student, subject, type } = selectGrade;

  useEffect(() => {
    async function fetchMyAPI() {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    }
    fetchMyAPI();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `o valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
    }
    return;
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    });
    return () => {
      document.removeEventListener("Keydown", () => {});
    };
  }, []);

  function handleFormSubmit(event) {
    event.preventDefault()
    onSave(id, gradeValue)
  }

  function handleGradeChange(event) {
    const { value } = event.target;
    setGradeValue(value);
  }

  function handleModalClose(){
    onClose();
  }

  return (
    <div>
      <Modal isOpen={true}>
      <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de notas</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do aluno:
            </label>
          </div>

          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina:
            </label>
          </div>

          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de avaliação:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              value={gradeValue}
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota:
            </label>
          </div>

          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ""}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },

  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },

  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
};
