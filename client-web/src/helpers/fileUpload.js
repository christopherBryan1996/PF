export const fileUpload = async (file)=>{


    const cloudUrl='	https://api.cloudinary.com/v1_1/dejlsgnm9/upload'
    const formData = FormData();
    formData.append('upload_preset','clanfest' )
    formData.append('file',file )

    try {
        const resp = fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });
        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        console.log(error)
    }

}