
// Archivo principal de comportamiento de login y precios

function validarForm() {
  console.log('ValidarForm');
  const emailValido = 'revendedor@gmail.com';
  const pswValido = 'revendedor2024';

  const usrEmailElem = document.getElementById('user_input');
  const usrPswElem = document.getElementById('user_password');
  const usrEmail = usrEmailElem ? usrEmailElem.value.trim() : '';
  const usrPsw = usrPswElem ? usrPswElem.value : '';

  let esValido = true;

  // Condicionales para validar
  if (usrEmail.length < 1) {
    mostrarError('empty_email', 'El campo email no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_email');
  }

  if (usrPsw.length < 1) {
    mostrarError('empty_psw', 'El campo password no puede estar vacío');
    esValido = false;
  } else {
    ocultarError('empty_psw');
  }

  if (esValido) {
    if (emailValido !== usrEmail || pswValido !== usrPsw) {
      mostrarError('login_error', 'Las credenciales no son válidas');
      esValido = false;
    } else {
      ocultarError('login_error');
    }
  } else {
    ocultarError('login_error');
  }

  return esValido;
}

function mostrarError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + '_error');
  if (!errorElement) return;
  errorElement.textContent = '❌ ' + message;
  errorElement.style.display = 'block';
}

function ocultarError(fieldId) {
  const errorElement = document.getElementById(fieldId + '_error');
  if (!errorElement) return;
  errorElement.style.display = 'none';
}

// Actualiza la visualización de los precios según si hay un usuario logueado
function updatePricesDisplay() {
  const estaLogueado = !!localStorage.getItem('usuarioLogueado');
  const precioElems = document.querySelectorAll('.precio-actual');

  precioElems.forEach(elem => {
    // Guardamos el precio original en data-original la primera vez
    if (!elem.dataset.original) {
      elem.dataset.original = elem.textContent.trim();
    }

    if (estaLogueado) {
      elem.textContent = elem.dataset.original;
    } else {
      elem.textContent = 'Ingresa para ver $';
    }
  });
}

/*
  Listeners seguros para login / logout
*/
const btnIngresar = document.getElementById('boton_login');
if (btnIngresar) {
  btnIngresar.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Entramos en el listener');
    if (validarForm()) {
      const usrEmail = document.getElementById('user_input').value.trim();
      const loginExitoso = document.querySelector('.login_exitoso');
      const contenedorLogin = document.querySelector('.contenedor_login');
      const emailUsuario = document.getElementById('email_usuario');

      // Guardar el email en localStorage
      localStorage.setItem('usuarioLogueado', usrEmail);

      if (emailUsuario) emailUsuario.textContent = usrEmail;
      if (loginExitoso) loginExitoso.style.display = 'block';
      if (contenedorLogin) contenedorLogin.style.display = 'none';

      // Actualizamos los precios para mostrar los valores reales
      updatePricesDisplay();
    }
  });
}

// Listener para Cerrar sesión (si el botón está presente)
const btnLogout = document.getElementById('boton_logout');
if (btnLogout) {
  btnLogout.addEventListener('click', function() {
    localStorage.removeItem('usuarioLogueado');
    const loginExitoso = document.querySelector('.login_exitoso');
    const contenedorLogin = document.querySelector('.contenedor_login');
    const emailUsuario = document.getElementById('email_usuario');

    if (emailUsuario) emailUsuario.textContent = '';
    if (loginExitoso) loginExitoso.style.display = 'none';
    if (contenedorLogin) contenedorLogin.style.display = 'flex';

    updatePricesDisplay();
  });
}

// Verificar estado al cargar la página (usar addEventListener para evitar sobrescribir otros onload)
window.addEventListener('load', function() {
  const usuarioLogueado = localStorage.getItem('usuarioLogueado');

  if (usuarioLogueado) {
    const loginExitoso = document.querySelector('.login_exitoso');
    const contenedorLogin = document.querySelector('.contenedor_login');
    const emailUsuario = document.getElementById('email_usuario');

    if (emailUsuario) emailUsuario.textContent = usuarioLogueado;
    if (loginExitoso) loginExitoso.style.display = 'block';
    if (contenedorLogin) contenedorLogin.style.display = 'none';
  }

  // Siempre actualizamos la visibilidad de los precios al cargar
  updatePricesDisplay();
});