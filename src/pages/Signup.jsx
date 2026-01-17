import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../authSlice";
import { useEffect } from "react";

// ✅ MATCH BACKEND EXACTLY
const signupSchema = z.object({
  fname: z.string().min(2, "First name is required"),
  lname: z.string().min(1, "Last name is required"),
  emailId: z.string().email("Invalid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          {error && (
            <div className="alert alert-error mt-2">
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-y-4"
          >
            {/* First Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                {...register("fname")}
                placeholder="Enter first name"
                className={`input input-bordered ${
                  errors.fname ? "input-error" : ""
                }`}
              />
              {errors.fname && (
                <span className="text-error text-sm">
                  {errors.fname.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                {...register("lname")}
                placeholder="Enter last name"
                className={`input input-bordered ${
                  errors.lname ? "input-error" : ""
                }`}
              />
              {errors.lname && (
                <span className="text-error text-sm">
                  {errors.lname.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                {...register("emailId")}
                placeholder="Enter email"
                className={`input input-bordered ${
                  errors.emailId ? "input-error" : ""
                }`}
              />
              {errors.emailId && (
                <span className="text-error text-sm">
                  {errors.emailId.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                className={`input input-bordered ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <span className="text-error text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
