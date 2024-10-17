const cloudinary = require('cloudinary').v2

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'chat-app'
    })

    // Generate and return the auto-cropped image URL
    const autoCropUrl = cloudinary.url(result.public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500
    })

    return autoCropUrl
  } catch (error) {
    throw new Error('Error uploading or processing the image: ' + error.message)
  }
}

module.exports = uploadImage
