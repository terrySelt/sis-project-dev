import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: 'dvgn925ka',
    api_key: '593276425577911',
    api_secret: 'wA_sLRPhAqD8C7ZsJ5jdRMuTkxM'
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'sis-project'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}