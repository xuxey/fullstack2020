import React from "react";
import {Grid, Button} from "semantic-ui-react";
import {Field, Formik, Form} from "formik";
import {TextField} from "../AddPatientModal/FormField";
import {Entry} from "../types";
import {useStateValue} from "../state";
import {DiagnosisSelection} from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<Entry, "id" | "type">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}


export const AddEntryForm: React.FC<Props> = ({onSubmit, onCancel}) => {
    const [{diagnoses}] = useStateValue()
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [""],
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                return errors;
            }}
        >
            {({isValid, dirty, setFieldValue, setFieldTouched}) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
