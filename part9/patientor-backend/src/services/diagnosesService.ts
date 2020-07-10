import diagnoses from "../data/diagnoses.json"
import {Diagnosis} from "../../../patientor-frontend/src/types";

const getDiagnoses = (): Diagnosis[] => diagnoses

export default {getDiagnoses}
