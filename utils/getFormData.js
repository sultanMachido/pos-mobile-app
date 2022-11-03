

export const getFormData = (imageInfo)=>{
    const formData = new FormData()
    const uri = imageInfo.assets[0].uri;
    const type = imageInfo.assets[0].type;
    const name = imageInfo.assets[0].fileName;
    const source = {
      uri,
      type,
      name,
    }
    formData.append('file', source)
    formData.append('upload_preset', 'fc3gfxta')
    return formData
}