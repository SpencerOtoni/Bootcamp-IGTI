/**
 * Estado da aplicação
 */

  let tabCountries = null
  let allCoutries = []
  let countCoutries = 0
  let totalPopulationList = 0

  let tabFavorites = null
  let favoritesCoutries = []
  let countFavorites = 0
  let totalPopulationFavorites = 0

  let numberFormat = null

  window.addEventListener('load', () => {
    countCoutries = document.querySelector('#countCountries')
    totalPopulationList = document.querySelector('#totalPopulationList')
    tabCountries = document.querySelector('#tabCountries')

    countFavorites = document.querySelector('#countFavorites')
    totalPopulationFavorites = document.querySelector('#totalPopulationFavorites')
    tabFavorites = document.querySelector('#tabFavorites')

    numberFormat = Intl.NumberFormat('pt-BR')

    fetchCountries()
  })

  async function fetchCountries(){
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const json = await res.json()
    allCoutries = json.map(country =>{
      const {numericCode, translations, population, flag} = country

      return{
        id: numericCode,
        name: translations.pt,
        population,
        flag
      }
    })
    .sort((a, b)=>{
      return a.name.localeCompare(b.name)
    })

    render()
  }

  function render(){
    renderCountryList()
    renderFavorites()
    renderSummary()
    renderCountryButtons()
  }

  function renderCountryList(){
    let countCoutriesHTML = '<div>'

    allCoutries.forEach(country => {
      const { id, name, population, flag } = country

      const countryHTML = `
      <div class='country'> 
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>

        <div>
          <img src="${flag}" alt="${name}">
        </div>

        <div>
          <ul>
            <li>${name}</li>
            <li>${formatNumber(population)}</li>
          </ul>
        </div>
      </div>
      ` 
      countCoutriesHTML += countryHTML
    })

    countCoutriesHTML += "</div>"

    tabCountries.innerHTML = countCoutriesHTML
  }

  function renderFavorites(){

    let favoritesHTML = '<div>'

    favoritesCoutries.forEach(country => {
      const { id, name, population, flag } = country

      const favoriteHTML = `
        <div class='country'> 
          <div>
            <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
          </div>

          <div>
            <img src="${flag}" alt="${name}">
          </div>

          <div>
            <ul>
              <li>${name}</li>
              <li>${formatNumber(population)}</li>
            </ul>
          </div>
        </div>
        ` 
        favoritesHTML += favoriteHTML
    })

    favoritesHTML += "</div>"

    tabFavorites.innerHTML = favoritesHTML

  }

  function  renderSummary(){
    countCoutries.textContent = allCoutries.length
    countFavorites.textContent = favoritesCoutries.length

    const totalPopulation =  allCoutries.reduce((acc, curr) =>{
      return acc + curr.population
    },0)

    totalPopulationList.textContent = formatNumber(totalPopulation)

    const totalFavorites =  favoritesCoutries.reduce((acc, curr) =>{
      return acc + curr.population
    },0)

    totalPopulationFavorites.textContent = formatNumber(totalFavorites)
  }

  function renderCountryButtons(){
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'))
    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'))

    countryButtons.forEach(button =>{
      button.addEventListener('click', () => {
        addToFavorites(button.id)
      })
    })

    favoriteButtons.forEach(button =>{
      button.addEventListener('click', () => {
        removeFromFavorites(button.id)
      })
    })
  }


  function addToFavorites(id){
    const contryToAdd = allCoutries.find(button => button.id === id)

    favoritesCoutries = [...favoritesCoutries, contryToAdd]
   
    favoritesCoutries.sort((a, b)=>{
      return a.name.localeCompare(b.name)
    })

    allCoutries = allCoutries.filter(country => country.id !== id)

    render()

  }

  function removeFromFavorites(id){
    const contryToRemove = favoritesCoutries.find(button => button.id === id)

    allCoutries = [...allCoutries, contryToRemove]
   
    allCoutries.sort((a, b)=>{
      return a.name.localeCompare(b.name)
    })

    favoritesCoutries = favoritesCoutries.filter(country => country.id !== id)

    render()
  }

  function formatNumber(number){
    return numberFormat.format(number)
  }