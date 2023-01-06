import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useList from '../hooks/useList';
import LEVELS from '../models/levels.enum';


const TaskList = () => {

    const taskSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required'),
        description: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required')    
    });

    const defaultTask = {
        name: 'Formika',
        description: 'Formulario con Formik',
        level: LEVELS.URGENT,
        done: false,
    };

    const tasks = useList([defaultTask])

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1>Task List</h1>
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    level: LEVELS.NORMAL,
                    done: false
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        tasks.push(values);
                        actions.resetForm({});
                        actions.setSubmitting(false);
                    }, 500);
                }}
                validationSchema={taskSchema}
            >
                {({ errors }) => (
                    <Form>
                        <Field className='form-control' name='name' placeholder='Task Name'/>
                        { errors && errors.name }

                        <Field className='form-control mt-2' name='description' placeholder='Task Description'/>
                        { errors && errors.description }

                        <Field className='form-select mt-2' as='select' name='level'>
                            <option value={LEVELS.NORMAL}>Normal</option>
                            <option value={LEVELS.URGENT}>Urgent</option>
                            <option value={LEVELS.BLOCKING}>Blocking</option>
                        </Field>
                        <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                    </Form>
                )}
            </Formik>
            {tasks.isEmpty() ? (
                <p>Task List is Empty</p>
            ) : (
                tasks.value.map((tasks, index) => (
                    <li key={index} className='d-flex justify-content-evenly align-items-center'>
                        <input className='align-items-center' type="checkbox" onClick={() => tasks.remove(index)} checked={false}/>
                        <p style={{fontWeight: 'bold', marginRight: '5px'}}>{tasks.name}:</p>
                        <p>{tasks.description}</p>
                    </li> 
                ))
            )}
        </div>
    );
};

export default TaskList;
