const calendarBody = document.getElementById('calendarBody');
const calendarHeader = document.getElementById('calendarMonthYear');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
let currentDate = new Date();
let today = new Date();

generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  calendarHeader.textContent = `${firstDay.toLocaleString('default', {
    month: 'long',
  })} ${year}`;
  calendarBody.innerHTML = '';

  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    const innerSpan = document.createElement('span');
    innerSpan.textContent = i;
    dayElement.appendChild(innerSpan);
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      innerSpan.classList.add('today');
    }
    calendarBody.appendChild(dayElement);
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.addEventListener('DOMContentLoaded', function () {
  const newTaskButton = document.querySelector('.add-new-task');
  const modal = document.getElementById('taskModal');
  const closeBtn = document.querySelector('.close');
  const saveTaskBtn = document.getElementById('saveTaskBtn');

  newTaskButton.addEventListener('click', function () {
    // const info = prompt('Doing something ?');
    // if (info !== null && info.trim() !== '') {
    //   const storedInfo = localStorage.getItem('storedInfo');
    //   const parsedArray = storedInfo ? JSON.parse(storedInfo) : [];
    //   parsedArray.push(info);
    //   localStorage.setItem('storedInfo', JSON.stringify(parsedArray));
    // }

    modal.style.display = 'block';
  });
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  saveTaskBtn.addEventListener('click',function() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const isImportant = document.getElementById('importantCheckbox').checked;

    if(taskInput !== '') {
      const storedInfo = localStorage.getItem('storedInfo');
      let parsedArray = storedInfo ? JSON.parse(storedInfo) : [];

      parsedArray = parsedArray.filter(item => typeof item === 'object' && item !== null);

      const task = {
        text:taskInput,
        isImportant:isImportant
      };
      parsedArray.push(task);
      localStorage.setItem('storedInfo',JSON.stringify(parsedArray));
      modal.style.display = 'none';
    }
  })
});

function showContent(content) {
  const titleElement = document.querySelector('.top-center-text');

  if (content === 'Today') {
    titleElement.textContent = 'Today';
    const storedInfo = localStorage.getItem('storedInfo');
    const parsedArray = storedInfo ? JSON.parse(storedInfo) : [];
    const tasks = document.querySelector('.tasks');
    tasks.innerHTML = '';
    const filteredInfo = parsedArray.filter((info) =>
      info.text.toLowerCase().includes('today')
    );
    displayFilteredContent(filteredInfo, tasks);
  } 
  else if (content === 'Inbox') {
    titleElement.textContent = 'Inbox';
    const storedInfo = localStorage.getItem('storedInfo');
    const parsedArray = storedInfo ? JSON.parse(storedInfo) : [];
    const tasks = document.querySelector('.tasks');
    tasks.innerHTML = '';
    displayFilteredContent(parsedArray, tasks);
  } 
  else {
    titleElement.textContent = content;
    const storedInfo = localStorage.getItem('storedInfo');
    const parsedArray = storedInfo ? JSON.parse(storedInfo) : [];
    const tasks = document.querySelector('.tasks');
    tasks.innerHTML = '';
    const filteredInfo = parsedArray.filter((info) =>
      info.text.toLowerCase().includes(content.toLowerCase())
    );
    displayFilteredContent(filteredInfo, tasks);
  }
}
function displayFilteredContent(filteredInfo, container) {
  if (filteredInfo.length > 0) {
    const ul = document.createElement('ul');
    filteredInfo.forEach((info) => {
      const li = document.createElement('li');
      li.textContent = info.text;

      ////for clicks
      let clickCount = 0;
      li.addEventListener('click', function (event) {
        clickCount++;
        if (clickCount === 1) {
          const clickedLi = event.target;
          clickedLi.classList.toggle('completed');
        } else if (clickCount === 2) {
          const clickedLi = event.target;
          const ul = clickedLi.parentNode;
          ul.removeChild(clickedLi);
          updateStoredInfo();
        }
      });
      /////end

      ul.appendChild(li);
    });
    container.appendChild(ul);
  } else {
    container.innerHTML = `<p style="font-size: 20px; text-align: center;">No tasks</p>`;
  }
}
///only for 1 or 2 clicks on li items to render them correctly life-time like react
///we do this to make sure localstorage is updated, because when we remove double click and remove li, 
//its removed only on our current screen, we need 
///function updateStoredInfo to make localstorage be updated and make it know in which state our list is now.

function updateStoredInfo() {
  const taskElements = document.querySelectorAll('.tasks ul li');
  const mapedArray = Array.from(taskElements).map((li) => li.textContent);
  localStorage.setItem('storedInfo', JSON.stringify(mapedArray));
}

const selectMonths = document.getElementById('selectMonths');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

months.forEach((month) => {
  const option = document.createElement('option');
  option.value = month;
  option.text = month;
  selectMonths.appendChild(option);
});

selectMonths.addEventListener('change', function () {
  const selectedMonth = this.value;
  showContent(selectedMonth);
});


//// for colourful text 
window.onload = function () {
  const textElement = document.getElementById('dynamicText');
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'pink', 'yellow'];
  const textNodes = textElement.childNodes; //everything of h2

  textNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      //check if it is text node,   not span
      const words = node.textContent.split(' '); //textContent is содержимое (текст) //drop this text for words

      const coloredWords = words
        .map((word) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return `<span style="color: ${randomColor}">${word}</span>`; ///make random color for every word and make them be span
        })
        .join(' '); ///make it text again

      const span = document.createElement('span');
      span.innerHTML = coloredWords;
      textElement.replaceChild(span, node);
    }
  });
};
////end

function showImportantTasks() {
  const parsedArray = JSON.parse(localStorage.getItem('storedInfo')) || [];

  const importantTasks = parsedArray.filter((task) => task.isImportant);

  const necessaryDiv = document.querySelector('.necessary');
  necessaryDiv.innerHTML = '';

  if (importantTasks.length > 0) {
    const ul = document.createElement('ul');
    importantTasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      ul.appendChild(li);
    });

    necessaryDiv.appendChild(ul);
  } else {
    necessaryDiv.textContent = 'No important tasks found.';
  }
}
document.addEventListener('DOMContentLoaded',function() {
  showImportantTasks();
});
