const loadlessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) // promise of JSON data
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="font-bangla col-span-full text-center rounded-xl py-10  space-y-5 ">
       
    <img class="mx-auto" src="./assets/alert-error.png" alt="">
    <p class="font-sm  text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
  <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Word Found"}</h2>
        <p class="font-semibold">Meaning/pronounciation</p>

        <div class="font-bangla font-medium text-2xl">"${word.meaning ? word.meaning : "No Meaning Found"} / ${word.pronunciation ? word.pronunciation : "No Pronunciation Found" }"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        </div>

  `;
    wordContainer.append(card);
  });
};

const displayLesson = (lessons) => {
  // 1. get the container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. loop through every lesson
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson -${lesson.level_no}
      </button>
    `;

    // 4. append into container
    levelContainer.append(btnDiv); // appendChild better for single element
  }
};

loadlessons();
