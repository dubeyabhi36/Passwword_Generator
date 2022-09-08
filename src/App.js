import React, { useState } from 'react';
import './App.css';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './Character';
import { COPY_Fail, COPY_SUCCESS } from './message'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'

function App() {

const [password, setPassword] = useState("")
const [passwordLength, setPasswordLength] = useState(10)
const [includeUpperCase, setIncludeUpperCase] = useState(false)
const [includeLowerCase, setIncludeLowerCase] = useState(false)
const [includeNumbers, setIncludeNumbers] = useState(false)
const [includeSymbols, setIncludeSymbols] = useState(false)
const handlepassword = () => {
  if(!includeLowerCase && !includeNumbers && !includeSymbols && !includeUpperCase){
  notify("To generate password you need to select atleast one checkbox", true)
}
else {
  let CharacterList = "";
  if (includeLowerCase){
  CharacterList = CharacterList + lowerCaseLetters;
  }
  if(includeNumbers){
    CharacterList = CharacterList + numbers;
  }
  if(includeSymbols){
    CharacterList = CharacterList + specialCharacters;
  }
  if (includeUpperCase){
    CharacterList = CharacterList + upperCaseLetters  
  }
  setPassword(createPassword(CharacterList))
  notify("password is generated successfully", false)
  // console.log(CharacterList)
}
}

const createPassword = (CharacterList) => {
let password = "";
const CharacterListlength = CharacterList.length;
for (let i = 0; i < passwordLength; i++){
const CharacterIndex = Math.round(Math.random() *  CharacterListlength)
password = password + CharacterList.charAt(CharacterIndex)
}
return password;
}

const copyToClipboard = (password) =>{
  navigator.clipboard.writeText(password)

}


const notify = (message, hasError = false) => {
  if (hasError) {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  else {
    toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

}

const handleCopyPassword = (e) => {
  if (password === ""){
    notify(COPY_Fail, true)
  }
  else{
    copyToClipboard(password)
    notify(COPY_SUCCESS)
    }
}
return (
    <div className='App'>
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">
            Passowrd Generator
          </h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button className="copy__btn">
            <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="password-strength">Password length</label>
            <input className="pw" defaultValue={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} type="number" id="password-stregth" name="password-strength" max="26" min="8" />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add lowercase letters</label>
            <input type="checkbox" name="lowercase-letters" id="lowercase-letters" checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)}/>
          </div>
          <div className="form-group">
            <label htmlFor="upercase-letters">Add uppercase letters</label>
            <input type="checkbox" name="uppercase-letters" id="uppercase-letters" checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)}/>
          </div>
          <div className="form-group">
            <label htmlFor="numbers">Add numbers</label>
            <input type="checkbox" name="numbers" id="numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}/>
          </div>
          <div className="form-group">
            <label htmlFor="symbols">Add symbols</label>
            <input type="checkbox" name="symbols" id="symbols" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}/>
          </div>
          <button onClick={handlepassword} className="generator__btn">Generate Password</button>
        </div>
      </div>
        
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </div>
    
  );
}


export default App;
