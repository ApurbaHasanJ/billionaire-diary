let fetchData = [];
let currentDataLimit = 15;

const loadBillionaire = (clickForBill) => {
    const url = `https://forbes400.onrender.com/api/forbes400/${clickForBill}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data
            displayBillionaires(fetchData.slice(0, currentDataLimit))});
        
}


// Show All Billionaires on click or on load
const displayBillionaires = (billionaires) => {
    console.log(billionaires)
    const billionairesContainer = document.getElementById('billionaire-container');


    const loadMoreBtn = document.getElementById('load-more-btn')
    loadMoreBtn.addEventListener('click', () => {
        currentDataLimit += 15
        displayBillionaires(fetchData.slice(0, currentDataLimit))
        if(currentDataLimit >= fetchData.length){
            loadMoreBtn.classList.add('hidden')
        }
    })

    billionairesContainer.innerHTML = `
        <div class="bg-slate-100 h-24 flex items-center"> 
            <h1 class="text-center text-3xl font-extrabold mx-auto font1">
            Richest by industry <br>
            <span class="text-lg">(Technology)</span>
            </h1>
        </div>
        <div class="grid richest-by-industry grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-5 gap-4">
        </div>
    `;
    const billionairesGrid = billionairesContainer.querySelector('.richest-by-industry');
    billionaires.forEach(billionaire => {
        // const sharePrice = billionaire.financialAssets[0].sharePrice.toFixed(2);
        // console.log(billionaire.financialAssets)

        const billionairesDiv = document.createElement('div');
        billionairesDiv.classList.add('bg-slate-900', 'p-4', 'text-white', 'font-2');
        billionairesDiv.innerHTML = `
            <h1 class="text-center font1 text-xl mb-3">${billionaire.person.name}</h1>
            <div class="flex items-center justify-between">
                <div class="pr-2">
                    <img class="w-32" src="${billionaire.person.squareImage}" alt="No Img Found">
                    <strong>Source: <span class="text-slate-50 font-normal">${billionaire.source}</span></strong>
                </div>
                <div class="border-l-2 border-white-500 pl-2">
                    <p class="font-semibold">Citizenship: <span class="text-slate-50 font-normal">${billionaire.countryOfCitizenship}</span> </p>
                    <p class="font-semibold">State: <span class="text-slate-50 font-normal">${billionaire.state ? billionaire.state : 'No Data Found'}</span></p>
                    <p class="font-semibold">City: <span class="text-slate-50 font-normal">${billionaire.city ? billionaire.city : 'No Data Found'}</span> </p>
                    

                    <p class="font-semibold">Total Shares: <span class="text-slate-50 font-normal">${billionaire.financialAssets && billionaire.financialAssets[0] ? billionaire.financialAssets[0].numberOfShares : "No Data Found"}</span> </p>
                    <p class="font-semibold">Total Shares: <span class="text-slate-50 font-normal">${billionaire.financialAssets && billionaire.financialAssets[0] ? billionaire.financialAssets[0].sharePrice.toFixed(2) : "No Data Found"}</span> </p>

                    
                </div>
            </div>
        `;
        billionairesGrid.appendChild(billionairesDiv);
    })
    
}

// loadBillionaire('getAllBillionaires')