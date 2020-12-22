import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import * as Yup from 'yup';
import {ErrorMessage} from '@hookform/error-message';

function App() {
    // form validation rules
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });

    const {register, handleSubmit, reset, errors, setError, clearErrors} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: "Mr"
        },
        reValidateMode: "onBlur",
        shouldFocusError: true
    });

    async function onSubmit(data) {
        [
            {
                type: "manual",
                name: "extra.username",
                message: "username already exists."
            },
            {
                type: "manual",
                name: "email",
                message: "email already exists."
            },
        ].forEach(({name, type, message}) =>
            setError(name, {type, message})
        );
    }

    function onError(data) {
        console.log(data);
    }


    return (
        <div className="card m-3">
            <h5 className="card-header">React - Form Validation Example with React Hook Form With Mafei</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit, onError)} onReset={reset}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Title</label>
                            <select name="title" ref={register}
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </select>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="title"/>
                        </div>
                        <div className="form-group col-5">
                            <label>First Name</label>
                            <input name="firstName" type="text" ref={register}
                                   className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="firstName"/>

                        </div>

                        <div className="form-group col-5">
                            <label>Last Name</label>
                            <input name="lastName" type="text" ref={register}
                                   className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="lastName"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label>Username</label>
                            <input name="extra.username" type="text" ref={register}
                                   className={`form-control ${errors.extra?.username ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="extra.username"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <label>Date of Birth</label>
                            <input name="dob" type="date" ref={register}
                                   className={`form-control ${errors.dob ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="dob"/>

                        </div>
                        <div className="form-group col">
                            <label>Email</label>
                            <input name="email" type="text" ref={register}
                                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="email"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Password</label>
                            <input name="password" type="password" ref={register}
                                   className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="password"/>

                        </div>
                        <div className="form-group col">
                            <label>Confirm Password</label>
                            <input name="confirmPassword" type="password" ref={register}
                                   className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}/>
                            <ErrorMessage render={({message}) => <div className="invalid-feedback">{message}</div>}
                                          errors={errors} name="confirmPassword"/>

                        </div>

                    </div>
                    <div className="form-group form-check">
                        <input name="acceptTerms" type="checkbox" ref={register} id="acceptTerms"
                               className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}/>
                        <label for="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>
                    <div className="form-group">
                        {console.log(errors)}
                        <button type="submit" className="btn btn-primary mr-1">Register</button>
                        <button className="btn btn-secondary" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export {App};