const pokename = document.querySelector('.pokename')
const pokeimg = document.getElementById('pokeimg')
const search = document.querySelector('.pokesearch')
const form = document.querySelector('.form')
const next = document.querySelector('.prox')
const prev = document.querySelector('.prev')
let poke = 1;

const API = async (pokemon) => {
    pokename.innerHTML = "Buscando..."
    pokeimg.style.display = "none"
    const pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(pokedata){
    const pokedatajs = await pokedata.json()
    return pokedatajs;
    }
}

const Pokedex = async (pokemon) => {
    const data = await API(pokemon)
    if(data){
    pokename.innerHTML = `${data.name} / ID: ${data.id} / Type: ${data["types"]["0"]["type"]["name"]} `
    pokeimg.style.display = "block"
    pokeimg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    poke = data.id;
    search.value = '';
    }else{
        pokename.innerHTML = "Não encontramos seu Pokémon!"
        pokeimg.style.display = "none"
    }


    
}

next.addEventListener('click', e => {
    poke += 1;
    Pokedex(poke)
})
prev.addEventListener('click', e => {
    if(poke > 1){
    poke -= 1;
    Pokedex(poke)
    }
})


form.addEventListener('submit', e =>{
    e.preventDefault();
    poke = search.value;
    Pokedex(poke.toLowerCase());
})

