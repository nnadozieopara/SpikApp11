const {StatusCodes} = require('http-status-codes');
const path = require('path');
const Cloud = require(path.resolve('services/uploadFile/cloudinary.js'));

const uploadFile  = async (req, res) => {
  
  const uploader = async (path) => await Cloud.uploads(path, 'Images');

  if (req.method === 'POST') {
    const urls = []
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })

  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }
}

module.exports = {uploadFile};
