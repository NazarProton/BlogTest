/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TextField from "../components/form/textField";
import { validator } from "../utils/validator";
import CheckBoxField from "../components/form/checkBoxField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../store/users";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useLocation();
  const [data, SetData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const loginError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    SetData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна к заполнению",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен к заполнению",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = params.state ? params.state : "/";
    dispatch(login({ payload: data, redirect, navigate }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта:"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль:"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        className="btn btn-success w-100"
        disabled={!isValid}
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
