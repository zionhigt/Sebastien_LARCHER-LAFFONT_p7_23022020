const multer = require('multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/gif': 'gif',
	'image/webp': 'webp',
	'video/x-flv': 'flv',
	'video/mp4': 'mp4',
	'video/MP2T': 'ts',
	'video/3gpp': '3gp',
	'video/quicktime': 'mov',
	'video/avi': 'avi',
	'video/x-ms-wmv': 'wmv',
	'audio/mpeg': 'mp3',
	'audio/mp4': 'mp4',
	'audio/wav': 'wav',
	'audio/x-ms-wma': 'wma'


}









const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images')
	},
	filename: (rep, file, callback) => {
		const name = file.originalname.split(' ').join('_');
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + '.' + extension);
	}
});

module.exports = multer({ storage }).single('image');