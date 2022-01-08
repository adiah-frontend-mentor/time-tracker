const timecards = document.querySelector('.timecards');

const timeframeLinks = document.querySelectorAll('.time');
let timeframe = 'weekly';
getHours();

timeframeLinks.forEach(link => {
	link.addEventListener('click', () => {
		timeframeLinks.forEach(time => {
			time.classList.remove('active');
		});
		link.classList.add('active');
		timeframe = link.dataset.timeframe;
		getHours();
	});
});

function getHours() {
	fetch('data.json')
		.then(response => response.json())
		.then(data => {
			populateTimes(data);
		})
		.catch(error => {
			console.log(error);
		});
}

function populateTimes(data) {
	for (let i = 0; i < data.length; i++) {
		const wrapper = timecards.children[i];
		const timecard = wrapper.children[1];
		const bottom = timecard.children[1];

		const myH2 = bottom.children[0];
		const myPar = bottom.children[1];

		switch (timeframe) {
			case 'daily':
				previous = 'Yesterday - ';
				break;
			case 'weekly':
				previous = 'Last Week - ';
				break;
			case 'monthly':
				previous = 'Last Month - ';
				break;
		}

		myH2.textContent = data[i]['timeframes'][timeframe]['current'] + 'hrs';
		myPar.textContent = previous + data[i]['timeframes'][timeframe]['previous'] + 'hrs';
	}
}