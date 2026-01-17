import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../authSlice";
import { useEffect } from "react";

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(5, "Password should be at least 5 characters"),
});

const Login = () => {
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
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 p-6 w-96 gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-error text-center">{error}</p>}

        <input {...register("emailId")} placeholder="Email" />
        <p className="text-error">{errors.emailId?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" />
        <p className="text-error">{errors.password?.message}</p>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
