import express from "express"
import patientService from "../services/patientService"
import {toNewEntry, toNewPatient} from "../utils";

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSSN())
})

router.get('/:id', (req, res) => {
    res.send(patientService.getPatientById(req.params.id))
})

router.post('/', (req, res) => {
    const patient = toNewPatient(req.body);
    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
});

router.post(':id/entries', (req, res) => {
    const entry = toNewEntry(req.body)
    const newEntry = patientService.addEntry(req.params.id, entry)
    res.json(newEntry)
})

export default router;
