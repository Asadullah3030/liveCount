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
                window.location.href = 'compare.html';
            } else {
                console.error('No channel data found.');
            }
        })
        .catch(error => console.error('Error:', error));
};