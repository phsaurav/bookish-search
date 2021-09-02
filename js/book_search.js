// *Global Decleartions
const searchInput = document.getElementById('book-search');
const heading = document.getElementById('heading');
const cards = document.getElementById('card-container');

// *Search Functionality
// Pressing enter inside input
searchInput.addEventListener('keyup', (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
		searchBook();
	}
});

const searchBook = () => {
	if (searchInput.value.length > 0) {
		fetchBook(searchInput.value);
		searchInput.value = '';
	} else {
		heading.innerText = 'Please Enter what you want to search!!';
		cards.innerHTML = '';
	}
};

const fetchBook = (query) => {
	fetch(`https://openlibrary.org/search.json?q=${query}`)
		.then((res) => res.json())
		.then((data) => displayCards(data));
};

const displayCards = (data) => {
	console.log(data);
	cards.innerHTML = '';

	if (data.num_found === 0) {
		heading.innerText = `No Result found!!`;
	} else {
		heading.innerText = `${data.docs.length} of ${data.num_found} found`;
		data.docs.forEach((doc) => {
			cards.insertAdjacentHTML(
				'beforeend',
				`<div
					class="
						card
						w-64
						bg-white
						rounded-xl
						overflow-hidden
						shadow-lg
						hover:shadow-xl hover:scale-105
						duration-500
						transform
						transition
						cursor-pointer
						mx-5
						my-5
						overflow-y-auto
					"
				>
					<img
						class="object-cover w-full h-80"
						src= ${
							doc.cover_i
								? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
								: 'https://retroana.com/img/nocover.jpg'
						}
						alt=""
					/>
					<div class="p-4">
						<h1 class="text-xl font-bold mt-0">${doc.title ? doc.title : "'No Title!!"}</h1>
						<p class="text-lg font-semibold text-gray-600">
							by ${doc.author_name ? doc.author_name[0] : "'No Author Found!!'"}
						</p>
						<p class="mt-2 text-gray-500">
							Published in ${
								doc.first_publish_year
									? doc.first_publish_year
									: "'Not Found!!'"
							}
						</p>
						<p class="text-gray-400 text-sm">
							Published by ${doc.publisher ? doc.publisher[0] : "'Not Found!!'"}
						</p>
					</div>
				</div>`
			);
		});
	}
};
