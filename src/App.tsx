import React from 'react';
import AppContainer from './AppContainer';
import Header from "./Header";

const formFields = [
  { id: 1, label: "First Name", type: "text", placeholder: "John" },
  { id: 2, label: "Last Name", type: "text", placeholder: "Doe" },
  { id: 3, label: "Email", type: "email", placeholder: "hey@example.com" },
  { id: 4, label: "Phone Number", type: "tel", placeholder: "7751931940" },
  { id: 5, label: "Date of Birth", type: "date", placeholder: "" }
];
function App() {
  return (
    <AppContainer>
      <div className='p-4 mx-auto bg-white shadow-lg rounded-xl'>
        <Header title={"Welcome to lesson 5 of react-typescript with #tailwindcss"} />
        {formFields.map((field) =>
          <React.Fragment key={field.id}>
            <label className="text-xl">{field.label}</label>
            <input className='border-2 border-gray-200 rounded-lg p-2 m-2 w-full' type={field.type} placeholder={field.placeholder} />
          </React.Fragment>
        )}
        <input className="rounded-md bg-sky-600 mx-2 my-3 px-3 py-2 text-slate-100 text-xl" type="submit" value="Submit" />
      </div>
    </AppContainer>
  );
}

export default App;
