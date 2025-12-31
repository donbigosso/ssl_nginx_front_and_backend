import { show, hide, changeButtonText, changeInnerTextContent, showModal, hideModal } from "./PageAppearance.js";    
import { onClick } from "./EventFunctions.js";
import { handleLogIn } from "./CustomFunctions.js";
const modalBody = document.querySelector('.modal-body');
const modalCloseButton = document.querySelector("#modal-close-btn");
const modalAlertField = document.getElementById('modal-alert-field');
const modalLabel= document.getElementById('my-modal-label');
const modalBtn1 = document.getElementById('modal-btn-1');
const modalBtn2 = document.getElementById('modal-btn-2');
const modalBtn3 = document.getElementById('modal-btn-3'); 

export function setModalTitle(title){
  changeInnerTextContent(modalLabel, title);
}

export function showModalAlert(message){
  show(modalAlertField, 'block');
  changeInnerTextContent(modalAlertField, message);
}

export function hideModalAlert(){
  hide(modalAlertField);
}

export function createForm(){
modalBody.innerHTML = '';  // clear old content
const form = document.createElement('form');
form.id = 'login-form';
modalBody.appendChild(form);
}



export function createLoginField(){
const form = document.querySelector('#login-form');
const div = document.createElement('div');
div.className = 'mb-3';

const label = document.createElement('label');
label.textContent = 'Username';
label.htmlFor = 'loginUsername';
label.className = 'form-label';

const input = document.createElement('input');
input.type = 'text';
input.className = 'form-control';
input.id = 'loginUsername';
input.placeholder = 'Enter username';
input.required = true;

div.appendChild(label);
div.appendChild(input);
form.appendChild(div);

}

export function createPasswordField(){
const form = document.querySelector('#login-form');

const div = document.createElement('div');
div.className = 'mb-3';

const label = document.createElement('label');
label.textContent = 'Password';
label.htmlFor = 'loginPassword';
label.className = 'form-label';

const input = document.createElement('input');
input.type = 'password';
input.className = 'form-control';
input.id = 'loginPassword';
input.placeholder = 'Enter password';
input.required = true;

div.appendChild(label);
div.appendChild(input);
form.appendChild(div);

}

export function showLoginModal(){
 
  showModal("my_modal");
  createFormWithUsrPassField();
  setModalTitle("User Login");
  hide(modalBtn2)
  changeInnerTextContent(modalBtn1, "Cancel");
  changeInnerTextContent(modalBtn3, "Login");
  onClick(modalBtn1,(() =>  hideModal("my_modal")));
  onClick(modalBtn3,(() =>  handleLogIn()));
  onClick(modalCloseButton,(() =>  hideModal("my_modal")));
}

export function createFormWithUsrPassField(){
createForm();
createLoginField();
createPasswordField();


}   

export function modalClicks(){
onClick(modalCloseButton, () => {
 console.log("Modal close button from functionclicked!");
  hideModal("my_modal");
})
}