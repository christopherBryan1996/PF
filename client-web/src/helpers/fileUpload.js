export const fileUpload = async (file)=>{


    const cloudUrl='https://api.cloudinary.com/v1_1/dejlsgnm9/upload'
    const formData = new FormData();
    formData.append('upload_preset','clanfest' )
    formData.append('file',file )

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        });
        const cloudResp = await resp.json();
        console.log('url:', cloudResp.secure_url)
        return cloudResp.secure_url;
        // if(resp.ok){
        //     const cloudResp = await resp.json();
        //     console.log('url:', cloudResp.secure_url)
        //     return cloudResp.secure_url;
            
        // }else{
        //     throw await resp.json();
        // }
    } catch (error) {
        console.log(error)
    }

}