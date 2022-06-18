/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { validator } from "../utils/validator";
import TextField from "../components/form/textField";
// import SelectField from "../components/form/selectField";
// import RadioField from "../components/form/radioField";
// import MultiSelectField from "../components/form/multiSelectField";
import CheckBoxField from "../components/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../store/users";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    name: "",
    sex: "male",
    qualities: [],
    licence: false,
  });
  const loginError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfog = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      minNameLength: {
        message: "Имя должен состаять миниму из 3 символов",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязательна для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      minLength: {
        message: "Пароль должен состаять миниму из 8 символов",
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтреврждения лицензионного соглашения",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfog);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value),
    };
    dispatch(signUp(newData, navigate));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Имя пользователя"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить лицензионное соглашение
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
