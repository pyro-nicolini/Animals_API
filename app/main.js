/** es necesario correr una clave $env:SECRET="mi-secreto"   */

const footer = '  <footer class="footer"><p>This project was remastered by <a href="https://github.com/pyro-nicolini">PyrO_dev</a> ©</p></footer>';


const animalIcons = [
    'fas fa-dog', 
    'fas fa-cat', 
    'fas fa-fish', 
    'fas fa-dove', 
    'fas fa-hippo', 
    'fas fa-frog'
];

// Función para crear y posicionar íconos aleatoriamente
function createRandomIcons() {
    const icon = document.createElement('i');
    const randomIndex = Math.floor(Math.random() * animalIcons.length);
    icon.className = `animal-icon ${animalIcons[randomIndex]}`;
    
    // Posición aleatoria dentro de la ventana
    icon.style.position = 'absolute';
    icon.style.top = `${Math.random() * window.innerHeight}px`;
    icon.style.left = `${Math.random() * window.innerWidth}px`;
    icon.style.fontSize = '5rem'; // Ajusta el tamaño según sea necesario
    
    document.body.appendChild(icon);
    
    // Desaparecer el ícono después de un tiempo aleatorio
    setTimeout(() => {
        icon.remove(); // Elimina el ícono del DOM
    }, Math.random() * 1000 + 1000); // Desaparece entre 1 y 3 segundos
}

// Función para generar íconos repetidamente
function generateIcons() {
    setInterval(createRandomIcons, 500); // Crea un nuevo ícono cada segundo
}


const loadStyle = () => {
    var cssId = 'myCss';
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './style.css';
        head.appendChild(link);
    }
};

const loadInitialTemplate = () => {
    const template = `
    <div class="card">
        <i class="fas fa-cat"></i>
        <h1>Animals</h1>
            <form id="animal-form">
            <div class="name">
                <label>Name</label>
                <input name="name" placeholder="Animal Name" required />
            </div>
            <div class="type">
                <label>Type</label>
                <input name="type" placeholder="Type of Animal" required />
            </div>
            <button class="button" type="submit">Send</button>
            </form>
            <h3>List of animals</h3>
            <ul id="animal-list"></ul>
    </div>
    
    ${footer}
    `;
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
};

const loadRegisterTemplate = () => {
    const template = `
        <div class="card">
            <i class="fas fa-dog"></i>
            <h1>Register</h1>
            <form id="register-form">
                <div class="name">
                    <label>Email</label>
                    <input name="email" placeholder="Email" required />
                </div>
                <div class="type">
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" required />
                </div>
                <button class="button" type="submit">Registrar</button> 
            </form>
            <label>Ya tienes una cuenta?</label>
            <a href="#" class="button" id="login" type="submit">Log In</a>
            <div class="error" id="error"></div>
        </div>
        
        ${footer}
        `;
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
};

const loadLoginTemplate = () => {
    const template = `
        <div class="card">
            <i class="fas fa-hippo"></i>
            <h1>Login</h1>
            <form id="login-form">
                <div class="name">
                    <label>Email</label>
                    <input name="email" placeholder="Email" required />
                </div>
                <div class="type">
                    <label>Password</label>
                    <input name="password" type="password" placeholder="Password" required />
                </div>
                <button class="button" type="submit">Entrar</button> 
            </form>
            <label>! Regístrate aquí !</label>
            <a href="#" class="button" id="register" type="submit">Register?</a>
            <div class="error" id="error"></div>
        </div>
        
        ${footer}
        `;
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
};

const checkLogin = () => localStorage.getItem('jwt');

const getAnimals = async () => {
    const response = await fetch('/animals', {
        headers: {
            Authorization: localStorage.getItem('jwt'),
        }
    });


    if (!response.ok) {
        console.error('Failed to fetch animals:', response.statusText);
        return;
    }

    const animals = await response.json();
    const template = animal => `
        <li>
            ${animal.name} ${animal.type} <button class="button bg-red" data-id="${animal._id}">Delete</button>
        </li>
    `;

    const animalList = document.getElementById('animal-list');
    animalList.innerHTML = animals.map(animal => template(animal)).join('');

    animals.forEach(animal => {
        const animalNode = document.querySelector(`[data-id="${animal._id}"]`);
        animalNode.onclick = async () => {
            const deleteResponse = await fetch(`/animals/${animal._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('jwt'),
                }
            });


            if (deleteResponse.ok) {
                animalNode.parentNode.remove();
            } else {
                console.error('Failed to delete animal:', deleteResponse.statusText);
            }
        };
    });
};

const addFormListener = () => {
    const animalForm = document.getElementById('animal-form');
    animalForm.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(animalForm);
        const data = Object.fromEntries(formData.entries());
        
        const response = await fetch('/animals', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('jwt'),
            }
        });


        if (response.ok) {
            animalForm.reset();
            getAnimals();
        } else {
            console.error('Failed to add animal:', response.statusText);
        }
    };
};

const animalsPage = () => {
    loadInitialTemplate();
    addFormListener();
    getAnimals();
};

const authListener = action => () => {
    const form = document.getElementById(`${action}-form`);
    form.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`./${action}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const responseData = await response.text();

        if (response.status >= 300) {
            const errorNode = document.getElementById('error');
            errorNode.innerHTML = responseData;
        } else {
            localStorage.setItem('jwt', `Bearer ${responseData}`);
            animalsPage();
        }
    };
};

const addRegisterListener = () => {
	const registerForm = document.getElementById('register-form')
	registerForm.onsubmit = async (e) => {
		e.preventDefault()
		const formData = new FormData(registerForm)
		const data = Object.fromEntries(formData.entries())

		const response = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			}
		})

		const responseData = await response.text()
		if (response.status >= 300) {
			const errorNode = document.getElementById('error')
			errorNode.innerHTML = responseData
		} else {
			loginPage()
		}
	}
}


const gotoRegisterListener = () => {
    const gotoRegister = document.getElementById('register');

    gotoRegister.onclick = (e) => {
        e.preventDefault();
        registerPage();
    };
};

const addLoginListener = authListener('login');

const gotoLoginListener = () => {
    const gotoLogin = document.getElementById('login');

    gotoLogin.onclick = (e) => {
        e.preventDefault();
        loginPage();
    };
};

const registerPage = () => {
    console.log('Register Page');
    loadRegisterTemplate();
    addRegisterListener();
    gotoLoginListener();
};

const loginPage = () => {
    loadLoginTemplate();
    addLoginListener();
    gotoRegisterListener();
};

window.onload = () => {
    generateIcons()
    loadStyle();
    const isLoggedIn = checkLogin();
    if (isLoggedIn) {
        animalsPage();
    } else {
        loginPage();
    }
};
