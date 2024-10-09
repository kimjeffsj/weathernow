import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../shared/api/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // console.log("Register success", userCredential);
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Register success, please login`);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
        resetForm();
      } else if (error.code === "auth/weak-password") {
        setError("Email should be at least 6 characters");
      } else {
        setError("Failed to register: " + error.message);
      }
      // console.error("Failed to register", error.message);
      resetForm();
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError();
          }}
          placeholder="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError();
          }}
          placeholder="password"
          required
        />
        <input
          type="password"
          value={password2}
          onChange={(e) => {
            setPassword2(e.target.value);
            setError();
          }}
          placeholder="confirm password"
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
