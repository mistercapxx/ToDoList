
const subtitleBox = document.querySelector('.subtitle-box');
const hideSubtitleBox = () => {
    subtitleBox.style.display = 'none';
};
setTimeout(hideSubtitleBox, 10000);


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
    const titleElement = document.querySelector('.exe .ttitle');
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
                    li.addEventListener('click', function() {
                        this.remove();
                        updateStoredInfo();
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
    container.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.remove();
            updateStoredInfo();
        }
    });
});

function updateStoredInfo() {
    const lis = document.querySelectorAll('.container ul li');
    const infoArray = Array.from(lis).map(li => li.textContent);
    localStorage.setItem('storedInfo', JSON.stringify(infoArray));
}
