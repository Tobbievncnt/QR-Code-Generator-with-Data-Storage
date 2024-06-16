document.getElementById('qr-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const otherNames = document.getElementById('other_names').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;
    const data = { firstName, lastName, otherNames, email, contact, gender };


	fetch('http://localhost:3000/submit', {
			        method: 'POST',
			        headers: {
			            'Content-Type': 'application/json',
			        },
			        body: JSON.stringify(data)
			    })
			    .then(response => {
			        if (!response.ok) {
			            throw new Error('Failed to save user information');
			        }
			        return response.text();
			    })
				.then(message => {
				    alert(message);
				});

	return fetch('http://localhost:3000/generate-qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
    })
        .then(response => response.blob())
        .then(blob => {
            const qrImage = document.createElement('img');
            const qrImageUrl = URL.createObjectURL(blob);
            qrImage.src = qrImageUrl;
            const qrResultDiv = document.getElementById('qr-result');
            qrResultDiv.innerHTML = '';
            qrResultDiv.appendChild(qrImage);
        })
        .catch(error => console.error('Error generating QR code:', error));

 
});
