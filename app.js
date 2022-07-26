// get access to all tabs and panels
const tabs = [...document.querySelectorAll('[role=tab]')];

function handleTabClick(e){
  const panels = [...document.querySelectorAll("[role=tabpanel]")];
  // get panel to show
  const panelToControl = e.currentTarget.getAttribute('aria-controls');
  // loop through all panels and hide/show correct panel
  panels.forEach(p => {
    p.setAttribute('aria-hidden', `${p.id === panelToControl ? 'false' : 'true'}`)
  })
  // update the aria label for correct button
  tabs.forEach(t => {
    t.setAttribute('aria-selected', `${t === e.currentTarget ? 'true' : 'false'}`)
  })
}

function handleKeyDownEvent(e){
  const actEl = document.activeElement;
  if(!actEl.classList.contains('tab')){return}
  switch(e.key){
    case 'ArrowLeft':
      e.preventDefault();
      if(actEl === tabs[0]){
        return tabs[tabs.length -1].focus();
      }
      actEl.previousElementSibling.focus();
      break;
    case 'ArrowRight':
      e.preventDefault();
      if (actEl === tabs[tabs.length - 1]) {
        return tabs[0].focus();
      }
      actEl.nextElementSibling.focus();
      break;
    default:
      return;
  }
}

// on selection of tabs, show panel
tabs.forEach(tab => {
  tab.addEventListener('click', handleTabClick)
})

// keyboard events
window.addEventListener('keydown', handleKeyDownEvent);

function getTimeMeasurement(time){
  switch(time){
    case "daily":
      return "Yesterday"
    case "weekly":
      return "Last week"
    case "monthly":
      return "Last month"
    default:
      return;
  }
}

function retrieveTimeData(obj, period){
  return obj.time[period];
}

function generateCardHTMLString(data){
  const htmlString = Object.entries(data).map(time => {
    const timePeriod = time[0];
    const timeMeasurement = getTimeMeasurement(timePeriod);
    return `
      <div class="container--timecards" role="tabpanel" aria-labelledby="tab-${timePeriod}" id="panel-${timePeriod}" aria-hidden="${
      timePeriod === "daily" ? "false" : "true"
    }">
      <div class="card timecard timecard-work">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-work.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Work
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Work"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Work"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
      <div class="card timecard timecard-play">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-play.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Play
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Play"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Play"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
      <div class="card timecard timecard-study">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-study.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Study
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Study"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Study"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
      <div class="card timecard timecard-exercise">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-exercise.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Exercise
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Exercise"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Exercise"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
      <div class="card timecard timecard-social">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-social.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Social
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Social"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Social"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
      <div class="card timecard timecard-selfcare">
        <div class="card--sm timecard--top">
          <img class="icon" src="./images/icon-self-care.svg" aria-hidden="true">
        </div>
        <div class="timecard--bottom card--lg">
          <div class="timecard--title">
            <h2>
              Self Care
            </h2>
            <button class="btn" aria-label="interactive button">
              <svg aria-hidden="true" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="currentColor" fill-rule="evenodd"/></svg>
            </button>
          </div>
          <div class="timecard--amt">
            <p class="current">
              ${retrieveTimeData(
                ...time[1].filter((t) => t.title === "Self Care"),
                "current"
              )}hrs
            </p>
            <p class="previous">
              ${timeMeasurement} •  ${retrieveTimeData(
      ...time[1].filter((t) => t.title === "Self Care"),
      "previous"
    )}hrs
            </p>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  ).join('')

  return htmlString;
}

// Loading Live Data
async function fetchLiveData(){
  const data = await fetch('./data.json');
  const body = await data.json();
  // loop through each object and filter out the dailiy, monthly, and weekly into an object with the type
  const dailyData = body.map(type => (
    {
      time: type.timeframes.daily,
      title: type.title,
    }
  ))
  const weeklyData = body.map(type => (
    {
      time: type.timeframes.weekly,
      title: type.title,
    }
  ))
  const monthlyData = body.map(type => (
    {
      time: type.timeframes.monthly,
      title: type.title,
    }
  ))
  // pass each array to a function that will build out the necessary template
  document.querySelector('#panel-container').innerHTML = generateCardHTMLString({
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
  })
}

fetchLiveData()