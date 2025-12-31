import { checkHTMLInstance } from "./CoreFunctions.js";
export function show(element, display = "inline-block") {
  if (!(element instanceof HTMLElement)) {
    console.warn("show(): invalid element");
    return;
  }

  element.style.display = display;
}
export function hide(element) {
  if (!(element instanceof HTMLElement)) {
    console.warn("hide(): invalid element");
    return;
  }

  element.style.display = "none";
}

export function showModal(modalID) {
  const modal = document.getElementById(modalID);
  modal.classList.add('show', 'd-block');
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  document.body.style.overflow = 'hidden';
}

export function hideModal(modalID) {
  const modal = document.getElementById(modalID);
  modal.classList.remove('show', 'd-block');
  modal.style.backgroundColor = '';
  document.body.style.overflow = '';
}

export function showLoggedOnly(){
    const loggedIn = document.querySelectorAll(".logged-only");
    loggedIn.forEach(el => show(el));}

export function hideLoggedOnly(){
    const loggedIn = document.querySelectorAll(".logged-only");
    loggedIn.forEach(el => hide(el));                           
} 
export function showUnloggedOnly(){
    const unlogged = document.querySelectorAll(".unlogged-only");
    unlogged.forEach(el => show(el));   }  

    export function hideUnloggedOnly(){
    const unlogged = document.querySelectorAll(".unlogged-only");
    unlogged.forEach(el => hide(el));                           
}

export function scroolToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function scrollToDown() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

export function changeButtonText(button, text) {
  if (!(button instanceof HTMLElement)) {
    console.warn("changeButtonText(): invalid button element");
    return;
  }

  button.textContent = text;
}

export function changeButtonStyle(button) {
 if(checkHTMLInstance(button)){

 }
}

export function changeInnerTextContent(element, textContent) {
  if (checkHTMLInstance(element)) {
    element.textContent = textContent;
    }
}