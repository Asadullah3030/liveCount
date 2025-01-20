const apiKey = 'AIzaSyCZmRkPuTlmYxbnaXLsinpLtSz3ZFIFfxE';
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
const messageArea = document.querySelector('.message-area');
const channelList = document.querySelector('#channelList');


document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let searchText = searchInput.value.trim();
        if (searchText !== '') {
            fetchChannels(searchText);
        } else {
            messageArea.innerHTML = `Please enter a search query.`;
        }
    });
});


const fetchChannels = async (query) => {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${query}&type=channel&maxResults=5`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                displayChannels(data.items);
            } else {
                messageArea.innerHTML = `No channels found.`;
            }
        })
        .catch(error => console.error('Error:', error));
};

const displayChannels = (channels) => {
    channelList.innerHTML = ''; // Clear previous channel list
    channels.forEach((channel, index) => {
        const channelItem = document.createElement('li');
        channelItem.innerHTML = `
            
            <a href="#" class="channel-link" data-channel-id="${channel.id.channelId}">
            <img data-channel-id="${channel.id.channelId}" src=${channel.snippet.thumbnails.default.url}>
            </img>
            ${channel.snippet.title}</a>
        `;
        channelList.appendChild(channelItem);

        // Add event listener to fetch channel details when channel link is clicked
        channelItem.querySelector('.channel-link').addEventListener('click', (e) => {
            e.preventDefault();
            const channelId = e.target.getAttribute('data-channel-id');
            fetchChannelDetails(channelId);
        });
    });
};

const fetchChannelDetails = (channelId) => {
    const url = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet,statistics,brandingSettings&id=${channelId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const channel = data.items[0];
            // Store data only if it's not undefined
            if (channel) {
                // Pass data to the next page
                sessionStorage.setItem('channelData', JSON.stringify([channel])); // Store as an array
                // Redirect to the next page
                window.location.href = 'fetchYoutube.html';
            } else {
                console.error('No channel data found.');
            }
        })
        .catch(error => console.error('Error:', error));
};


var subMenu = document.getElementById('subMenu')
var fullPageMenu = document.getElementById('fullPageMenu')
subMenu.addEventListener('click',function(){
  if(subMenu.className === 'menuClicked') {
    subMenu.className = ""
    setTimeout(function(){fullPageMenu.className = "visually-hidden"},100)
  }else{
    subMenu.className = 'menuClicked'
    fullPageMenu.className = "slideRight"
  }
})


// 💛 dark mode 💛
const change = document.getElementById("dark-color");
const body = document.body;

// Check if dark mode is enabled in local storage
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Set initial state based on local storage
if (isDarkMode) {
    body.classList.add("dark-color");
    change.src = "images/sun.png";
}

change.addEventListener("click", () => {
    body.classList.toggle("dark-color");

    // Update dark mode state in local storage
    localStorage.setItem("darkMode", body.classList.contains("dark-color"));

    if (body.classList.contains("dark-color")) {
        change.src = "images/sun.png";
    } else {
        change.src = "images/imgbin-white-moon-in-the-night-sky-aTzr1pr44VqLsSx8iPUsckbgB-removebg-preview.png";
    }
});




// 💛  calling api 💛

//  💛 upper to go 💛

const btn = document.getElementById("upp");

window.addEventListener("scroll", () => {
    if(pageYOffset > 600){
      btn.style.display = "block";
    }
    else{
      btn.style.display = "none";
    }
    
    btn.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            behavior : "smooth"
        })
    })
})
   







