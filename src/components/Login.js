import { useState, useRef } from "react";
import { Header } from "./Header";
import { toast } from "react-toastify";
import { validate } from "../utils/validator";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleValidation = () => {
    const message = validate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    toast.loading("Please wait...");
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.dismiss();
          toast.success("Welcome to NetflixGPT!!");

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          toast.dismiss();
          toast.error(errorMessage);
          navigate("/");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.dismiss();
          toast.success("Welcome to MadflixGPT!!");
          

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          toast.dismiss();
          toast.error(errorCode);
          if (errorCode === "auth/invalid-credential") {
            setErrorMessage("No account found");}
        });
    }
  };
  return (
    <>
      <Header />
      <div className="relative">
        <img
          src={BG_IMG}
          alt="logo"
        />

        <div
          className="absolute inset-0 flex flex-col justify-center items-center "
          style={{ marginTop: "-200px" }}
        >
          <div className="max-w-md w-full bg-black bg-opacity-80 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {!isSignInForm && (
                <div className="mb-4 ">
                  <input
                    type="text"
                    ref={name}
                    id="name"
                    placeholder="Full Name"
                    name="name"
                    className="w-full px-3 py-2 rounded-lg  "
                  />
                </div>
              )}

              <div className="mb-4 ">
                <input
                  type="email"
                  ref={email}
                  id="email"
                  placeholder="Email or phone number"
                  name="email"
                  className="w-full px-3 py-2 rounded-lg   "
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  ref={password}
                  id="password"
                  placeholder="password"
                  name="password"
                  className="w-full px-3 py-2 rounded-lg "
                />
              </div>
              <p className="text-red-600 font-semibold my-3">{errorMessage}</p>
              <button
                onClick={handleValidation}
                type="submit"
                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <div className="mt-4">
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Forgot your password?
              </a>
            </div>
            <div className="mt-2">
              <button
                onClick={toggleSignInForm}
                href="#"
                className="text-sm text-gray-400 hover:underline"
              >
                {isSignInForm
                  ? "New to Netflix? Sign up now"
                  : "Already registered? Sign in now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
