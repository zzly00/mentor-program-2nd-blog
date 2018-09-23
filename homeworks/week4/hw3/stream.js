document.addEventListener('DOMContentLoaded', function(){
	// call api
	const request = new XMLHttpRequest;
	const limit = 20;
	request.open('GET', 'https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit='+limit, true);
	request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
	request.setRequestHeader('Client-ID', 'e4k4n3ey4hkk4qei30232kxxkuhwuq');

	// get data & create innerHTML
	request.onload = function(){
		if(request.status>=200 && request.status<400){
			for(let i=0; i<JSON.parse(request.responseText).streams.length; i++){
				const resp = JSON.parse(request.responseText).streams[i];
				const url = resp.channel.url;
				const preview = resp.preview.large;
				const avatar = resp.channel.logo;
				const steamName = resp.channel.status;
				const streamer = resp.channel.display_name;

				q('.stream-list').innerHTML += getStream(url, preview, avatar, steamName, streamer);
			}

			q('.stream-list').innerHTML += `
				<div class="stream_blank"></div>
			`;
		}else{
			q('.stream-list').innerHTML += `
				<div class="maintain">網頁維護中...</div>
			`;
			q('.container').style.height = '100vh';
		}
	}
	request.send();
})

// q
function q(element){
	return document.querySelector(element);
}

// innerHTML
function getStream(url, preview, avatar, steamName, streamer){
	return `
		<div class="stream">
			<a href="${url}" target="_blank" class="stream__url">
				<div class="stream__preview"><img src="${preview}" alt="preview"></div>
				<div class="stream__info">
					<div class="stream__avatar">
						<img src="${avatar}" alt="avatar">
					</div>
					<div class="stream__desc">
						<div class="stream__name">${steamName}</div>
						<div class="stream__streamer">${streamer}</div>
					</div>
				</div>
			</a>
		</div>
	`;
}
