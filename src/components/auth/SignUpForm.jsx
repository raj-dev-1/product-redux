import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/InputField";
import {useFormik} from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from 'yup';

const RegisterValidation = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Please enter a username"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const navigate = useNavigate();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm
  } = useFormik({
    initialValues,
    validationSchema: RegisterValidation,
    onSubmit: async () => {
      try {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const isEmailExist = existingUsers.some(user => user.email === values.email );
  
        if (isEmailExist) {        
          alert("Email already re gistere");
          return;
        }
        const { confirmPassword, ...newUser } = values;
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        resetForm();
        alert("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="py-4">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Register
            </h1>
          </div>
          <div>        
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="relative">
                  <Label>
                    Username<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    error={(errors.username && touched.username)}
                    onBlur={handleBlur}
                    name="username"
                    placeholder="Enter your username"
                  />
                  {errors.username && touched.username &&
                    <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.username}</p>}
                </div>
                <div className="relative">
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={(errors.email && touched.email)}
                    onBlur={handleBlur}
                    name="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email &&
                    <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.email}</p>}
                </div>
                <div className="relative">
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(errors.password && touched.password)}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <FiEye className="size-5 text-gray-500" />
                      ) : (
                        <FiEyeOff className="size-5 text-gray-500" />
                      )}
                    </span>
                  </div>
                  {errors.password && touched.password &&
                      <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.password}</p>}
                  </div>
                <div className="relative">
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(errors.confirmPassword && touched.confirmPassword)}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <FiEye className="size-5 text-gray-500" />
                      ) : (
                        <FiEyeOff className="size-5 text-gray-500" />
                      )}
                    </span>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword &&
                    <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.confirmPassword}</p>}
                </div>
                <div className="pt-3">
                  <button className="text-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary-500 hover:bg-primary-600">
                    Register
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 sm:text-start">
                Already have an account? {""}
                <Link
                  to="/login"
                  className="text-primary-500 hover:text-primary-600"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
   
   </div>
    </div>
  );
}
