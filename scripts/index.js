class CountryCollection{

    constructor(items){
        this.items = items
    }

    first() {
        return new CountryPath(this.items[0])
    }

    find(index){
        return new CountryPath(this.items[index])
    }

    static get(){
        return new CountryCollection(document.querySelectorAll("path"))
    }

    for(funct){
        this.items.forEach(countryPath => {
            funct( new CountryPath(countryPath))            
        });
    }
}


class CountryPath{

    constructor(element){
        this.element = element
        this.setTooltip(`País: ${this.name()}`)
    }

    fill(color){
        this.element.setAttribute("fill", color)
    }

    name(){
        return this.element.getAttribute("id")
    }

    setPopulation(population){
        this.element.setAttribute("population", population)
    }


    setTooltip(string){
        this.element.setAttribute("title", string)
    }

    static findByName(name){
        return new CountryPath(document.getElementById(name))
    }
    
}

console.log(
    CountryCollection.get().find(3).fill("red"))

class Response{
    constructor(object){
        this.object=object
    }
    population(){
        return this.object.population
    }

    region(){
        return this.object.region

    }

    subregion(){
        return this.object.subregion

    }

    area(){
        return this.object.area

    }
}


class CountryAPI{
    static async findByName(name){
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`)

        if(response.status == 404){
            throw Error(`country ${name} not found`)
        }

        return new Response((await response.json())[0])
    }
}

CountryCollection.get().for(async countryPath =>{
    const response = await CountryAPI.findByName( countryPath.name() )
    

    if(response.population() < 10000000){
        countryPath.fill("rgb(187,210,245)")
        return
    }

    if(response.population() < 100000000){
        countryPath.fill("rgb(187,157,227)")
        return
    }

    countryPath.fill("rgb(31,101,228)")

} )