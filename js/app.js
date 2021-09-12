const wrapperTabsEl = document.getElementById("wrapperTabs");
const wrapperContainerTabsEl = document.getElementById("wrapperContainerTabs");
const wrapperUkraineEl = document.getElementById("Ukraine");
const wrapperWorldEl = document.getElementById("World");
const keys = ["confirmed", "deaths", "recovered", "existing"];
const currentTime = new Date(Date.now()).toISOString().slice(0, 10);
const yestardayTime = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
let ukraineData = [];
let worldData = [];
let abdd = [];
let yestardayConfirmed = 0;

wrapperTabsEl.addEventListener("click", (e) => {
  const tab = e.target.closest("button");
  Array.from(wrapperTabsEl.children).forEach((btn) => btn.classList.remove("active"));
  if (tab) {
    tab.classList.add("active");
    const region = tab.dataset.region;
    Array.from(wrapperContainerTabsEl.children).forEach((tabPage) => tabPage.classList.remove("active_tab"));
    document.getElementById(region).classList.add("active_tab");
  }
});

function currentFetchFromDataCenter() {
  fetch(`https://api-covid19.rnbo.gov.ua/data?to=${currentTime}`)
    .then((res) => res.json())
    .then((data) => {
      ukraineData = data.ukraine;
      worldData = data.world;
      yesterdayFetchFromDataCenter(`https://api-covid19.rnbo.gov.ua/data?to=${yestardayTime}`);
    })
    .catch((error) => console.warn(error));
}

currentFetchFromDataCenter();

function yesterdayFetchFromDataCenter(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      yestardayUkraineData = data.ukraine;
      yestardayWorldData = data.world;
      renderCoronaData(wrapperUkraineEl, ukraineData, yestardayUkraineData);
      renderCoronaData(wrapperWorldEl, worldData, yestardayWorldData);
    })
    .catch((error) => console.warn(error));
}

// function renderCoronaData(elemForRender, dataArray) {
//   elemForRender.innerHTML = createDataArr(dataArray).join("");
// }

// function createDataArr(dataArray) {
//   return dataArray.map((field) => createDataField(field));
// }

// function createDataField(field) {
//   return `<dl class="wrapper-data">
//             <dt class="wrapper-data__country">${field?.label?.uk}</dt>
//             <dd class="wrapper-data__confirmed">
//               ${field?.confirmed}
//             </dd>
//             <dd class="wrapper-data__deaths">${field?.deaths}</dd>
//             <dd class="wrapper-data__recovered">${field?.recovered}</dd>
//             <dd class="wrapper-data__existing">${field?.existing}</dd>
//           </dl>`;
// }


function renderCoronaData(elemForRender, dataArray, dataArrayYestarday) {
  elemForRender.innerHTML = createDataArr(dataArray, dataArrayYestarday);
}

function createDataArr(dataArray, dataArrayYestarday) {
  let fieldHtml = '';
  for (let i = 0; i < dataArrayYestarday.length; i++) {
    fieldHtml += createDataField(dataArray[i], dataArrayYestarday[i])
  }
  return fieldHtml;
}

function createDataField(field, fieldYestarday) {
  // let confirmed = '';
  // if (field?.confirmed > fieldYestarday?.confirmed){
  //   confirmed = `<p><i class="fas fa-arrow-up"></i>${(field?.deaths - fieldYestarday?.deaths)}</p>`
  // }
  // if (field?.confirmed < fieldYestarday?.confirmed) {
  //   confirmed = `<p><i class="fas fa-arrow-down"></i>${(field?.deaths - fieldYestarday?.deaths)}</p>`
  // }
  // if ((field?.confirmed - fieldYestarday?.confirmed) == 0){
  //   console.log(123);
  //   confirmed = `<p>${(field?.deaths - fieldYestarday?.deaths)}</p>`
  // }
  return `<dl class="wrapper-data">
            <dt class="wrapper-data__country">${field?.label?.uk}</dt>
            <dd class="wrapper-data__confirmed">
              <p>${field?.confirmed}</p>
              ${((field?.confirmed - fieldYestarday?.confirmed) >= 0) ? `<p><i class="fas fa-arrow-up"></i>${(field?.confirmed - fieldYestarday?.confirmed)}</p>` : `<p><i class="fas fa-arrow-down"></i>${(field?.confirmed - fieldYestarday?.confirmed)}</p>`}
            </dd >
            <dd class="wrapper-data__deaths">
              <p>${field?.deaths}</p>
              ${((field?.deaths - fieldYestarday?.deaths) >= 0) ? `<p><i class="fas fa-arrow-up"></i>${(field?.deaths - fieldYestarday?.deaths)}</p>` : `<p><i class="fas fa-arrow-down"></i>${(field?.deaths - fieldYestarday?.deaths)}</p>`}
            </dd >
            <dd class="wrapper-data__recovered">
              <p>${field?.recovered}</p>
              ${((field?.recovered - fieldYestarday?.recovered) >= 0) ? `<p><i class="fas fa-arrow-up"></i>${(field?.recovered - fieldYestarday?.recovered)}</p>` : `<p><i class="fas fa-arrow-down"></i>${(field?.recovered - fieldYestarday?.recovered)}</p>`}
            </dd >
            <dd class="wrapper-data__existing">
              <p>${field?.existing}</p>
              ${((field?.existing - fieldYestarday?.existing) >= 0) ? `<p><i class="fas fa-arrow-up"></i>${(field?.existing - fieldYestarday?.existing)}</p>` : `<p><i class="fas fa-arrow-down"></i>${(field?.existing - fieldYestarday?.existing)}</p>`}
            </dd >
          </dl > `;
}

















// function createSmartKeyForDifferenceCount(dataArrayFirst, dataArraySecond, smartKeys) {
//   return smartKeys.map((smartKey) =>
//     createYestardayData(dataArrayFirst, dataArraySecond, smartKey)
//   );
// }

// function createYestardayData(dataArrayFirst, dataArraySecond, smartKey) {
//   let arrToday = dataArrayFirst.map((res) => res[smartKey]);
//   let arrYesterday = dataArraySecond.map((res) => res[smartKey]);
//   let newArr = [];
//   for (let i = 0; i < arrYesterday.length; i++) {
//     newArr.push(arrToday[i] - arrYesterday[i]);
//   }
//   return createDifferenceFieldsets(newArr);
// }

// function createDifferenceFieldsets(fieldsets) {
//   return fieldsets.map((field) => createDifferenceField(field));
// }

// function createDifferenceField(field) {
//   return `${field > 0 ? `<p><i class="fas fa-arrow-up"></i> ${field}</p>` : `<p><i class="fas fa-arrow-down"></i> ${field}</p>`} `;
// }
