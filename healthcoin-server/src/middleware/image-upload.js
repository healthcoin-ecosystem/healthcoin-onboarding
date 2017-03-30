
const path = require('path');
const crypto = require('crypto');

const gm = require('gm');
const mime = require('mime');
const async = require('async');
const multer = require('multer');
const config = require('config');
const fileStore = require('fs-blob-store');

const fileStoreName = 'filestore';
const fileStorePath = path.resolve(__dirname, '../../', config.get('imageUpload.fileStore.path'));
const fileStoreUrl = config.get('imageUpload.fileStore.url');

const store = fileStore(fileStorePath);

const processes = config.get('imageUpload.processes');

Object.keys(processes).forEach(name => {
	const process = processes[name];
	process.name = name;
	process.extension = mime.extension(process.mediaType);
});

/**
 * Express middleware to accept, process, and store image uploads.
 */
function imageUpload() {
	const multerSingle = multer().single('image');

	return (req, res, next) => {

		multerSingle(req, res, err => {
			if (err) { return next(err); }

			if (!req.file) { return next(); }

			const buffer = req.file.buffer;

			const hash = createHash(buffer, 'sha1', 'hex');

			req.body.filename = req.file.originalname;
			req.body.hash = hash;
			req.body.files = [];

			async.eachLimit(processes, 1, (process, callback) => {
				const filePath = createFilePath(hash, process);
				const url = `${fileStoreUrl}/${filePath}`;

				req.body.files.push({
					store: fileStoreName,
					process: process.name,
					key: filePath,
					url: url
				});

				const writeStream = store.createWriteStream(filePath);

				writeStream.once('error', callback);
				writeStream.once('finish', callback);

				processImage(buffer, writeStream, process);

			}, next);
		});

	}
}

const pathMatch = config.get('imageUpload.fileStore.pathMatch');
const pathReplace = config.get('imageUpload.fileStore.pathReplace');
const pathRegExp = new RegExp(pathMatch);

function createFilePath(hash, process) {
	const dirPath = hash.replace(pathRegExp, pathReplace);
	const filePath = `${dirPath}/${process.name}.${process.extension}`;

	return filePath;
}

function createHash(buffer, algorithm, encoding) {
	const hash = crypto.createHash(algorithm);

	hash.update(buffer);

	return hash.digest(encoding);
}

/**
 * Process an input image and produce an output image.
 * @param {ReadableStream|Buffer|string} input - The image to read from.
 * @param {WritableStream|Buffer|string} output - The stream, buffer, or file path to write to.
 * @param {Object} process - Image processing options.
 * @param {function} callback - Called when image processing is complete. Not called if output is a stream.
 */
function processImage(input, output, process, callback) {
	process = process || {};
	const cover = process.cover || false;
	const contain = process.contain || false;
	const gravity = process.gravity || 'Center';
	const width = process.width || 1024;
	const height = process.height || 1024;
	const extension = process.extension || '.jpeg';
	const quality = process.quality || 75;
	const strip = process.strip || false;

	const image = gm(input);

	image.setFormat(extension);
	image.quality(quality);
	image.autoOrient();

	if (cover) {
		// Image will be scaled and cropped to fit width and height while
		// preserving aspect ratio
		image.geometry(width, height, '^');
		image.gravity(gravity);
		image.crop(width, height);
	}

	if (contain) {
		// Image will be scaled to fit within width and height while preserving
		// aspect ratio
		image.geometry(width, height, '>');
	}

	if (strip) {
		// Remove EXIF and other metadata
		image.strip();
		image.noProfile();
	}

	if (typeof output == 'string') {
		image.write(output, callback);
	}
	else if (isStream(output)) {
		image.stream().pipe(output);
	}
	else {
		image.toBuffer(callback);
	}
}

function isStream(obj) {
	return obj != null && typeof obj == 'object' && typeof obj.pipe == 'function';
}

module.exports = imageUpload;
