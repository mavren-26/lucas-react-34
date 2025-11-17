// MultiStepForm.jsx
import React, { useState } from "react";

const skillsList = ["React", "Node", "AWS", "Docker"];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
    skills: [],
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  // Step 1 validation
  const validateStep1 = () => {
    if (!data.name || !data.email || !data.age) {
      alert("All fields required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      alert("Invalid email");
      return false;
    }
    if (Number(data.age) < 18) {
      alert("Age must be 18+");
      return false;
    }
    return true;
  };

  // Step 2 validation
  const validateStep2 = () => {
    if (data.skills.length < 2) {
      alert("Select at least 2 skills");
      return false;
    }
    return true;
  };

  const submitForm = () => {
    alert("Form Submitted Successfully!");
    console.log("Form Data:", data);
  };

  return (
    <div style={{ width: "350px", margin: "0 auto", padding: "20px" }}>
      <h2>Step {step}</h2>

      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <br /><br />
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <br /><br />
          <input
            type="number"
            placeholder="Age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
          <br /><br />
          <button onClick={() => validateStep1() && next()}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          {skillsList.map((s) => (
            <label key={s}>
              <input
                type="checkbox"
                checked={data.skills.includes(s)}
                onChange={() => {
                  const selected = data.skills.includes(s)
                    ? data.skills.filter((x) => x !== s)
                    : [...data.skills, s];
                  setData({ ...data, skills: selected });
                }}
              />
              {s}
            </label>
          ))}
          <br /><br />
          <button onClick={prev}>Back</button>
          <button onClick={() => validateStep2() && next()}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={prev}>Back</button>
          <button onClick={submitForm}>Submit</button>
        </div>
      )}
    </div>
  );
}
