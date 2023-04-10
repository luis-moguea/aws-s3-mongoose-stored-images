const fileInput = document.querySelector("#file-js")


fileInput.addEventListener("click", (e)=>{
    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.addEventListener("load", () => {
        console.log(reader.result)
    })

    if(file){
        reader.readAsDataURL(file)
    }
})


//fetch try

/* const uploadImage = async () => {
    const newImage = {
    }

    try {
        const response = await fetch("http://localhost:3000/api/upload-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newImage)
        })

        if(response.ok){
            const responseJson = await response.json()
            const { image } = responseJson
        }
    } catch (error) {
        console.log(error)
    } 
    
} */