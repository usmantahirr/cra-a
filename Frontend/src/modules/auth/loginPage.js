import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const LoginPage = ({ handleSubmit }) => (
  <div>
    <h1>Login</h1>
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      {({ values, touched, errors, isSubmitting, handleSubmit: submit, handleChange }) => (
        <form onSubmit={submit}>
          <input type="email" name="email" onChange={handleChange} value={values.email} />
          {errors.email && touched.email && errors.email}
          <input type="password" name="password" onChange={handleChange} value={values.password} />
          {errors.password && touched.password && errors.password}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginPage;
