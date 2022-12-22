export const PatientError = {
  DuplicatePatientData: {
    errorMessage: "Patient card creation is forbidden",
    reason: "There is such patient in DB",
  },
  NotFound: {
    errorMessage: "Patient card not found",
    reason: "There is no one patient card in database",
  },
};
