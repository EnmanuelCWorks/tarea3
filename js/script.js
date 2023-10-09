const form = document.getElementById('contact-form');
        const contactList = document.getElementById('contact-list');

        fetch('http://www.raydelto.org/agenda.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(contact => {
                    const li = document.createElement('li');
                    li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
                    contactList.appendChild(li);
                });
            });

        form.addEventListener('submit', event => {
            event.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const telefono = document.getElementById('telefono').value;

            fetch('http://www.raydelto.org/agenda.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, telefono })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const li = document.createElement('li');
                    li.textContent = `${nombre} ${apellido} - ${telefono}`;
                    contactList.appendChild(li);

                    form.reset();
                } else {
                    alert('Hubo un error al agregar el contacto.');
                }
            });
        });