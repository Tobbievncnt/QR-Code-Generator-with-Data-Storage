
const QRCode = require('qrcode');

exports.formatData = (data) => {
	const qrCodeText = `First Name: ${data.firstName} Last Name: ${data.lastName} Other Names: ${data.otherNames} Email: ${data.email} Gender: ${data.gender} Phone Number: ${data.contact}`;
	return qrCodeText;
};

exports.generateQRCode = async (qrCodeText) => {
	const options = {
		errorCorrectionLevel: 'M',
		type: 'image/png',
		margin: 1
	};

	const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
	return qrCodeBuffer;
};
