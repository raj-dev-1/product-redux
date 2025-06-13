import {useState} from "react";
import {Link, useNavigate} from "react-router";
import Input from "../form/InputField";
import Button from "../ui/button/Button";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import Label from "../form/Label.jsx";
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginAsync } from "../../store/authSlice";

const LoginValidation = Yup.object({
  email: Yup.string().email("Please enter correct email ").required("Please enter email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: ""
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    validationSchema: LoginValidation,
    onSubmit: async () => {
      try {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const matchedUser = existingUsers.find(
          (user) => user.email === values.email && user.password === values.password
        );
        if (!matchedUser) {
          alert("Invalid email or password");
          return;
        }
        
        dispatch(loginAsync(values));
        alert("Login successful!");
        navigate("/");
        resetForm();
      } catch (err) {
        console.error("Login failed", err);
      }
    }    
  });
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign In
            </h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="relative">
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(errors.email && touched.email)}
                      placeholder="Enter your email"
                  />
                  {errors.email && touched.email &&
                      <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.email}</p>}
                </div>
                <div className="relative">
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      error={(errors.password && touched.password)}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>
                  {errors.password && touched.password &&
                      <p className="absolute left-0 -bottom-6 text-sm pt-2 text-error-500">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-primary-600 hover:text-primary-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
