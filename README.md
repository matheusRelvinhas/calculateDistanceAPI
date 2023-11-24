Back-end - https://calculate-distance-api.vercel.app/
Front-end - https://front-api-calculate-distance.vercel.app/

Calculate distance api é uma solução simples para usuários calculatem distância de forma rápida e inteuitiva.
Ultiliza linguagens para front-end next.js e para back-end node.js.

Exemplo de como ultilizar a api usando axios em typescript:
```
  async function calculateDistance(origin: string, destiny: string) {
    try {
      const response = await axios.get(
        'https://calculate-distance-api.vercel.app/',
        {
          params: {
            origin: origin,
            destiny: destiny,
          },
        }
      );
      if (response.data) {
        const distanceText = response.data.distance.text;
        const distanceValue = response.data.distance.value;
        console.log(distanceValue);
        setDistanceInput(distanceText)
      }
    } catch (error) {
      console.log('Error: Not found');
      setDistanceInput('')
    }
  }
```
A api precisa de dois parâmetros, origin e destiny. Então ela espera a entrada de duas strings, que é o endereço da origem e do destino. Exemplo:
```
  <button
    type='button'
    onClick={() =>
      calculateDistance(
        'Rua abc, 123, bairro1, cidade, estado' , 'Rua def, 456, bairro2, cidade, estado'
      )
    }
  >
    Calcular Distância
  </button>;
```
