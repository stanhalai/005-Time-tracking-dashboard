const daily = document.getElementById('daily')
const weekly = document.getElementById('weekly')
const monthly = document.getElementById('monthly')

const cards = document.getElementById('tracking')

let timePeriod = 'monthly'
let trackingData = {}
let trackingCards

const menuPeriod = document.querySelectorAll('.tracking__link')

menuPeriod.forEach(element => {
    element.addEventListener('click', selectPeriod)
})

function selectPeriod(event) {
    timePeriod = event.target.innerText.toLowerCase()
    menuPeriod.forEach(element => {
        element.classList.remove('tracking__link--active')
    })
    event.target.classList.add('tracking__link--active')
    updateCards(timePeriod)
}

function updateCards(timePeriod) {
    trackingCards.forEach(card => {
        updateCard(card, timePeriod)
    })
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.report__activity').innerText
    const current = trackingData[title][timeframe]['current']
    const previous = trackingData[title][timeframe]['previous']

    const timePeriodText = {
        'daily' : 'Yesterday',
        'weekly' : 'Last Week',
        'monthly' : 'Last Month'
    }

    const hoursElement = card.querySelector('.report__current')
    hoursElement.innerText = `${current}hrs`
    const hoursPrElement = card.querySelector('.report__previous')
    hoursPrElement.innerText = `${timePeriodText[timeframe]} - ${previous}hrs`
}

// Get data 
fetch('./js/data.json').then(res => res.json()).then(jsonData => {
    jsonData.forEach(element => {
        cards.insertAdjacentHTML('beforeend', createCard(element, timePeriod))   
    })
    jsonData.forEach(element => {
        trackingData[element.title] = element.timeframes
    })
    
    trackingCards = document.querySelectorAll('.report__card')
    

})


// Create work card 
function createCard(element, timePeriod) {
    let title = element['title']
    let current = element['timeframes'][timePeriod]['current']
    let previous = element['timeframes'][timePeriod]['previous']
    // const current = 8

    const timePeriodText = {
        'daily' : 'Yesterday',
        'weekly' : 'Last Week',
        'monthly' : 'Last Month'
    }
    return `
    <div class="report__card ${title.toLowerCase().replace(/\s/g, '')}">
        <div class="report__inner">
        <div class="report__header">
            <div class="report__activity">${title}</div>
            <button class="report__btn"><img src="./images/icon-ellipsis.svg" alt=""></button>
        </div>
        <div class="report__data">
            <div class="report__current">${current}hrs</div>
            <div class="report__previous">${timePeriodText[timePeriod]} - ${previous}hrs</div>
        </div>
        </div>
    </div>
`
}
