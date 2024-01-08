const calendarBody = document.getElementById("calendarBody");
const calendarHeader = document.getElementById("calendarMonthYear");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

let currentDate = new Date();

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    calendarHeader.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

    calendarBody.innerHTML = '';

    for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(year, month, i);
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        calendarBody.appendChild(dayElement);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());



function showContent(content) {

    const titleElement = document.querySelector('.top-center-text');

    if (content === 'Today') {
        titleElement.textContent = 'Today';
    } else if (content === 'Inbox') {
        titleElement.textContent = 'Inbox';
    }
    const storedInfo = localStorage.getItem('storedInfo');
    const infoArray = storedInfo ? JSON.parse(storedInfo) : [];
    const container = document.querySelector('.container');
    container.innerHTML = '';

    if (content === 'Today') {
        const filteredInfo = infoArray.filter(info => info.toLowerCase().includes('today'));
        displayFilteredContent(filteredInfo, container);
        updateTitle('Today');
    } else if (content === 'Inbox') {
        displayFilteredContent(infoArray, container);
        updateTitle('Inbox');
    }


}
function updateTitle(titleText) {
    const titleElement = document.querySelectorAll('.exe');
    titleElement.textContent = titleText;
    titleElement.style.fontSize = '24px';
    titleElement.style.textAlign = 'center';

}
function displayFilteredContent(filteredInfo, container) {
    if (filteredInfo.length > 0) {
        const ul = document.createElement('ul');
        filteredInfo.forEach(info => {
            const li = document.createElement('li');
            li.textContent = info;

            let clickCount = 0;

            li.addEventListener('click', function(event) {
                clickCount++;
                if(clickCount===1) {
                    const clickedLi = event.target;
                    clickedLi.classList.toggle('completed');
                }else if(clickCount ===2) {

                    const clickedLi = event.target;
                    const ul = clickedLi.parentNode;
                    ul.removeChild(clickedLi);
                    updateStoredInfo();
                }
            });
            ul.appendChild(li);
        });
        container.appendChild(ul);
    } else {
        container.textContent = `No tasks`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const plusButton = document.querySelector('.plus-button');
    plusButton.addEventListener('click', function() {
        const info = prompt('Doing something ?:');
        if (info !== null && info.trim() !== '') {

            const storedInfo = localStorage.getItem('storedInfo');
            const infoArray = storedInfo ? JSON.parse(storedInfo) : [];
            infoArray.push(info);
            localStorage.setItem('storedInfo', JSON.stringify(infoArray));
            showContent('Inbox');
        }
    });


    const container = document.querySelector('.container');
    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
       applyUnderline(e);
            updateStoredInfo();
        }
    });
});


function updateStoredInfo() {
    const lis = document.querySelectorAll('.container ul li');
    const infoArray = Array.from(lis).map(li => li.textContent);
    localStorage.setItem('storedInfo', JSON.stringify(infoArray));
}

function applyUnderline(event) {
    const clickedLi = event.target;
    clickedLi.classList.toggle('underlined');

}

