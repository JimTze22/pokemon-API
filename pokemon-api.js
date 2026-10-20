'use strict';

function fetchData() {

    const pokemonId = document.getElementById("pokemonId").value;
    const imgElement = document.getElementById("pokemonSprite");
    const labels = document.querySelectorAll(".label");
    const spanpokename = document.getElementById("pokename");
    const spanpokeheight = document.getElementById("pokeheight");
    const spanpokeweight = document.getElementById("pokeweight");
    const spanpoketype = document.getElementById("poketype");
    const spanpokeability = document.getElementById("pokeability");
    const imagecontainer = document.getElementById("image-container");
    const card = document.getElementById("card");
    const failmessage = document.getElementById("fail");


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }

            return response.json();

        })
        .then(data => {

            const pokemonSprite = data.sprites.front_default;
            const name = data.name;
            const height = data.height;
            const weight = data.weight;

            //map() function gets all the items from 'type' property in api and make an array of them 
            const types = data.types.map(item => item.type.name);
            const abilities = data.abilities.map(item => item.ability.name);



            //instead of the map() function we can use forEach
            /*
            let types = [];

            data.types.forEach(function (item) {
                types.push(item.type.name);
            });*/




            failmessage.style.display = "none";
            imgElement.src = pokemonSprite;
            card.style.display = "block";
            imagecontainer.style.display = "block";
            imgElement.style.display = "block";


            //display the paragraphs in the browser
            labels.forEach(function (l) {

                l.style.display = "block";

            });

            //write its pokemon info in the span elements
            spanpokename.innerText = name;
            spanpokeheight.innerText = height;
            spanpokeweight.innerText = weight;
            spanpokeability.innerText = abilities.join(" , ");
            spanpoketype.innerText = types.join(" , ");



        })
        .catch(error => {

            card.style.display = "none";
            failmessage.style.display = "block";
            console.error(error);
        });

}

//the fetch function but with async and await
/*async function fetchData(){

    try{

        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }
}*/

document.getElementById("fetchButton").addEventListener('click', function (ev) {

    fetchData();

});