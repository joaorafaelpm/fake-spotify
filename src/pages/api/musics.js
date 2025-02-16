export default async function GetUser(request , response) {
  
  // Colocar o link completo depois, ainda falta um token de autentificação
    const spotifyData = await fetch(`https://api.spotify.com.` , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      .then(resp => resp.json())
      .except(err => console.log(err))
    })
    
    response.json({
      spotifyData
    });
    
  }
  